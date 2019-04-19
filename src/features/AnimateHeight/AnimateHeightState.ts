import { AnimateHeightContextStateType } from './typings'

/**
 * could also do this with hooks, but this an example app and showing a few different methods
 * could also add an `observe` method & `forceUpdate` higher up
 */
export class AnimateHeightState implements AnimateHeightContextStateType {
  height = 0
  maxHeight = undefined
  isExpanded = false
  set(key: keyof AnimateHeightContextStateType, value: number | boolean): void {
    this[key] = value
  }
}
