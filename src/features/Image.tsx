/**
 * added support for forwardRef, which would make this a breaking change according to https://reactjs.org/docs/forwarding-refs.html
 */
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

export type ImagePureProps = {
  /** @required */
  src: string
  /** @required */
  alt: string

  isIntersecting?: boolean
  shouldUsePicture?: boolean
  /** HTMLPictureElement | HTMLImageElement */
  forwardedRef?: React.RefObject<any>
  srcSizeList?: Array<
    [
      /** media */
      string,
      /** src */
      string
    ]
  >
} & React.ImgHTMLAttributes<HTMLImageElement>

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
 * @todo add renderImage for customization with styled-components to receive states?
 */
export class ImageComponentWithoutForwardRef extends React.PureComponent<
  ImageProps
> {
  static contextType = AmpContext
  readonly context: AmpContextValueType

  render() {
    if (this.context.isAmp === false) {
      /**
       * @todo we may want to remove, but we only need to give this to amp
       */
      const {
        isIntersecting,
        height,
        width,
        shouldUsePicture,
        srcSizeList,
        forwardedRef,
        ...remainingProps
      } = this.props as ImagePureProps

      if (shouldUsePicture === true && Array.isArray(srcSizeList)) {
        return (
          <picture ref={forwardedRef}>
            {srcSizeList.map(([size, src]) => (
              <source key={size} media={size} srcSet={src} />
            ))}
            <img {...remainingProps} />
          </picture>
        )
      } else {
        return <img {...remainingProps} ref={forwardedRef} />
      }
    } else {
      const props = keep(this.props, IMAGE_PROP_LIST_TO_KEEP_IN_AMP)
      return <amp-img layout="responsive" {...props} />
    }
  }
}

export const Image = React.forwardRef(
  (props: ImageProps, ref: React.RefObject<any>) => {
    const mergedProps = {
      ...props,
      forwardedRef: ref || (props as ImagePureProps).forwardedRef,
    }
    return React.createElement(ImageComponentWithoutForwardRef, mergedProps)
  }
)

export const StyledImage = styled(Image)``
