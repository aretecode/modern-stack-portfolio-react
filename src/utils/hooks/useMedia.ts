import { useState, useEffect } from 'react'
import { EMPTY_ARRAY } from '../EMPTY'

/**
 * @see https://usehooks.com/useMedia
 */
export function useMedia(
  queries: string[],
  values: string[] | boolean[],
  defaultValue?: unknown
): boolean {
  /**
   * this code is only for the browser
   * @todo we could support a url based approach or cookies or session storage or tracking UA
   */
  if (!process.browser) return false

  // Array containing a media query list for each query
  const mediaQueryLists = queries.map(window.matchMedia)

  // Function that gets value based on matching media query
  const getValue = () => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex(mql => mql.matches)
    // Return related value or defaultValue if none
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue
  }

  // State and setter for matched value
  const [value, setValue] = useState(getValue) as [
    boolean,
    (value: unknown) => void
  ]

  useEffect(() => {
    // Event listener callback
    // Note: By defining getValue outside of useEffect we ensure that it has ...
    // ... current values of hook args (as this hook callback is created once on mount).
    const handler = () => setValue(getValue)
    // Set a listener for each media query with above handler as callback.
    mediaQueryLists.forEach(mql => mql.addListener(handler))
    // Remove listeners on cleanup
    return () => mediaQueryLists.forEach(mql => mql.removeListener(handler))
  }, EMPTY_ARRAY) // Empty array ensures effect is only run on mount and unmount

  return value
}
