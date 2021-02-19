/**
 * @todo `useDark` here (separate 1 level higher - brightness toggle)
 *
 * @see http://betravis.github.io/shape-tools/path-to-polygon/
 */
import * as React from 'react'
import { useContext, useState, useRef } from 'react'
import { AppContext } from '../AppContext'
import { AmpContext } from '../AmpContext'
import { iconInvisibleSquarePathView } from './MaterialIcon'
import { StyledVector } from './StyledVector'
import { AnimationRefType, AnimatedIconRenderPropArgs } from './typings'

export const BRIGHTNESS_PATH_4 =
  'M12.5,18 C11.61,18 10.76,17.8 10,17.45 C12.06,16.5 13.5,14.42 13.5,12 C13.5,9.58 12.06,7.5 10,6.55 C10.76,6.2 11.61,6 12.5,6 C15.81,6 18.0020592,8.69 18.0020592,12 C18.0020592,15.31 15.81,18 12.5,18 Z'
export const BRIGHTNESS_PATH_4_PART =
  'M12.5,18 C10.8318231,18 10.0152775,17.8642326 8.96591604,17.284968 C7.91655461,16.7057035 5.98781556,14.7923877 5.98781556,12 C5.98781556,9.20761233 7.41109679,7.7118608 9.02170537,6.77297869 C9.82204333,6.24410999 10.5020793,5.93633719 12.5,6 C15.8083169,6.10541798 18.0020592,8.69 18.0020592,12 C18.0020592,15.31 15.8099803,18 12.5,18 Z'
export const BRIGHTNESS_PATH_5 =
  'M11.9949374,18.0053564 C8.97056925,18.0053564 5.98781556,15.6088503 5.98781556,12 C5.98781556,8.39114971 8.97056925,5.99402647 11.9949374,5.99402647 C16.0164601,5.99402647 18.0020592,8.99824992 18.0020592,12 C18.0020592,15.0017501 15.9874562,18.0053564 11.9949374,18.0053564 Z'

import styled, { css } from 'styled-components'
const DotPath = styled.path`
  && {
    fill: transparent;
    transform: scale(0);
    transform-origin: center;
    transition: transform 0.12s cubic-bezier(0.4, 0, 0.2, 1),
      fill 0.48s cubic-bezier(0.4, 0, 0.2, 1);
  }
`
const dotPathView = (
  <DotPath
    d={
      'M12,8 C9.79,8 8,9.79 8,12 C8,14.21 9.79,16 12,16 C14.21,16 16,14.21 16,12 C16,9.79 14.21,8 12,8 Z'
    }
    key="dot"
  />
)

/**
 * @note the `as any` is used because of what seems to be a bug in ts-plugin-styled-components
 */
const StyledAnimatedVector = styled(StyledVector)`
  > g {
    > path {
      fill: #000;
    }
    > polygon {
      fill: #fff;
    }
  }

  ${DotPath as any} {
    ${(props: { state: AnimatedIconRenderPropArgs }) =>
      props.state.direction === 'up' &&
      css`
        transition: transform 0.24s cubic-bezier(0.4, 0, 0.2, 1),
          fill 0.24s cubic-bezier(0.4, 0, 0.2, 1) 0.12s;
        fill: #fff;
        transform: scale(1);
      `}
  }
`

export function AnimatedBrightnessIcon(props: { [key: string]: unknown }) {
  const { isAmp } = useContext(AmpContext)
  const [doesPreferDarkMode, setDarkMode] = useContext(AppContext).darkMode

  const animationRef = useRef() as AnimationRefType
  const [direction, setDirection] = useState('down')

  const [hasRenderedAndAnimated, setHasRenderedAndAnimated] = useState(false)
  const state = { hasRenderedAndAnimated, direction }

  const handleClick = () => {
    setDirection(direction === 'up' ? 'down' : 'up')
    setDarkMode(!doesPreferDarkMode)
    setHasRenderedAndAnimated(true)

    // we do not have this in test env
    if (process.env.NODE_ENV !== 'test') {
      animationRef.current.beginElement()
    }
  }

  return (
    <StyledAnimatedVector onClick={handleClick} {...props} state={state}>
      <title>Brightness Icon</title>
      <desc>An animated image, transitioning between a sun and a moon</desc>
      <g>
        <polygon points="20 15.31 23.31 12 20 8.69 20 4 15.31 4 12 0.69 8.69 4 4 4 4 8.69 0.69 12 4 15.31 4 20 8.69 20 12 23.31 15.31 20 20 20" />
        <path d={BRIGHTNESS_PATH_5} key="animated-path">
          {isAmp === false && (
            <animate
              ref={animationRef}
              begin="0s"
              keySplines="0.9 0.1 0.1 0.9"
              attributeName="d"
              dur="240ms"
              fill="freeze"
              key="animation"
              values={
                hasRenderedAndAnimated === true && direction === 'up'
                  ? [
                      BRIGHTNESS_PATH_4,
                      BRIGHTNESS_PATH_4_PART,
                      BRIGHTNESS_PATH_5,
                    ].join(';')
                  : [
                      BRIGHTNESS_PATH_5,
                      BRIGHTNESS_PATH_4_PART,
                      BRIGHTNESS_PATH_4,
                    ].join(';')
              }
            />
          )}
        </path>
      </g>
      {dotPathView}
      {iconInvisibleSquarePathView}
    </StyledAnimatedVector>
  )
}

export const StyledAnimatedBrightnessIcon = styled(AnimatedBrightnessIcon)`
  width: 24px;
  height: 24px;
`
