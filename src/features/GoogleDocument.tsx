import * as React from 'react'
import Head from 'next/head'
import { PortfolioContext } from './PortfolioContext'
import { AmpContext } from './AmpContext'

export default function GoogleDocument() {
  const { resumeWebsite } = React.useContext(PortfolioContext).basics
  const { isAmp } = React.useContext(AmpContext)

  return (
    isAmp === true &&
    !!resumeWebsite && (
      <>
        <Head>
          <script
            async
            custom-element="amp-google-document-embed"
            src="https://cdn.ampproject.org/v0/amp-google-document-embed-0.1.js"
          />
        </Head>
        <amp-google-document-embed
          src={resumeWebsite}
          width="8.5"
          height="5"
          layout="responsive"
        />
      </>
    )
  )
}
