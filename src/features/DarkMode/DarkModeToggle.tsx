import * as React from 'react'
import { useAmp } from 'next/amp'
import { BrightnessButton } from './styled'

export function DarkModeToggleReact() {
  return <BrightnessButton />
}

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
    return <DarkModeToggleReact />
  }
}
