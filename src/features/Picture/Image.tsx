/** @todo @see https://nextjs.org/blog/next-10-1#nextimage-improvements */
import * as React from 'react'
import { useAmp } from 'next/amp'
import type { ImageObjectType } from '../../typings'
import { keep } from '../../utils/keep'
import { logger } from '../../log'

export interface AmpImageProps {
  noloading?: unknown
  attribution?: string
  fallback?: string
  'amp-fx'?: string
  'data-parallax-factor'?: string
}
export type ImageProps = { ref?: any } & JSX.IntrinsicElements['img'] &
  AmpImageProps

/**
 * @see https://amp.dev/documentation/components/amp-img
 * @see https://amp.dev/documentation/guides-and-tutorials/learn/common_attributes
 * could add ^ add typings when needed for every amp component in typings file
 * @see https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Art_direction
 * @see https://stackoverflow.com/questions/12539918/get-the-width-and-height-of-an-image-in-node-js
 */
export const IMAGE_PROP_LIST_TO_KEEP_IN_AMP = Object.freeze([
  'src',
  'alt',
  'attribution',
  'height',
  'width',
  'fallback',
  // common
  'sizes',
  'children',
  'layout',
  'heights',
  'media',
  'noloading',
  'on',
  'id',
  'placeholder',
] as ReadonlyArray<keyof ImageProps>)

const toNextUrl = (srcUrl: string, srcWidth?: number | string) => {
  return srcUrl
}

/**
 * @todo use amp/image when their styles are fixed
 * @example
 *   return <Image {...props} />
 *
 * @todo remove hack for the width & height
 */
export const AmpCompatImage: React.FC<
  ImageProps & { srcSizes?: ImageObjectType['srcSizes'] }
> = props => {
  const isAmp = useAmp()
  const {
    width = 606,
    height = width,
    src = 'https://noccumpr.sirv.com/images/meow-bg-color--blur.jpg?w=1&h=1&q=1',
    alt = 'Missing description! Sorry about that, eh.',
    srcSizes = [],
    ...rest
  } = props
  const merged = { height, width, src, alt, ...rest } as const

  if (!props.height && !props.width) {
    logger.error('[AmpImage] - did not pass in width or image')
  }

  if (isAmp) {
    /** find unique sizes and create a srcSet */
    const [sizesProp, srcSetProp] = React.useMemo(() => {
      const srcSizesFiltered = srcSizes.filter((item, index) => {
        const [, , srcWidth] = item
        const other = srcSizes.find((x, index2) => {
          if (index2 === index) {
            return false
          }
          if (x[2] === srcWidth) {
            return true
          }
          return false
        })
        return other === undefined
      })
      const srcSet = srcSizesFiltered
        .map(([size, url, srcWidth]) => `${url} ${srcWidth}w`)
        .join(',')
      const sizes = srcSizesFiltered
        .map(([size, url, srcWidth]) => `${size} ${srcWidth}w`)
        .join(', ')

      return [sizes, srcSet]
    }, [srcSizes])

    const ampProps = keep(merged, IMAGE_PROP_LIST_TO_KEEP_IN_AMP)
    return (
      <amp-img
        layout="responsive"
        srcSet={srcSetProp || undefined}
        sizes={sizesProp || undefined}
        {...ampProps}
      />
    )
  }

  const srcUrl = merged.src
  const nextUrl = toNextUrl(srcUrl)
  // @lint this is passed in as a prop
  /* eslint-disable jsx-a11y/alt-text */
  return (
    <img
      {...merged}
      crossOrigin="anonymous"
      decoding="async"
      src={`${nextUrl}`}
    />
  )
}

export default AmpCompatImage
