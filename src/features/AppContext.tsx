/**
 * @todo could also use PageContext
 */
import * as React from 'react'
import { createContext } from 'react'
import { URL } from '../utils/url'
import { EMPTY_ARRAY } from '../utils/EMPTY'
import { DarkModeHookArrayType } from '../utils/hooks/typings'

/**
 * @todo can observe the scrolling, etc
 */
export interface AppContextValueType {
  /**
   * url of the current page (_universal_)
   */
  url: URL
  /**
   * the available window height
   */
  height?: number
  /**
   * the available window width
   */
  width?: number

  /**
   * can set this with hooks...?
   */
  darkMode: DarkModeHookArrayType
}

/**
 * could move to a `constants` file
 */
export const DEFAULT_URL = new URL('https://localhost')

export const AppContext = createContext<AppContextValueType>({
  url: DEFAULT_URL as any,
  height: 0,
  width: 0,
  darkMode: EMPTY_ARRAY as DarkModeHookArrayType,
})

export class AppContextProvider extends React.PureComponent<{
  url: URL
  darkMode?: DarkModeHookArrayType
}> {
  render() {
    const { url = DEFAULT_URL, children, darkMode } = this.props
    const contextValue = { url, darkMode }
    return (
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    )
  }
}
