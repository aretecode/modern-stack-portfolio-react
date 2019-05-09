/**
 * @file @todo unit tests
 */
import { isPromise } from '../is'
import { useIndexDb } from './useIndexDb'
import { useMedia } from './useMedia'
import { DarkModeHookArrayType } from './typings'

/**
 * @see https://usehooks.com/useDarkMode/
 */
export function useDarkMode(): DarkModeHookArrayType {
  // persist state through a page refresh.
  const [enabledState, setDarkMode] = useIndexDb('dark-mode-enabled')

  // See if user has set a browser or OS preference for dark mode.
  // The usePrefersDarkMode hook composes a useMedia hook (see code below).
  const prefersDarkMode = usePrefersDarkMode()

  /**
   * this will make sure it updates after the page loads
   */
  if (process.browser) {
    if (isPromise(enabledState)) {
      (enabledState as Promise<boolean>).then(result => {
        setDarkMode(result)
      })
    }
  }

  // If enabledState is defined use it, otherwise fallback to prefersDarkMode.
  // This allows user to override OS level setting on our website.
  const enabled =
    enabledState !== undefined ? (enabledState as boolean) : prefersDarkMode

  // Return enabled state and setter
  return [enabled, setDarkMode as (value: boolean) => void]
}

/**
 * Compose our useMedia hook to detect dark mode preference.
 * The API for useMedia looks a bit weird, but that's because ...
 * ... it was designed to support multiple media queries and return values.
 * Thanks to hook composition we can hide away that extra complexity!
 *
 * @see https://usehooks.com/useMedia
 */
export function usePrefersDarkMode() {
  return useMedia(['(prefers-color-scheme: dark)'], [true], false)
}
