/**
 * @see https://github.com/zeit/next.js/issues/257
 * @see https://github.com/zeit/next.js/issues/2072
 * @see https://github.com/zeit/next.js/issues/4998
 */
import * as React from 'react'
import Head from 'next/head'
import * as structured from '../../public/structured.json'
import type { WebsiteType, BasicsType, ProfileType } from '../typings'
import { EMPTY_OBJ } from '../utils/EMPTY'
import { AppContext } from './AppContext'

const { updatedTime } = structured

function useFindTwitterProfile(profiles: ProfileType[]) {
  const foundTwitter = React.useMemo(
    (): ProfileType =>
      profiles.find(x => x.network === 'twitter') ?? (EMPTY_OBJ as ProfileType),
    [profiles]
  )

  if (process.env.NODE_ENV === 'development') {
    if (foundTwitter === undefined) {
      throw new Error('requires twitter for twitter cards')
    }
  }
  return foundTwitter.username
}

/**
 * <link rel="profile" href="https://gmpg.org/xfn/11" />
 * @see https://web.dev/color-scheme/
 */
export default React.memo(function PortfolioHead(
  props: {
    children?: React.ReactChild
    description?: string
    titleText?: string
    siteName?: string
    isProfilePage?: boolean
  } & BasicsType &
    Pick<WebsiteType, 'iconBaseUrl' | 'iconSvgUrl' | 'highlightsPicture'>
) {
  const { url } = React.useContext(AppContext)
  const {
    highlightsPicture,
    website,
    summary,
    image,
    name,
    profiles,
    iconSvgUrl,
    iconBaseUrl,
    description = summary,
    titleText = name + ' Context',
    siteName = name + ' Site',
  } = props

  const twitter = useFindTwitterProfile(profiles)

  const labelValueList = React.useMemo(
    () => [
      {
        label: 'Portfolio',
        value: `${url.origin}/Portfolio`,
      },
      {
        label: 'About',
        value: `${url.origin}`,
      },
    ],
    [url.origin]
  )

  return (
    <>
      <Head>
        <meta
          name="color-scheme"
          content="dark light"
          key="head:color-scheme"
        />
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
          href={`${iconSvgUrl}`}
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

        {props.isProfilePage ? (
          <>
            <meta property="og:type" content="profile" key="og:type:profile" />
            <meta
              key={'profile:first_name'}
              name={`profile:first_name`}
              content={name.split(' ').shift()}
            />
            <meta
              key={'profile:last_name'}
              name={`profile:last_name`}
              content={name.split(' ').pop()}
            />
            <meta
              key={'profile:username'}
              name={`profile:username`}
              content={'aretecode'}
            />
          </>
        ) : (
          <>
            <meta property="og:type" content="website" key="head:og:type" />
          </>
        )}
        <meta name="author" content={website} key="head:author" />
        <meta
          property="og:updated_time"
          content={updatedTime}
          key="head:updated_time"
        />

        <meta
          property="og:site_name"
          content={siteName}
          key="head:og:site_name"
        />
        <meta property="og:locale" content="en_CA" key="head:og:locale" />

        {React.useMemo(() => {
          /** @see https://ogp.me/#array */
          return highlightsPicture.srcSizes.map(
            ([, imgSrc, imgWidth, imgHeight]) => {
              return [
                <meta
                  property="og:image:secure_url"
                  content={imgSrc}
                  key={`head:image:secure:${imgWidth}x${imgHeight}`}
                />,
                <meta
                  property="og:image"
                  content={imgSrc}
                  key={`head:image:src:${imgWidth}x${imgHeight}`}
                />,
                <meta
                  property="og:image:width"
                  content={`${imgWidth}`}
                  key={`head:image:width:${imgWidth}x${imgHeight}`}
                />,
                <meta
                  property="og:image:height"
                  content={`${imgHeight}`}
                  key={`head:image:height:${imgWidth}x${imgHeight}`}
                />,
                ,
              ].flat(1)
            }
          )
        }, [image])}
        <meta
          property="og:image:alt"
          content={image.description}
          key="head:og:image:alt"
        />

        <meta property="og:title" content={titleText} key="head:og:title" />
        <title key="head:title">{titleText}</title>
        <meta name="description" content={description} key="head:description" />
        <meta
          property="og:description"
          content={description.split('\n').shift() as string}
          key="head:og:description"
        />
        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitter:card"
        />
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
        <meta
          name="twitter:title"
          content={titleText}
          key="head:twitter:title"
        />
        <meta
          name="twitter:description"
          content={description.split('\n').shift() as string}
          key="head:twitter:description"
        />
        <meta
          name="twitter:image"
          content={image.url}
          key="head:twitter:image"
        />
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
        {props.children}
      </Head>
    </>
  )
})
