/**
 * @file @todo unit tests
 */
import { useState } from 'react'
import { portfolioKeyValStore } from '../../storage'
import type { Serialized } from '../../typings'
import {
  SerializedOrCallbackToSerialized,
  DarkModeHookArrayType,
} from './typings'

/**
 * @see https://usehooks.com/useLocalStorage/
 */
export function useIndexDb<Key extends string, Value extends Serialized>(
  key: Key,
  initialValue?: Serialized
): [any, (v: Serialized) => Promise<void>] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    // Get from local storage by key
    const item = portfolioKeyValStore.get(key as any)
    // Parse stored json or if none return initialValue
    return item !== undefined ? item : initialValue
  })

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = async (value: SerializedOrCallbackToSerialized) => {
    // Allow value to be a function so we have same API as useState
    const valueToStore =
      typeof value === 'function' ? value(storedValue as Serialized) : value
    // Save state
    setStoredValue(valueToStore)
    // Save to db
    await portfolioKeyValStore.set(key as any, valueToStore)
  }

  return [storedValue, setValue]
}
