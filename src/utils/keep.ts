/**
 * @see https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-377567046
 */
import { AnyObj } from '../typings'

export const keep = <
  Obj extends {} = AnyObj,
  List extends Array<keyof Obj> | ReadonlyArray<keyof Obj> = Array<keyof Obj>
>(
  obj: Obj,
  keys: List
): Pick<Obj, List[number]> => {
  const result = {} as any
  Object.keys(obj)
    .filter(key => keys.includes(key as any))
    .forEach(key => {
      result[key] = obj[key]
    })
  return result
}
