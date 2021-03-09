import * as React from 'react'
import { useAmp } from 'next/amp'
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

/**
 * @todo use amp/image when their styles are fixed
 * @example
 *   return <Image {...props} />
 *
 * @todo remove hack for the width & height
 */
export const AmpCompatImage: React.FC<ImageProps> = props => {
  const isAmp = useAmp()
  const {
    width = 606,
    height = width,
    src = 'https://noccumpr.sirv.com/images/meow-bg-color--blur.jpg?w=1&h=1&q=1',
    alt = 'Missing description! Sorry about that, eh.',
    ...rest
  } = props
  const merged = { height, width, src, alt, ...rest } as const

  if (!props.height && !props.width) {
    logger.error('[AmpImage] - did not pass in width or image')
  }

  if (isAmp) {
    const ampProps = keep(merged, IMAGE_PROP_LIST_TO_KEEP_IN_AMP)
    return <amp-img layout="responsive" {...ampProps} />
  }

  // @lint this is passed in as a prop
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img crossOrigin="anonymous" {...merged} />
}

export default AmpCompatImage
