/**
 * @see https://shaleenjain.com/blog/nextjs-apollo-prefetc
 * @file mostly copied from following link
 * @see https://github.com/zeit/next.js/blob/master/examples/with-apollo/lib/with-apollo-client.js#L23
 * @tutorial https://www.apollographql.com/docs/react/recipes/server-side-rendering.html
 */
import type { AppProps } from 'next/app'
import Router from 'next/router'
import { useAmp } from 'next/amp'
import { StyleSheetManager } from 'styled-components'
import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import { trackPageView } from '../src/features/GoogleTagManager'
import { StyledVectorFilter } from '../src/features/VectorFilter'
import { AppContextProvider } from '../src/features/AppContext'
import { URL } from '../src/utils/url'
import { logger } from '../src/log'
import { AppStyles, BelowTheFoldStyles } from '../src/AppStyles'
import { useDarkMode } from '../src/features/DarkMode/useDarkMode'
import { useDarkModeClassName } from '../src/features/DarkMode/useDarkModeClassName'

export { reportWebVitals } from '../src/features/GoogleTagManager/webVitals'

export default function MyApp({
  Component,
  pageProps,
}: AppProps & { children: React.ReactNode }) {
  if (process.env.NODE_ENV === 'development') logger.debug('[_app] render ')

  const [url, setUrl] = React.useState(pageProps.url)
  React.useEffect(() => {
    Router.events.on('routeChangeComplete', pathUrl => {
      if (process.env.NODE_ENV === 'development')
        logger.debug('[_app] route complete ' + pathUrl)

      setUrl(new URL(window.location.href))
    })

    if (process.env.NODE_ENV === 'development')
      logger.debug('[_app] starting ssr (browser, rehydrate)')

    trackPageView()
  }, [])

  const darkMode = useDarkMode()
  const [doesPreferDarkMode] = darkMode
  useDarkModeClassName(doesPreferDarkMode as boolean)

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
            <>
              <Component {...pageProps} />
              <StyledVectorFilter />
              <BelowTheFoldStyles />
            </>
          </AppContextProvider>
        </>
      </ThemeProvider>
    </StyleSheetManager>
  )
}
