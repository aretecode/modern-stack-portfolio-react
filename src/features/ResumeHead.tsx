/**
 * @see https://github.com/zeit/next.js/issues/257
 * @see https://github.com/zeit/next.js/issues/2072
 * @see https://github.com/zeit/next.js/issues/4998
 *
 * @todo could improve @@performance here
 */
import * as React from 'react'
import Head from 'next/head'
import { EMPTY_ARRAY, EMPTY_OBJ } from '../utils/EMPTY'
import { ResumeContext, ResumeContextType } from './ResumeContext'

export class ResumeHead extends React.PureComponent<{
  url: URL
}> {
  // could move out for better perf but KISS
  static defaultProps = process.env.NODE_ENV === 'test' && {
    url: new URL('https://localhost'),
  }
  static contextType = ResumeContext
  readonly context: ResumeContextType

  render() {
    const { url } = this.props
    const {
      summary,
      picture,
      name,
      profiles = EMPTY_ARRAY,
    } = this.context.basics
    const description = summary
    const image = picture
    const title = name + ' Resume'
    const siteName = title + ' Site'

    const foundTwitter =
      profiles.find(x => x.network === 'twitter') || EMPTY_OBJ

    if (process.env.NODE_ENV === 'development') {
      if (foundTwitter === undefined) {
        throw new Error('requires twitter for twitter cards')
      }
    }

    const twitter = foundTwitter!.username
    const labelValueList = [
      {
        label: 'Resume',
        value: `${url.origin}/Resume`,
      },
      {
        label: 'About',
        value: `${url.origin}`,
      },
    ]

    return (
      <>
        <Head>
          <meta name="theme-color" content={'#6200ee'} key="color" />
          <meta property="og:site_name" content={siteName} key="og:site_name" />
          <meta property="og:locale" content="en_CA" key="og:locale" />
          <meta
            property="og:image:secure_url"
            content={image}
            key="og:image:secure_url"
          />
          <meta property="og:image" content={image} key="og:image" />
          <meta property="og:title" content={title} key="og:title" />
          <meta
            property="og:description"
            content={description}
            key="og:description"
          />
          <meta name="description" content={description} key="description" />
          <meta name="twitter:card" content={summary} key="twitter:card" />
          <meta
            name="twitter:domain"
            content={url.origin}
            key="twitter:domain"
          />
          <meta name="twitter:site" content={twitter} key="twitter:site" />
          <meta name="twitter:title" content={title} key="twitter:title" />
          <meta
            name="twitter:description"
            content={description}
            key="twitter:description"
          />
          <meta name="twitter:image" content={image} key="twitter:image" />
          <meta name="twitter:url" content={url.href} key="twitter:url" />

          {labelValueList.map((labelValueItem, index) => {
            const { label, value } = labelValueItem
            return (
              <>
                <meta
                  key={label + value + 'label'}
                  name={`twitter:label${index}`}
                  content={label}
                />
                <meta
                  key={label + value + 'value'}
                  name={`twitter:data${index}`}
                  content={value}
                />
              </>
            )
          })}
        </Head>
      </>
    )
  }
}
