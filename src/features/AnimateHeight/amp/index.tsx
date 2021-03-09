/**
 * Amp AnimateHeight
 */
import * as React from 'react'
import Head from 'next/head'
import { defaultRenderTrigger } from '../renderProps'
import { AmpAnimateHeightProps } from '../typings'

export function AmpAnimateHeight(props: AmpAnimateHeightProps) {
  const { renderTrigger = defaultRenderTrigger, children } = props

  /**
   * @see https://amp.dev/documentation/components/amp-accordion?referrer=ampproject.org
   * @see /packages/client/pages/About/AmpStyles.tsx
   * @todo split to a component
   */
  return (
    <>
      <Head>
        <script
          async
          custom-element="amp-accordion"
          src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"
        />
      </Head>
      <amp-accordion layout="container">
        <section>
          <header className="amp-accordion-header">
            {renderTrigger({ isExpanded: false } as any)}
          </header>
          {children}
        </section>
      </amp-accordion>
    </>
  )
}
