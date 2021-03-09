import * as React from 'react'
import Head from 'next/head'
import { useAmp } from 'next/amp'
import type { BasicsType } from '../typings'

export default function GoogleDocument({ resumeWebsite }: BasicsType) {
  const isAmp = useAmp()

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
