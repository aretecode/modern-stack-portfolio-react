import { createContext } from 'react'
import { DataLoadingContextType } from './typings'

export const DEFAULT_DATA_LOADING_CONTEXT = Object.freeze({
  set(key?: string, arg?: unknown) {
    console.error('missing provider of DataLoadingContext')
  },
  has(key?: string) {
    console.error('missing provider of DataLoadingContext')
    return false
  },
  get(key?: string) {
    console.error('missing provider of DataLoadingContext')
    return undefined
  },
})

const DataLoadingContext = createContext<DataLoadingContextType>(
  DEFAULT_DATA_LOADING_CONTEXT
)

export { DataLoadingContext, DataLoadingContext as Context }
