import * as React from 'react'
import Head from 'next/head'
import { AmpContext } from './AmpContext'

export function ServiceWorker(props?: { isAmp?: boolean }) {
  const { isAmp } = React.useContext(AmpContext)
  return isAmp === false ? null : (
    // @see https://amp.dev/documentation/examples/components/amp-install-serviceworker
    // could split to a component
    <>
      <Head>
        <script
          async
          custom-element="amp-install-serviceworker"
          src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"
        />
      </Head>
      <amp-install-serviceworker
        src="/service-worker.js"
        data-iframe-src="https://amp.dev/sw.html"
        layout="nodisplay"
      />
    </>
  )
}
