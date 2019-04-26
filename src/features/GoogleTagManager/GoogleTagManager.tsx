/**
 * @note this file is ServerSide only
 * @see _document
 */
import * as React from 'react'
import { AmpContext } from '../AmpContext'
import { Script } from '../Script'

const GOOGLE_TAG_MANAGER_AMP_ID = process.env.GOOGLE_TAG_MANAGER_AMP_ID
const GOOGLE_TAG_MANAGER_WEB_ID = process.env.GOOGLE_TAG_MANAGER_WEB_ID

export function GoogleTagManagerHeaderScript(props: { isAmp?: boolean }) {
  const isAmp =
    props.isAmp !== undefined ? props.isAmp : React.useContext(AmpContext).isAmp

  if (isAmp) {
    return (
      <script
        async
        custom-element="amp-analytics"
        src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
      />
    )
  } else {
    const scriptBody = `window.dataLayer = []; const lgtm = typeof requestIdleCallback === 'function' ? requestIdleCallback : (fn) => fn(); lgtm(() => {
window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=document.getElementsByTagName('script')[0],j=document.createElement('script');
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=${GOOGLE_TAG_MANAGER_WEB_ID}';f.parentNode.insertBefore(j,f);
})`.replace(/(\n|\s)+/gm, ' ')
    return <Script>{scriptBody}</Script>
  }
}

export function GoogleTagManagerBodyScript(props: { isAmp?: boolean }) {
  const isAmp =
    props.isAmp !== undefined ? props.isAmp : React.useContext(AmpContext).isAmp

  if (isAmp) {
    return (
      <amp-analytics
        config={`https://www.googletagmanager.com/amp.json?id=${GOOGLE_TAG_MANAGER_AMP_ID}&gtm.url=SOURCE_URL`}
        data-credentials="include"
      />
    )
  } else {
    /**
     * @todo may not need this
     */
    return (
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-P58WR63"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    )
  }
}
