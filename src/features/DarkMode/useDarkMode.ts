/**
 * @file @todo unit tests
 */
import { isPromise } from '../../utils/is'
import { useIndexDb } from '../../utils/hooks/useIndexDb'
import { useMedia } from '../../utils/hooks/useMedia'
import type { DarkModeHookArrayType } from '../../utils/hooks/typings'

/**
 * @see https://usehooks.com/useDarkMode/
 */
export function useDarkMode(): DarkModeHookArrayType {
  // persist state through a page refresh.
  const [hasDarkModeEnabled, setDarkMode] = useIndexDb('dark-mode-enabled')

  // See if user has set a browser or OS preference for dark mode.
  // The usePrefersDarkMode hook composes a useMedia hook (see code below).
  const hasPreferDarkMode = usePrefersDarkMode()

  /**
   * this will make sure it updates after the page loads
   */
  if (process.browser) {
    if (isPromise(hasDarkModeEnabled)) {
      ;(hasDarkModeEnabled as Promise<boolean>).then(result => {
        setDarkMode(result)
      })
    }
  }

  // If hasDarkModeEnabled is defined use it, otherwise fallback to prefersDarkMode.
  // This allows user to override OS level setting on our website.
  const isEnabled =
    hasDarkModeEnabled !== undefined
      ? (hasDarkModeEnabled as boolean)
      : hasPreferDarkMode

  // Return enabled state and setter
  return [isEnabled, setDarkMode as (value: boolean) => void]
}

/**
 * @see https://amp.devamp.dev/examples/style-layout/dark_mode_toggle
 *
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

export function useDarkModeUrl(
  darkMode: ReturnType<typeof useDarkMode>,
  url: URL
) {
  const [hasPreferDarkMode, setDarkMode] = darkMode

  /**
   * @todo the BrightnessIcon should update this
   *       and we can append when navigating pages
   *       or we can at least override it by setting the value
   *
   * @example
   *  theme = 'dark' | 'light'
   */
  if (url?.searchParams.has('theme')) {
    const theme = url.searchParams.get('theme')
    // it is dark theme, and dark theme is not true
    if (theme === 'dark' && hasPreferDarkMode === false) {
      setDarkMode(true)
    } else if (theme === 'light' && hasPreferDarkMode !== false) {
      setDarkMode(false)
    }
  }
}
