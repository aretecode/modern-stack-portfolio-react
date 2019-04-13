/**
 * @see https://www.apollographql.com/docs/react/advanced/boost-migration
 * @see https://github.com/bitinn/node-fetch/issues/49
 * @see https://github.com/apollographql/apollo-link/issues/83
 * @see https://github.com/github/fetch#sending-cookies
 * @todo https://www.apollographql.com/docs/react/features/performance.html#cache-redirects
 * @see https://github.com/zeit/next.js/blob/master/examples/with-apollo/lib/init-apollo.js
 * @todo https://www.apollographql.com/docs/link/links/state < docs are not accurate for apollo-boost with state link
 */
import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  ApolloClientOptions,
  NormalizedCacheObject,
} from 'apollo-boost'
import { InMemoryCache } from 'apollo-boost'
import { withClientState } from 'apollo-link-state'
import { onError } from 'apollo-link-error'
import { GraphQLError } from 'graphql'
import { isEmpty, isObj } from './utils/is'
import { apolloState, typeDefs } from './apolloState'
import { logger } from './log'

const IS_BROWSER = typeof window === 'object'

if (!process.browser) {
  (global as any).fetch = require('node-fetch')
}

let apolloClientInstance: ApolloClient<any> = undefined as any

/**
 * changed to this because of the server usage
 * if we need access to these links outside we can change this
 */
export function createInstance(
  initialState = (IS_BROWSER
    ? window.__APOLLO_STATE__
    : {}) as NormalizedCacheObject
) {
  const httpLink = new ApolloLink((operation, forward) => {
    const httpLinkActual = new HttpLink({
      get uri() {
        /**
         * @todo dynamically check if port is running on local, else switch to now
         */
        return process.env.NODE_ENV === 'development'
          ? `http://localhost:4000/graphql?n=${operation.operationName}`
          : 'https://modern-stack-skeletons-graphql.aretecode.now.sh/graphql'
      },

      /**
       * @see https://github.com/apollographql/apollo-link/issues/236#issuecomment-348176745
       */
      // fetchOptions: { method: 'GET' },

      /**
       * @@security should be same-origin in real production
       */
      credentials: 'include',
    })

    return httpLinkActual.request(operation, forward)
  })

  const logError = (error: GraphQLError): void => {
    const { message, locations, path } = error
    logger.error(
      `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
    )
  }

  const errorLink = onError(namedErrorResponseParams => {
    const { graphQLErrors, networkError, response } = namedErrorResponseParams
    const hasError = isObj(graphQLErrors) || !isEmpty(networkError)

    if (isObj(graphQLErrors)) {
      const list = graphQLErrors as GraphQLError[]
      list.forEach(logError)
    }
    if (!isEmpty(networkError)) {
      logger.error(`[Network error]: ${networkError}`)
    }

    if (hasError && isObj(response)) {
      response.errors = undefined
    }
  })

  /**
   * @see https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-error
   * @todo https://www.apollographql.com/docs/link/index.html#graphql-tools custom fetcher?
   */
  const consoleLink = new ApolloLink((operation, forward) => {
    logger.info(`starting request for ${operation.operationName}`)

    if (forward !== undefined) {
      return forward(operation).map(data => {
        logger.info(`ending request for ${operation.operationName}`)
        return data
      })
    } else {
      // tslint:disable:no-null-keyword
      return null
      // tslint:enable:no-null-keyword
    }
  })

  /**
   * @api @see https://github.com/apollographql/apollo-cache-persist#react
   * @api @see https://www.apollographql.com/docs/react/features/cache-updates.html#normalization
   */
  const inMemoryCache = new InMemoryCache()
  const cache = inMemoryCache.restore(initialState)

  /**
   * @todo currently only used for test env because
   *       - it's hijacking the http request
   *       - we switched to the apollo server graphql
   */
  const stateLink =
    process.env.NODE_ENV === 'test' &&
    withClientState({
      cache,
      typeDefs,
      ...apolloState,
    })

  /**
   * @todo
   * @requires https://github.com/apollographql/apollo-client/blob/master/docs/source/recipes/server-side-rendering.md#store-rehydration
   * @see https://github.com/apollographql/apollo-client/issues/1419
   * @see https://github.com/apollographql/apollo-client/blob/82a846c9591bcff975cc28d3786105b80a49b4ba/src/queries/queryTransform.ts#L30
   * @see https://github.com/apollographql/apollo-client/issues/1913#issuecomment-348359030
   */
  const clientConfig: ApolloClientOptions<any> = {
    link: ApolloLink.from(
      [consoleLink, errorLink, stateLink as ApolloLink, httpLink].filter(
        Boolean
      )
    ),
    cache,
    ssrMode: !process.browser,
    connectToDevTools: process.browser,
  }

  const client = new ApolloClient(clientConfig)

  return client
}

export function initApolloClient(initialState?: NormalizedCacheObject) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createInstance(initialState)
  }

  // Reuse client on the client-side
  if (apolloClientInstance === undefined) {
    apolloClientInstance = createInstance(initialState)
  }

  return apolloClientInstance
}
