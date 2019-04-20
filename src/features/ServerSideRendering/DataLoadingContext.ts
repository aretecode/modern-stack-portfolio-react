import { createContext } from 'react'
import { DataLoadingContextType } from './typings'

export const DEFAULT_DATA_LOADING_CONTEXT = Object.freeze({
  set(key?: string, arg?: unknown): void {
    console.error('missing provider of DataLoadingContext')
  },
  has(key?: string): boolean {
    console.error('missing provider of DataLoadingContext')
    return false
  },
  get(key?: string) {
    console.error('missing provider of DataLoadingContext')
    return undefined as any
  },
})

const DataLoadingContext = createContext<DataLoadingContextType>(
  DEFAULT_DATA_LOADING_CONTEXT
)

export { DataLoadingContext, DataLoadingContext as Context }
