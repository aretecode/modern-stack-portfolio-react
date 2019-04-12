/**
 * @see https://shaleenjain.com/blog/nextjs-apollo-prefetc
 * @file mostly copied from following link
 * @see https://github.com/zeit/next.js/blob/master/examples/with-apollo/lib/with-apollo-client.js#L23
 * @note in examples, it use `initApolloClient`
 */
import App, { Container, NextAppContext } from 'next/app'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import Head from 'next/head'
import { getDataFromTree } from 'react-apollo'
import { client as apolloClient } from '../src/apolloClient'

export default class MyApp extends App {
  static async getInitialProps(ctx: NextAppContext) {
    const { Component, router } = ctx

    let appProps = {} as any
    if (App.getInitialProps) {
      appProps = await App.getInitialProps(ctx)
    }

    if (!(process as any).browser) {
      try {
        // Run all GraphQL queries
        await getDataFromTree(
          <App
            {...appProps}
            Component={Component}
            router={router}
            apolloClient={apolloClient}
          />
        )
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
        console.error('Error while running `getDataFromTree`', error)
      }

      // getDataFromTree does not call componentWillUnmount
      // head side effect therefore need to be cleared manually
      Head.rewind()
    }

    // Extract query data from the Apollo store
    const apolloState = apolloClient.cache.extract()

    return {
      ...appProps,
      apolloState,
    } as ReturnType<typeof App.getInitialProps> & {
      apolloState: typeof apolloState
    }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}
