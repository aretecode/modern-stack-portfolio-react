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
    const dataLayerName = 'dataLayer'
    const previewVariables = false
    const additionalEvents = ''
    const scriptBody = `
      (function(w,d,s,l,i){w[l]=w[l]||[];
        w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js', ${additionalEvents}});
        var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl${
          previewVariables !== false ? `+"${previewVariables}"` : ''
        };
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','${dataLayerName}','${GOOGLE_TAG_MANAGER_WEB_ID}');`.replace(
      /[\n\s]+/gm,
      ' '
    )
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
