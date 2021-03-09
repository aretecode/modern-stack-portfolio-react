import * as React from 'react'
import { createContext } from 'react'
import { URL } from '../utils/url'
import { EMPTY_ARRAY } from '../utils/EMPTY'
import { DarkModeHookArrayType } from '../utils/hooks/typings'

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

const DEFAULT_APP_CONTEXT: AppContextValueType = {
  url: DEFAULT_URL as any,
  height: 0,
  width: 0,
  darkMode: EMPTY_ARRAY as DarkModeHookArrayType,
}

export const AppContext = createContext<AppContextValueType>(
  DEFAULT_APP_CONTEXT
)

export const AppContextProvider: React.FC<{
  url: URL
  darkMode?: DarkModeHookArrayType
}> = props => {
  const { url = DEFAULT_URL, children, darkMode } = props
  const contextValue = { ...DEFAULT_APP_CONTEXT, url, darkMode }
  return (
    <AppContext.Provider value={contextValue as any}>
      {children}
    </AppContext.Provider>
  )
}
