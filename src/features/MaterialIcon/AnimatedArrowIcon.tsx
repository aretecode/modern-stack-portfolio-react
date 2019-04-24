/**
 * @see https://medium.com/@aniboaz/animate-svg-4fa7dd00e860
 * @see https://css-tricks.com/guide-svg-animations-smil/
 * @see https://code.likeagirl.io/how-to-build-svg-code-and-svg-animations-7bb1e42f6ef
 * @see https://stackoverflow.com/questions/46623645/react-reset-css-animation-in-progress
 * @see https://www.thinkful.com/projects/bringing-svg-graphics-to-life-with-react-432/
 * @see https://properdesign.rs/blog/2015/02/animating-svg-with-beginelement/
 * @see https://css-tricks.com/restart-css-animation/
 * @see https://medium.freecodecamp.org/how-to-build-animated-microinteractions-in-react-aab1cb9fe7c8
 * @example http://plouc.github.io/react-svg-buttons/
 * @example https://codesandbox.io/s/mqw8m78q1j
 * @example https://codesandbox.io/s/nr87l4q6w0
 * @example https://codesandbox.io/s/2wl104v5mr
 * @example https://codesandbox.io/s/30y689wok5
 *
 * @todo split up this file
 */
import * as React from 'react'
import { useContext, useState, useRef } from 'react'
import styled from 'styled-components'
import { iconInvisibleSquarePathView } from './MaterialIcon'
import { AmpContext } from '../AmpContext'

/**
 * for better perf (_at least, bundle size_), could reuse this in the other `svg`s
 */
export const StyledVector = styled.svg.attrs({
  role: 'img' as string,
  viewBox: '0 0 24 24' as string,
  xmlns: 'https://www.w3.org/2000/svg' as string,
})``

export interface AnimatedArrowIconProps {
  icon: 'up' | 'down'
}
export type AnimationRefType = React.MutableRefObject<
  SVGAnimateElement & { beginElement: () => void; endElement: () => void }
>

export const UP_ARROW_SINGLE_PATH_VALUE =
  '12.4846802 8 19.9693604 14.8939819 18.386673 16.9936981 12.4846802 11.6221466 6.61653912 16.9414647 5 14.8939819'
export const MIDDLE_ARROW_SINGLE_PATH_VALUE =
  '12.5472 8 19.6230229 12.8615485 18.1969774 14.8285039 12.3972809 11.1356625 6.6896367 14.8285039 5 12.8615485'
export const DOWN_ARROW_SINGLE_PATH_VALUE =
  '12.5 13.37 18.4 8 20 10.1 12.5 17 5 10.1 6.63 8.04'

/**
 * would be a good candidate for preval
 * @example `${UP_ARROW_SINGLE_PATH_VALUE};${MEDIUM_ARROW_SINGLE_PATH_VALUE};${DOWN_ARROW_SINGLE_PATH_VALUE};`
 * @example `${DOWN_ARROW_SINGLE_PATH_VALUE};${MEDIUM_ARROW_SINGLE_PATH_VALUE};${UP_ARROW_PATH_VALUE};`
 */
export const UP_ARROW_PATH_VALUE = [
  // start at down, go to middle, then up
  DOWN_ARROW_SINGLE_PATH_VALUE,
  MIDDLE_ARROW_SINGLE_PATH_VALUE,
  UP_ARROW_SINGLE_PATH_VALUE,
].join(';')
export const DOWN_ARROW_PATH_VALUE = [
  // start at up, go to middle, then down
  UP_ARROW_SINGLE_PATH_VALUE,
  MIDDLE_ARROW_SINGLE_PATH_VALUE,
  DOWN_ARROW_SINGLE_PATH_VALUE,
].join(';')

/**
 * @alias AnimatedArrowIcon
 * @todo ^ rename
 * @note we are not accepting icon given externally currently because we manage state here
 */
export const AnimatedArrowIcon = (
  props: Partial<AnimatedArrowIconProps> & React.HTMLAttributes<SVGElement>
) => {
  const { icon, ...remainingProps } = props
  const { isAmp } = useContext(AmpContext)
  const animationRef = useRef() as AnimationRefType
  const [direction, setDirection] = useState('down')
  /**
   * - this is just to check initial page load
   * - though we could put it elsewhere in a more reusable fashion
   * or use an existing external solution
   * - could also solve the same issue by using points in polygon
   * or using other properties on the animation like keySlices
   */
  const [hasRenderedAndAnimated, setHasRenderedAndAnimated] = useState(false)

  const handleClick = () => {
    setDirection(direction === 'up' ? 'down' : 'up')

    // we do not have this in test env
    if (process.env.NODE_ENV !== 'test') {
      animationRef.current.beginElement()
    }

    setHasRenderedAndAnimated(true)
  }

  return (
    <StyledVector onClick={handleClick} {...remainingProps}>
      <title>Arrow pointing down or up</title>
      <polygon
        points={
          // we want to use the points > animation on initial render
          // note that this is a single path value
          // and the values below is a list of paths as a string
          hasRenderedAndAnimated === false
            ? direction === 'up'
              ? UP_ARROW_SINGLE_PATH_VALUE
              : DOWN_ARROW_SINGLE_PATH_VALUE
            : undefined
        }
      >
        {isAmp === false && (
          <animate
            ref={animationRef}
            // render the animation right away
            // it will not have any values, duration will be 0,
            // so nothing will happen
            // then, after clicking, we will have the values,
            // and our ref will restart the animation
            begin="0s"
            attributeName="points"
            dur={hasRenderedAndAnimated === true ? '500ms' : '0ms'}
            fill="freeze"
            key="animation"
            values={
              // we only want to animate paths once it has rendered
              // until
              hasRenderedAndAnimated === true
                ? direction === 'up'
                  ? UP_ARROW_PATH_VALUE
                  : DOWN_ARROW_PATH_VALUE
                : ''
            }
          />
        )}
      </polygon>
      {iconInvisibleSquarePathView}
    </StyledVector>
  )
}
