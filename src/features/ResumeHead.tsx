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
          <meta name="theme-color" content={'#6200ee'} key="head:color" />
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
          <meta name="twitter:card" content={summary} key="head:twitter:card" />
          <meta
            name="twitter:domain"
            content={url.origin}
            key="head:twitter:domain"
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
