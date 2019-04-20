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

    /**
     * @todo get image dimensions dynamically
     *  <meta property="og:image:width" content="1200" />
     *  <meta property="og:image:height" content="628" />
     *
     * @todo get these from graphql
     */
    const iconBaseUrl =
      'https://noccumpr-cdn.sirv.com/images/james-wiens-icon/james-wiens-code-logo'
    const svgUrl =
      'https://noccumpr-cdn.sirv.com/images/james-wiens-icon/james-wiens-code-logo-vector.svg'

    return (
      <>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" key="head:icon" />
          <link rel="manifest" href="/manifest.json" key="head:manifest" />
          <link
            rel="icon"
            href={`${iconBaseUrl}-32x32.png`}
            sizes="32x32"
            key="head:icon:32"
          />
          <link
            rel="icon"
            href={`${iconBaseUrl}-192x192.png`}
            sizes="192x192"
            key="head:icon:192"
          />
          <link
            rel="mask-icon"
            color={'#6200ee'}
            href={`${svgUrl}`}
            key="head:icon:svg"
          />
          <link
            rel="apple-touch-icon"
            href={`${iconBaseUrl}-120x120.png`}
            sizes="120x120"
            key="head:icon:120"
          />
          <link
            rel="apple-touch-icon"
            href={`${iconBaseUrl}-152x152.png`}
            sizes="152x152"
            key="head:icon:152"
          />
          <link
            rel="apple-touch-icon"
            href={`${iconBaseUrl}-512x512.png`}
            sizes="512x512"
            key="head:icon:512"
          />
          <link
            rel="apple-touch-icon-precomposed"
            href={`${iconBaseUrl}-180x180.png`}
            key="head:icon:180"
          />

          <meta name="theme-color" content={'#6200ee'} key="head:color" />
          <meta property="og:type" content="website" />
          <meta
            property="og:site_name"
            content={siteName}
            key="head:og:site_name"
          />
          <meta property="og:locale" content="en_CA" key="head:og:locale" />
          <meta
            property="og:image:secure_url"
            content={image}
            key="head:og:image:secure_url"
          />
          <meta property="og:image" content={image} key="head:og:image" />
          <meta property="og:title" content={title} key="head:og:title" />

          <meta
            property="og:description"
            content={description}
            key="head:og:description"
          />
          <meta
            name="description"
            content={description}
            key="head:resume:description"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:domain"
            content={url.origin}
            key="head:twitter:domain"
          />
          <meta
            name="twitter:creator"
            content={twitter}
            key="head:twitter:creator"
          />
          <meta name="twitter:site" content={twitter} key="head:twitter:site" />
          <meta name="twitter:title" content={title} key="head:twitter:title" />
          <meta
            name="twitter:description"
            content={description}
            key="head:twitter:description"
          />
          <meta name="twitter:image" content={image} key="head:twitter:image" />
          <meta name="twitter:url" content={url.href} key="head:twitter:url" />

          {labelValueList.map((labelValueItem, index) => {
            const { label, value } = labelValueItem
            return [
              <meta
                key={'head:' + label + value + 'label' + index}
                name={`twitter:label${index}`}
                content={label}
              />,
              <meta
                key={'head:' + label + value + 'value' + index}
                name={`twitter:data${index}`}
                content={value}
              />,
            ]
          })}
        </Head>
      </>
    )
  }
}
