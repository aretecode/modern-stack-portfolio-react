/**
 * @see https://shaleenjain.com/blog/nextjs-apollo-prefetc
 * @file mostly copied from following link
 * @see https://github.com/zeit/next.js/blob/master/examples/with-apollo/lib/with-apollo-client.js#L23
 * @tutorial https://www.apollographql.com/docs/react/recipes/server-side-rendering.html
 */
import { AppProps, NextWebVitalsMetric } from 'next/app'
import Router from 'next/router'
import { useAmp } from 'next/amp'
import { StyleSheetManager } from 'styled-components'
import * as React from 'react'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components'
import { useApollo } from '../src/apolloClient'
import { analyticsContainer } from '../src/features/GoogleTagManager'
import { StyledVectorFilter } from '../src/features/VectorFilter'
import { AppContextProvider } from '../src/features/AppContext'
import { URL } from '../src/utils/url'
import { logger } from '../src/log'
import { AppStyles, BelowTheFoldStyles } from '../src/AppStyles'
import {
  useDarkMode,
  useDarkModeUrl,
} from '../src/features/DarkMode/useDarkMode'

export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (process.env.NODE_ENV === 'development') {
    logger.info(metric)
  }
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)

  if (process.env.NODE_ENV === 'development') {
    logger.debug('[_app] render ')
  }

  const [url, setUrl] = React.useState(pageProps.url)
  React.useEffect(() => {
    Router.events.on('routeChangeComplete', pathUrl => {
      if (process.env.NODE_ENV === 'development') {
        logger.debug('[_app] route complete ' + pathUrl)
      }
      setUrl(new URL(window.location.href))
    })

    if (process.env.NODE_ENV === 'development') {
      logger.debug('[_app] starting ssr (browser, rehydrate)')
    }
    analyticsContainer.initializeAnalytics()
  }, [])

  const darkMode = useDarkMode()
  useDarkModeUrl(darkMode, url)
  const [doesPreferDarkMode] = darkMode

  const theme = {
    isDark: doesPreferDarkMode,
    isAmp: useAmp(),
  }

  return (
    <StyleSheetManager disableVendorPrefixes>
      <ThemeProvider theme={theme}>
        <>
          <AppStyles />
          <AppContextProvider url={url} darkMode={darkMode}>
            <ApolloProvider client={apolloClient}>
              <>
                <Component {...pageProps} />
                <StyledVectorFilter />
                <BelowTheFoldStyles />
              </>
            </ApolloProvider>
          </AppContextProvider>
        </>
      </ThemeProvider>
    </StyleSheetManager>
  )
}
