/**
 * @todo typings on `JSX.IntrinsicElements` in globals to extend the module for amp
 */
import * as React from 'react'
import Head from 'next/head'
import { PortfolioContext, PortfolioContextType } from './PortfolioContext'
import { AmpContext } from './AmpContext'

export default class GoogleDocument extends React.PureComponent {
  static contextType = PortfolioContext
  readonly context: PortfolioContextType

  render() {
    const { resumeWebsite } = this.context.basics
    return (
      <AmpContext.Consumer>
        {({ isAmp }) =>
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
        }
      </AmpContext.Consumer>
    )
  }
}
