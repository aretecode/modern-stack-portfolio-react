/**
 * Amp AnimateHeight
 */
import * as React from 'react'
import Head from 'next/head'
import AnimateHeightTrigger from '../AnimateHeightTrigger'
import type { AmpAnimateHeightProps } from '../typings'

export function AmpAnimateHeight(props: AmpAnimateHeightProps) {
  /**
   * @see https://amp.dev/documentation/components/amp-accordion?referrer=ampproject.org
   * @see /packages/client/pages/About/AmpStyles.tsx
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
            <AnimateHeightTrigger isExpanded={false} />
          </header>
          {props.children}
        </section>
      </amp-accordion>
    </>
  )
}
