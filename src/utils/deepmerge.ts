/**
 * @todo create PR upstream @@forked
 * @note forked to reduce bundle size (tree-shakable) and this is a non explicit dependency (dev-deps [jest]) use it
 * @related @see https://chain-able.js.org/documentation.html#dopemerge-prototype-cloneIfNeeded
 * @see https://github.com/TehShrike/deepmerge/blob/master/index.js
 * @see https://github.com/TehShrike/is-mergeable-object/blob/master/index.js
 */
import type { UnknownObj } from '../typings'

export interface Options {
  arrayMerge?(target: any[], source: any[], options?: Options): any[]
  clone?: boolean
  customMerge?: (
    key: string,
    options?: Options
  ) => ((x: any, y: any) => any) | undefined
  isMergeableObject?(value: UnknownObj | unknown): boolean
}

export type OptionsCoerced = Required<Options> & {
  /** @private */ cloneUnlessOtherwiseSpecified?: any
}

/** @todo use from ./is */
function isNonNullObject(value: unknown) {
  return !!value && typeof value === 'object'
}
function isSpecial(value: unknown) {
  const stringValue = Object.prototype.toString.call(value)
  return (
    stringValue === '[object RegExp]' ||
    stringValue === '[object Date]' ||
    isReactElement(value as UnknownObj)
  )
}
// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
const canUseSymbol = typeof Symbol === 'function' && Symbol.for
const REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7
function isReactElement(value: UnknownObj) {
  return value.$$typeof === REACT_ELEMENT_TYPE
}
export function isMergeableObject(value: unknown) {
  return isNonNullObject(value) && !isSpecial(value)
}

function emptyTarget(value: unknown): [] | {} {
  return Array.isArray(value) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(
  value: unknown,
  options: OptionsCoerced
): any {
  return options.clone !== false && options.isMergeableObject!(value)
    ? deepmerge(emptyTarget(value), value, options)
    : value
}

function defaultArrayMerge(target: any, source: any, options: OptionsCoerced) {
  return target.concat(source).map(function (element: any) {
    return cloneUnlessOtherwiseSpecified(element, options)
  })
}

function getMergeFunction(key: string, options: OptionsCoerced) {
  if (!options.customMerge) return deepmerge

  const customMerge = options.customMerge(key)
  return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target: UnknownObj): any[] {
  return Object.getOwnPropertySymbols
    ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
        return target.propertyIsEnumerable(symbol)
      })
    : []
}

function getKeys(target: UnknownObj) {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object: UnknownObj, property: string) {
  try {
    return property in object
  } catch (_) {
    return false
  }
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target: UnknownObj, key: string) {
  return (
    propertyIsOnObject(target, key) && // Properties are safe to merge if they don't exist in the target yet,
    !(
      Object.hasOwnProperty.call(target, key) && // unsafe if they exist up the prototype chain,
      Object.propertyIsEnumerable.call(target, key)
    )
  ) // and also unsafe if they're nonenumerable.
}

function mergeObject(
  target: UnknownObj,
  source: UnknownObj,
  options: OptionsCoerced
) {
  const destination = {}
  if (options.isMergeableObject(target)) {
    getKeys(target).forEach(function (key) {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options)
    })
  }
  getKeys(source).forEach(function (key) {
    if (propertyIsUnsafe(target, key)) return

    if (
      propertyIsOnObject(target, key) &&
      options.isMergeableObject(source[key])
    ) {
      destination[key] = getMergeFunction(key, options)(
        target[key],
        source[key],
        options
      )
    } else {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options)
    }
  })
  return destination
}

export function deepmerge<A extends any, B extends any>(
  target: A,
  source: B,
  options: Options = {}
): A & B {
  options.arrayMerge = options.arrayMerge || defaultArrayMerge
  options.isMergeableObject = options.isMergeableObject || isMergeableObject
  // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
  // implementations can use it. The caller may not replace it.
  ;(options as OptionsCoerced).cloneUnlessOtherwiseSpecified =
    cloneUnlessOtherwiseSpecified

  const isSourceArray = Array.isArray(source)
  const isTargetArray = Array.isArray(target)
  const didSourceAndTargetTypesMatch = isSourceArray === isTargetArray

  if (!didSourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(
      source,
      options as OptionsCoerced
    ) as any
  } else if (isSourceArray) {
    return options.arrayMerge(
      target as any,
      source,
      options as OptionsCoerced
    ) as any
  } else {
    return mergeObject(
      target as any,
      source as any,
      options as OptionsCoerced
    ) as any
  }
}

/** @@forked changed this */
export function deepmergeAll(array: any, options: OptionsCoerced) {
  if (process.env.NODE_ENV !== 'production' && !Array.isArray(array))
    throw new Error('first argument should be an array')

  return array.reduce(function (prev: any, next: any) {
    return deepmerge(prev, next, options)
  }, {})
}

export { deepmerge as default }
