import * as React from 'react'
import styled from 'styled-components'
import { AmpContextValueType, AmpContext } from './AmpContext'
import { keep } from '../utils/keep'

/**
 * @see https://amp.dev/documentation/components/amp-img
 * @see https://amp.dev/documentation/guides-and-tutorials/learn/common_attributes
 * @todo ^ add typings
 * @todo get image width & height on node side (which is rendered on server only anyway if in amp context)
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
])

export type ImagePureProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  shouldUsePicture?: boolean
  srcSizeList?: Array<
    [
      /** media */
      string,
      /** src */
      string
    ]
  >
}

export type ImageAmpProps = {
  src: string
  width: number | string
  height: number | string
  layout?: 'responsive' | string
  attribution?: string
  heights?: string
  media?: string
  on?: string
  placeholder?: string
  sizes?: string
  fallback?: boolean
  noloading?: boolean
} & React.ImgHTMLAttributes<HTMLImageElement>

export type ImageProps =
  | ImagePureProps
  | ImageAmpProps
  | (ImagePureProps & ImageAmpProps)

/**
 * can add `<noscript><img>` inside
 * @see https://amp.dev/documentation/examples/components/amp-img/?referrer=ampbyexample.com
 * @todo add `srcset` because they don't stretch
 */
export class Image extends React.PureComponent<ImageProps> {
  static contextType = AmpContext
  readonly context: AmpContextValueType

  render() {
    if (this.context.isAmp === false) {
      /**
       * @todo we may want to remove, but we only need to give this to amp
       */
      const {
        height,
        width,
        shouldUsePicture,
        srcSizeList,
        ...remainingProps
      } = this.props as ImagePureProps

      if (shouldUsePicture === true && Array.isArray(srcSizeList)) {
        return (
          <picture>
            {srcSizeList.map(([size, src]) => (
              <source key={size} media={size} srcSet={src} />
            ))}
            <img {...remainingProps} />
          </picture>
        )
      } else {
        return <img {...remainingProps} />
      }
    } else {
      const props = keep(this.props, IMAGE_PROP_LIST_TO_KEEP_IN_AMP)
      return <amp-img layout="responsive" {...props} />
    }
  }
}

export const StyledImage = styled(Image)``
