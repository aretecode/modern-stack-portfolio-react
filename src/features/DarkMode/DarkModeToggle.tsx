import * as React from 'react'
import { useAmp } from 'next/amp'
import { BrightnessButton } from './styled'

export function DarkModeToggleReact() {
  return <BrightnessButton />
}

export function DarkModeToggleAmp() {
  return <></>
  /** @todo */
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
