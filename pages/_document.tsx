/**
 * @see https://nextjs.org/docs/advanced-features/custom-document
 * @see http://microformats.org/wiki/rel-profile
 * @see https://nextjs.org/docs/
 * @see https://github.com/dfrankland/react-amphtml/issues/29
 * @see https://developers.google.com/web/fundamentals/performance/resource-prioritization#preconnect
 * @see https://css-tricks.com/prefetching-preloading-prebrowsing/#article-header-id-3
 * @see https://medium.com/clio-calliope/making-google-fonts-faster-aadf3c02a36d
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content
 */
import * as React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext as NextDocumentContext,
  DocumentInitialProps,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { fromReqToUrl } from '../src/utils/fromReqToUrl'
import {
  AmpServiceWorkerHeadScript,
  AmpServiceWorkerBodyScript,
} from '../src/features/ServiceWorker'
import {
  GoogleTagManagerHeaderScript,
  GoogleTagManagerBodyScript,
} from '../src/features/GoogleTagManager'
import { logger } from '../src/log'

export interface DocumentProps {
  isAmp: boolean
  title: string
  url: URL
  ampScriptTags?: React.ReactNode
  ampStyleTag?: React.ReactNode
  ampStyles?: string
}

export default class MyDocument extends Document<DocumentProps> {
  // eslint-disable-next-line max-statements
  public static async getInitialProps(
    ctx: Required<NextDocumentContext>
  ): Promise<DocumentInitialProps> {
    const url = ctx.req ? fromReqToUrl(ctx.req as any) : { href: '' }

    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    if (!url.href) logger.error('missing url!!!')

    const isAmp = url.href.includes('?amp') || url.href.includes('/amp')

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          /* prettier-ignore */
          enhanceApp: (App: React.ComponentType) => (props: {
            [key: string]: unknown
          }) => {
            return sheet.collectStyles(<App {...props} />)
          },
        })

      const initialProps = await Document.getInitialProps(ctx)
      const styleElements = sheet.getStyleElement()

      return {
        isAmp,
        url,
        ...initialProps,
        /** @see https://github.com/vercel/next.js/blob/a107dcb73268500e926856a224767788bcfa12fd/packages/next/pages/_document.tsx#L488 */
        styles: (
          <>
            {initialProps.styles}
            {styleElements}
          </>
        ),
      } as any /** @todo fix type */
      /* eslint-enable */
    } finally {
      sheet.seal()
    }
  }

  public render() {
    const { isAmp, title, url } = this.props
    const shouldSkipAnalytics = url.href.includes('shouldSkipAnalytics')

    return (
      <Html lang="en" prefix="og: https://ogp.me/ns#">
        <Head>
          {isAmp && (
            <>
              <style
                key={'style'}
                amp-boilerplate=""
                dangerouslySetInnerHTML={{
                  __html: `
          body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
        `,
                }}
              />
              <noscript key={'noscript'}>
                <style
                  amp-boilerplate=""
                  dangerouslySetInnerHTML={{
                    __html: `
            body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}
          `,
                  }}
                />
              </noscript>
            </>
          )}
          {title}
          <meta name="robots" content="index,follow" />
          <meta name="googlebot" content="index,follow" />

          <meta itemProp="accessibilityControl" content="fullKeyboardControl" />
          <meta itemProp="accessibilityControl" content="fullMouseControl" />
          <meta itemProp="typicalAgeRange" content="20-60" />

          <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />

          <link rel="dns-prefetch" href="https://noccumpr-cdn.sirv.com" />
          <link rel="preconnect" href="https://noccumpr-cdn.sirv.com" />

          {shouldSkipAnalytics === false && (
            <link
              rel="dns-prefetch"
              href="https://www.googletagmanager.com"
              key="dgtm"
            />
          )}
          {shouldSkipAnalytics === false && (
            <link
              rel="preconnect"
              href="https://www.googletagmanager.com"
              key="pgtm"
            />
          )}
          {shouldSkipAnalytics === false && (
            <link
              rel="dns-prefetch"
              href="https://www.google-analytics.com"
              key="dga"
            />
          )}
          {shouldSkipAnalytics === false && (
            <link
              rel="preconnect"
              href="https://www.google-analytics.com"
              key="pga"
            />
          )}

          <link
            rel="preload"
            href="https://fonts.gstatic.com/s/sourcesanspro/v12/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rwlxdu3cOWxw.woff2"
            as="font"
            crossOrigin={'crossOrigin'}
          />
          <link
            rel="preload"
            href="https://fonts.gstatic.com/s/sourcesanspro/v12/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7lujVj9w.woff2"
            as="font"
            crossOrigin={'crossOrigin'}
          />
          <link
            rel="preload"
            href="https://fonts.gstatic.com/s/sourcesanspro/v12/6xKydSBYKcSV-LCoeQqfX1RYOo3ik4zwlxdu3cOWxw.woff2"
            as="font"
            crossOrigin={'crossOrigin'}
          />

          {shouldSkipAnalytics === false && (
            <GoogleTagManagerHeaderScript key="gtag-head" />
          )}
          {isAmp === true && <AmpServiceWorkerHeadScript key="worker-head" />}
        </Head>
        <body>
          {shouldSkipAnalytics === false && (
            <GoogleTagManagerBodyScript key="gtag-body" />
          )}
          <Main />
          {isAmp === true && <AmpServiceWorkerBodyScript key="worker-body" />}
          <NextScript />
        </body>
      </Html>
    )
  }
}
