import type { Serialized } from '../../typings'

export type DarkModeHookArrayType = [
  boolean | Promise<boolean>,
  (isDarkMode: boolean) => void,
  boolean?
]

export type CallbackToSerialized = (value: Serialized) => Serialized
export type SerializedOrCallbackToSerialized = Serialized | CallbackToSerialized
