/**
 * @see https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js
 * @see https://www.apollographql.com/docs/react/advanced/boost-migration
 * @see https://github.com/bitinn/node-fetch/issues/49
 * @see https://github.com/apollographql/apollo-link/issues/83
 * @see https://github.com/github/fetch#sending-cookies
 * @see https://www.apollographql.com/docs/react/features/performance.html#cache-redirects
 * @see https://github.com/zeit/next.js/blob/master/examples/with-apollo/lib/init-apollo.js
 */
const merge = require('deepmerge')
import * as React from 'react'
import { AppProps } from 'next/app'
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  NormalizedCacheObject,
  InMemoryCache,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { GraphQLError } from 'graphql'
import { isArray, isEmpty, isObj } from './utils/is'
import { EMPTY_ARRAY } from './utils/EMPTY'
import { logger } from './log'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

/**
 * this should eliminate some of the deps in production
 * though it can be drastically improved
 *
 * @todo this is not removing it, can see by searching `[Network error]`
 */
function createDevLinks() {
  if (process.env.NODE_ENV !== 'production') {
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
        return forward(operation).map((data: any) => {
          logger.info(`ending request for ${operation.operationName}`)
          return data
        })
      } else {
        return null
      }
    })

    return [consoleLink, errorLink]
  } else {
    return EMPTY_ARRAY
  }
}

/**
 * @see apolloClient
 */
if (!process.browser) {
  ;(global as any).fetch = require('node-fetch')
}

let apolloClientInstance: ApolloClient<any> = undefined as any

function createApolloClient(url?: URL) {
  const httpLink = new ApolloLink((operation, forward) => {
    const httpLinkActual = new HttpLink({
      uri:
        'https://graphql.contentful.com/content/v1/spaces/2n52ochjp8f3?access_token=f14JMgwbHNoD1kzz54hwAd1Rsy_ZzAShU7055-dWP30',
      /**
       * @idea use `GET` to cache
       * @see https://github.com/apollographql/apollo-link/issues/236#issuecomment-348176745
       * @example
       *   fetchOptions: { method: 'GET' },
       */

      /**
       * @@security should be same-origin in real production
       */
      credentials: 'include',
    })

    return httpLinkActual.request(operation, forward)
  })

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    ssrForceFetchDelay: process.browser ? 100 : undefined,
    connectToDevTools: process.browser,
    link: ApolloLink.from([...createDevLinks(), httpLink].filter(Boolean)),
    headers: {
      authorization: `Bearer ${'f14JMgwbHNoD1kzz54hwAd1Rsy_ZzAShU7055-dWP30'}`,
    },
    cache: new InMemoryCache({}),
  })
}

const isEqual = <Type extends unknown>(x: Type, y: Type) => {
  if (isObj(x) && isObj(y)) {
    return Object.keys(x).every(key => isEqual(x[key], y[key]))
  } else if (isArray(x) && isArray(y)) {
    return x.every((item, index) => isEqual(x[index], y[index]))
  }
  return x === y
}

export function initApolloClient(
  initialState: NormalizedCacheObject | null = null,
  url?: URL
) {
  const _apolloClient = apolloClientInstance ?? createApolloClient(url)

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray: any[], sourceArray: any[]) => [
        ...sourceArray,
        ...destinationArray.filter((d: unknown) =>
          sourceArray.every((s: unknown) => !isEqual(d, s))
        ),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return _apolloClient
  }
  // Create the Apollo Client once in the client
  if (!apolloClientInstance) {
    apolloClientInstance = _apolloClient
  }

  return _apolloClient
}

export function useApollo(pageProps: AppProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = React.useMemo(() => initApolloClient(state), [state])
  return store
}
