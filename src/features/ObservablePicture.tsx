/**
 * === IntersectionObserver ===
 * @see https://w3c.github.io/IntersectionObserver/
 * @see https://developers.google.com/web/updates/2016/04/intersectionobserver
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 * @see https://github.com/GoogleChromeLabs/sample-media-pwa
 *
 *
 * === image size ===
 * @see https://github.com/image-size/image-size
 * ^ we could use this to get the dimensions of the image on the server dynamically
 *
 * === notes ===
 * could separate state handling, but it's very ui specific
 * we need to have some wrapping element, so we use picture
 *
 * @todo rename file
 * @todo could move this + Image => Picture|Image folder & split out types & renderFunction
 * @todo add support to use this without observing, for example, if we know it's always above the fold
 *
 * @todo add placeholder svg with width & height dimensions that we server side rendered!
 */
import * as React from 'react'
import { StyledImage, ImageProps } from './Image'
import { AmpContext } from './AmpContext'
import { measureImage } from '../utils/measureImage'
import {
  DataLoadingContext,
  DataLoadingContextType,
} from '../features/ServerSideRendering'

export interface IntersectionObserverStateType {
  hasIntersected: boolean
  isIntersecting: boolean
}
export interface HeightWidthType {
  width: number
  height: number
}
export type PictureIntersectionObserverStateType = IntersectionObserverStateType &
  HeightWidthType
export type SrcSizeListType = Array<
  [
    /** media */
    string,
    /** src */
    string
  ]
>
export type PictureIntersectionObserverProps = ImageProps & {
  forwardedRef?: React.RefObject<any>
  ref?: React.RefObject<any>

  /**
   * could also pass in the ref & observer, but in such case, better to export pieces that can be composed
   */
  renderPicture?: (
    props: PictureIntersectionObserverProps,
    state: PictureIntersectionObserverStateType
  ) => React.ReactNode

  srcSizeList?: SrcSizeListType
}

export function defaultRenderPicture(
  props: PictureIntersectionObserverProps,
  state: PictureIntersectionObserverStateType
) {
  const { className, children, forwardedRef = props.ref } = props
  return (
    <picture ref={forwardedRef} className={className}>
      {children}
    </picture>
  )
}

export class PictureIntersectionObserver extends React.PureComponent<
  PictureIntersectionObserverProps,
  PictureIntersectionObserverStateType
> {
  static defaultProps = {
    src: `https://noccumpr-cdn.sirv.com/images/full-james-wiens-profile-picture.png?format=webp`,
    alt: 'MISSING ALTERNATE DESCRIPTION, SORRY!',
    renderPicture: defaultRenderPicture,
  }
  static contextType = DataLoadingContext
  readonly context: DataLoadingContextType

  /**
   * @note used any here for usage on any element, then in target, cast to type
   */
  wrapperRef: React.RefObject<any> =
    this.props.ref || this.props.forwardedRef || React.createRef<any>()
  observer: IntersectionObserver
  state = {
    hasIntersected: false,
    isIntersecting: false,
    height: 0,
    width: 0,
  }

  constructor(props: ImageProps, state: PictureIntersectionObserverStateType) {
    super(props, state)
    this.fetchData()
  }

  get target() {
    return this.wrapperRef.current === null
      ? undefined
      : (this.wrapperRef.current as HTMLElement)
  }

  observe() {
    /**
     * @todo @@perf can throttle this & requestAnimationFrame
     *              ^ or depending on use case, do that for each handler
     *              ^ can also put as bound method, but we only call observe once
     */
    const handleObservingChange = (changes: IntersectionObserverEntry[]) => {
      for (const change of changes) {
        /**
         * Ratio of intersectionRect area to boundingClientRect area
         * Converted to /100
         */
        const visiblePercent = Math.floor(change.intersectionRatio * 100) + '%'

        console.log({ isIntersecting: change.isIntersecting, visiblePercent })

        if (
          change.isIntersecting === true &&
          this.state.isIntersecting === false
        ) {
          this.setState({ isIntersecting: true, hasIntersected: true })
        }
      }
    }

    const observerOptions = {
      root: undefined,
      rootMargin: '0px',

      /**
       * each 10% movement will trigger
       */
      threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    }

    this.observer = new IntersectionObserver(
      handleObservingChange,
      observerOptions
    )

    if (this.target === undefined) {
      console.error('[ObservablePicture] missing target')
    } else {
      this.observer.observe(this.target as HTMLElement)
    }
  }

  unobserve() {
    if (this.target !== undefined) {
      // Stop watching for intersection events on this specific target Element
      this.observer.unobserve(this.target)
      // Stop observing threshold events on all target elements
      this.observer.disconnect()
    }
  }

  async fetchData() {
    const { src } = this.props
    if (this.context.has(src)) {
      const value = this.context.get(src) as HeightWidthType
      /**
       * @note only done during constructor
       */
      this.state = {
        ...this.state,
        height: value.height,
        width: value.width,
      }
    } else {
      if (process.browser) {
        console.log('[fetchData] in browser - not loading')
        return
      }
      const dimensionsPromise = measureImage(src)
      this.context.set(src, dimensionsPromise)
    }
  }

  componentDidMount() {
    this.observe()
  }
  componentWillUnmount() {
    this.unobserve()
  }

  render() {
    const {
      src,
      className,
      renderPicture,
      srcSizeList,
      ...remainingProps
    } = this.props as Required<PictureIntersectionObserverProps>

    // can also add &h=${this.state.height}
    const url = `${src}&w=${this.state.width}`

    const renderImageProps = {
      ...remainingProps,
      forwardedRef: this.wrapperRef,
      src: url,
      className,
      children: (
        <AmpContext.Consumer>
          {({ isAmp }) => {
            return (
              <>
                {(isAmp === true ||
                  this.state.hasIntersected === true ||
                  process.env.NODE_ENV === 'test') && (
                  <>
                    {Array.isArray(srcSizeList) === true &&
                      srcSizeList.map(([size, src]) => (
                        <source key={size} media={size} srcSet={src} />
                      ))}
                    <StyledImage
                      isIntersecting={this.state.isIntersecting}
                      src={src}
                      key="img-when-intersected"
                      width={this.state.width}
                      height={this.state.height}
                      {...remainingProps}
                    />
                  </>
                )}
                {isAmp === false && (
                  <noscript key="img-for-non-js">
                    <StyledImage src={url} {...remainingProps} />
                  </noscript>
                )}
              </>
            )
          }}
        </AmpContext.Consumer>
      ),
    }

    return renderPicture(renderImageProps, this.state)
  }
}

export default PictureIntersectionObserver
export { PictureIntersectionObserver as ObservablePicture }
