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
])

export interface ImagePureProps {
  /** @required */
  src: string
  /** @required */
  alt: string

  isIntersecting?: boolean
  /** @todo HTMLPictureElement | HTMLImageElement */
  forwardedRef?: React.RefObject<any>
}

export interface ImageAmpProps {
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
}

export type ImageReactProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  className?: string
  children?: React.ReactNode
  alt?: string
  crossOrigin?: 'anonymous' | 'use-credentials' | ''
  decoding?: 'async' | 'auto' | 'sync'
  height?: number | string
  sizes?: string
  src?: string
  srcSet?: string
  useMap?: string
  width?: number | string
}

export type ImageProps = (ImagePureProps & ImageAmpProps) & ImageReactProps

/**
 * can add `<noscript><img>` inside
 * @see https://amp.dev/documentation/examples/components/amp-img/?referrer=ampbyexample.com
 */
export class ImageComponentWithoutForwardRef extends React.PureComponent<
  ImageProps
> {
  static contextType = AmpContext
  readonly context: AmpContextValueType

  render() {
    if (this.context.isAmp === false) {
      const {
        isIntersecting,
        height,
        width,
        forwardedRef,
        ...remainingProps
      } = this.props as ImagePureProps & ImageReactProps

      return <img {...remainingProps} ref={forwardedRef} />
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
