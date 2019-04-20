import { createContext } from 'react'
import { logger } from '../../log'
import { DataLoadingContextType } from './typings'

export const DEFAULT_DATA_LOADING_CONTEXT = Object.freeze({
  set(key?: string, arg?: unknown): void {
    if (process.env.NODE_ENV === 'development') {
      logger.warn('missing provider of DataLoadingContext')
    }
  },
  has(key?: string): boolean {
    if (process.env.NODE_ENV === 'development') {
      logger.warn('missing provider of DataLoadingContext')
    }
    return false
  },
  get(key?: string) {
    if (process.env.NODE_ENV === 'development') {
      logger.warn('missing provider of DataLoadingContext')
    }
    return undefined as any
  },
})

const DataLoadingContext = createContext<DataLoadingContextType>(
  DEFAULT_DATA_LOADING_CONTEXT
)

export { DataLoadingContext, DataLoadingContext as Context }
