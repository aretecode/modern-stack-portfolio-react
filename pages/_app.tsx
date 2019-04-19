/**
 * @see https://shaleenjain.com/blog/nextjs-apollo-prefetc
 * @file mostly copied from following link
 * @see https://github.com/zeit/next.js/blob/master/examples/with-apollo/lib/with-apollo-client.js#L23
 * @tutorial https://www.apollographql.com/docs/react/recipes/server-side-rendering.html
 */
import App, { Container, NextAppContext } from 'next/app'
import Head from 'next/head'
import { ApolloClient } from 'apollo-boost'
import * as React from 'react'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { initApolloClient } from '../src/apolloClient'
import '../src/apolloStateRehydrate'
import { ResumeProvider } from '../src/features/ResumeContext'
import { ResumeSchema } from '../src/features/ResumeSchema'
import { ResumeHead } from '../src/features/ResumeHead'
import Footer from '../src/features/Footer'
import Header from '../src/features/Header'
import { StyledVectorFilter } from '../src/features/VectorFilter'
import { fromReqToUrl } from '../src/utils/fromReqToUrl'
import { logger } from '../src/log'
import { AppStyles, BelowTheFoldStyles } from '../src/AppStyles'
import { UnknownObj } from '../src/typings'
import {
  DataLoading,
  DataLoadingProvider,
} from '../src/features/ServerSideRendering'

export class InnerApp extends React.PureComponent<{
  apolloClientState?: UnknownObj
  apolloClient?: ApolloClient<any>
  url: URL
  dataLoadingContextValue: DataLoading
}> {
  render() {
    const {
      apolloClient,
      dataLoadingContextValue,
      apolloClientState,
      url,
      children,
    } = this.props

    const contextValue = DataLoading.from(dataLoadingContextValue)

    return (
      <React.StrictMode>
        <ApolloProvider
          client={
            apolloClient || initApolloClient(apolloClientState as any, url)
          }
        >
          <DataLoadingProvider contextValue={contextValue}>
            <ResumeProvider>
              <AppStyles />
              <ResumeSchema />
              <ResumeHead url={url} />
              <Header />
              {children}
              <Footer />
              <StyledVectorFilter />
              <BelowTheFoldStyles />
            </ResumeProvider>
          </DataLoadingProvider>
        </ApolloProvider>
      </React.StrictMode>
    )
  }
}

export default class MyApp extends App<{
  /** these come from getInitialProps */
  apolloClientState?: UnknownObj
  apolloClient?: ApolloClient<any>
  dataLoadingContextValue?: DataLoading
  url: URL
}> {
  static async getInitialProps(appContext: NextAppContext) {
    const { Component, router, ctx } = appContext
    const url = fromReqToUrl(ctx.req as any)
    const pageProps = {}

    let appProps = {} as any
    if (App.getInitialProps) {
      appProps = await App.getInitialProps(appContext)
    }

    const dataLoadingContextValue = new DataLoading()
    const apolloClient = initApolloClient(undefined, url)

    if (!process.browser) {
      logger.debug('[_app] starting ssr (server)')

      try {
        /**
         * @note !!! this does not properly ssr if we render `<App>` (even if we pass in apolloClient) !!!
         * @description Run all GraphQL queries
         * @todo this is really bad @@perf
         * @description ideally we would combine this into a single tree walking
         *              to get other data needed in ssr to rehydrate from
         * @note this uses old `Context`
         * @see https://github.com/apollographql/react-apollo/blob/master/src/getDataFromTree.ts
         * @see https://github.com/apollographql/react-apollo/blob/master/src/Query.tsx#L164
         */
        await getDataFromTree(
          <InnerApp
            apolloClient={apolloClient}
            url={url}
            dataLoadingContextValue={dataLoadingContextValue}
          >
            <Component {...appProps} />
          </InnerApp>
        )
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
        console.error('Error while running `getDataFromTree`', error)
      }

      // load context ssr data
      const result = await dataLoadingContextValue.all()

      // getDataFromTree does not call componentWillUnmount
      // head side effect therefore need to be cleared manually
      Head.rewind()
    } else {
      logger.debug('[_app] starting ssr (browser, rehydrate)')
    }

    // Extract query data from the Apollo store
    const apolloClientState = apolloClient.cache.extract()

    logger.debug('[_app] done ssr')

    return {
      ...appProps,
      pageProps,
      url,
      apolloClientState,
      dataLoadingContextValue,
    } as ReturnType<typeof App.getInitialProps> & {
      apolloState: UnknownObj
      dataLoadingContextValue: DataLoading
    }
  }

  render() {
    const {
      Component,
      pageProps,
      apolloClientState,
      url,
      dataLoadingContextValue,
    } = this.props

    return (
      <Container>
        <InnerApp
          apolloClientState={apolloClientState}
          url={url}
          dataLoadingContextValue={dataLoadingContextValue!}
        >
          <Component {...pageProps} />
        </InnerApp>
      </Container>
    )
  }
}
