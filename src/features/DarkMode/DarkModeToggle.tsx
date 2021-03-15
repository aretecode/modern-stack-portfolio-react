import * as React from 'react'
import { useAmp } from 'next/amp'
import { StyledAnimatedBrightnessIcon } from '../MaterialIcon/AnimatedBrightnessIcon'

/**
 * @todo https://web.dev/prefers-color-scheme/
 * @see https://amp.dev/documentation/examples/style-layout/dark_mode_toggle/
 */
export function DarkModeToggleAmp() {
  return <></>
  // return (
  //   <>
  //     <input id="dark-mode" className="visually-hidden" type="checkbox" />
  //     <label htmlFor="dark-mode">Switch Theme</label>
  //   </>
  // )
}

export function DarkModeToggle() {
  const isAmp = useAmp()
  if (isAmp) {
    return <DarkModeToggleAmp />
  } else {
    return <StyledAnimatedBrightnessIcon />
  }
}
