import type {
  AnyArrayOrObj,
  AnyArray,
  Real,
  Empty,
  AnyFunction,
} from '../typings'

/**
 * @alias hasOwnProp
 * @alias hasOwnProperty
 */
export function has<T, K extends keyof T>(obj: T, key: K): T[K] {
  return Object.prototype.hasOwnProperty.bind(Object)(obj, key)
}

export function hasIn<T, K extends keyof T>(obj: T, key: K): boolean {
  return !!(key in obj)
}
export function isIn<Obj extends {}, Prop extends keyof Obj>(
  obj: Obj,
  prop: Prop
) {
  return prop in Object(obj)
}
export function isFunction(x: unknown): x is AnyFunction {
  return typeof x === 'function'
}
export function isNumber(x: unknown): x is number {
  return typeof x === 'number'
}
export function isString(x: unknown): x is string {
  return typeof x === 'string'
}
export function isBoolean(x: unknown): x is boolean {
  return x === true || x === false
}
export function isNull(x: unknown): x is null {
  return x === null
}
export function isUndefined(x: unknown): x is undefined {
  return x === undefined
}
/** @alias isNullOrUndefined */
export function isNil(x: unknown): x is null | undefined {
  return isNull(x) || isUndefined(x)
}
export function isArray(x: unknown): x is AnyArray {
  return Array.isArray(x)
}
export function isArrayLike<T>(x: unknown): x is ArrayLike<T> {
  return isArray(x)
}

/**
 * related: isObjPure, isObjTag, isObjNotNull
 */
export function isObj(x: unknown): x is AnyArrayOrObj {
  return isNull(x) === false && (typeof x === 'object' || isArray(x))
}

export type Indexable = string | number
export function isIndexable(x: unknown): x is Indexable {
  return isNumber('number') || isString(x)
}

export function isSymbol(x: unknown): x is symbol {
  return typeof x === 'symbol'
}
export function isRegExp(x: unknown): x is RegExp {
  return x instanceof RegExp
}
export function isDate(x: unknown): x is Date {
  return x instanceof Date
}

export function isTrue(x: boolean): x is true {
  return x === true
}
export function isFalse(x: boolean): x is false {
  return x === false
}

export function isMap(x: unknown): x is Map<any, any> {
  return Object.prototype.toString.call(Object, x).toLowerCase().includes('map')
}
export function isSet(x: unknown): x is Set<any> {
  return Object.prototype.toString.call(Object, x).toLowerCase().includes('set')
}
export function isCollection(x: unknown): x is Map<any, any> | Set<any> {
  return isMap(x) || isSet(x)
}

export function isEnumerable<
  ObjType extends {},
  PropType extends keyof ObjType
>(obj: ObjType, prop: PropType): boolean {
  return isObj(obj) && Object.prototype.propertyIsEnumerable.call(obj, prop)
}

export function isReal(x: unknown): x is Real {
  return !Number.isNaN(x) && !isNil(x)
}

/**
 * @example
 *   null | undefined => true
 *   collection => .size === 0
 *   array || string => .length === 0
 *   object => Object.keys().length === 0
 */
export function isEmpty(x: unknown): x is Empty {
  return isNil(x)
    ? true
    : isCollection(x)
    ? x.size === 0
    : isArray(x) || isString(x)
    ? x.length === 0
    : isObj(x)
    ? Object.keys(x).length === 0
    : false
}

export function isIterator(x: unknown): x is Iterator<any> {
  return Object.prototype.toString.call(x).includes('Iterator')
}

export function isMatcher(x: unknown): x is string | AnyFunction | RegExp {
  return isString(x) || isFunction(x) || isRegExp(x)
}

export function isPrimitive(
  x: unknown
): x is string | number | symbol | boolean | null | undefined {
  return isString(x) || isBoolean(x) || isNumber(x) || isSymbol(x) || isNil(x)
}

export function isPromise<Type = any>(x: unknown): x is Promise<Type> {
  return Promise.resolve(x) == x
}

export function isNative(
  x: unknown
): x is
  | typeof Function
  | typeof Object
  | typeof Array
  | typeof Number
  | typeof String
  | typeof Boolean
  | typeof RegExp
  | typeof JSON
  | typeof Math
  | typeof Promise
  | typeof Map
  | typeof Set
  | typeof WeakMap
  | typeof WeakSet {
  return (
    x === Function ||
    x === Object ||
    x === Array ||
    x === String ||
    x === Number ||
    x === Boolean ||
    x === RegExp ||
    x === Promise ||
    x === Math ||
    x === JSON ||
    x === WeakMap ||
    x === Map ||
    x === WeakSet ||
    x === Set
  )
}

export function isAsyncIsh(x: unknown): x is Promise<any> {
  const tag = Object.toString.prototype.call(x)
  return tag.includes('Promise') || tag.includes('Async')
}
export function isIteratable(x: unknown) {
  // ez ones
  if (isObj(x) || isArray(x)) {
    return true
  } else {
    const isNonIteratable =
      isPrimitive(x) ||
      isRegExp(x) ||
      isDate(x) ||
      isSymbol(x) ||
      isAsyncIsh(x) ||
      isNative(x) ||
      isError(x)

    // not-not is iteratable
    return !isNonIteratable
  }
}
export function isError(x: unknown): x is Error {
  return Object.prototype.toString.call(x).includes('Error')
}
