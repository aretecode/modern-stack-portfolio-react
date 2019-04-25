import * as React from 'react'

/**
 * @see https://amp.dev/documentation/examples/components/amp-install-serviceworker
 */
export function AmpServiceWorkerHeadScript() {
  return (
    <script
      async
      custom-element="amp-install-serviceworker"
      src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"
    />
  )
}

export function AmpServiceWorkerBodyScript() {
  return (
    <amp-install-serviceworker
      src="/service-worker.js"
      data-iframe-src="https://amp.dev/sw.html"
      layout="nodisplay"
    />
  )
}
