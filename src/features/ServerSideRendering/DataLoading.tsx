import { isFunction } from '../../utils/is'
import { DataLoadingContextType } from './typings'

/**
 * @todo can index the results?
 * @todo simplify
 */
export class DataLoading<DataLoadingTypeArg = object>
  implements DataLoadingContextType {
  promiseMap = new Map<string, Promise<DataLoadingTypeArg>>()
  result = [] as Array<[string, DataLoadingTypeArg]>

  static from<StaticDataLoadingTypeArg extends object>(
    instance: Partial<
      DataLoading & {
        promiseMapAsArray?: [string, Promise<StaticDataLoadingTypeArg>]
      }
    >
  ) {
    if (instance === undefined) {
      console.warn('[dataLoading] empty arg')
      return new DataLoading()
    } else if (Array.isArray(instance.promiseMapAsArray)) {
      /**
       * we can rehydrate --
       * @example
       *    new Map(Array.from(new Map().set('eh', 1)))
       */
      console.debug('[dataLoading] rehydrating')
      console.log({ instance })
      const newInstance = new DataLoading()
      newInstance.promiseMap = new Map(instance.promiseMapAsArray as any)
      newInstance.result = instance.result! || []
      newInstance.all()
      return newInstance
    } else if (isFunction(instance.all)) {
      console.debug('[dataLoading] loading from class')
      /**
       * we have a class instance
       */
      instance!.all()
      return instance as DataLoading
    } else {
      console.warn('[dataLoading] cannot rehydrate')
      /**
       * we cannot rehydrate
       */
      return new DataLoading()
    }
  }

  toJSON() {
    return {
      promiseMapAsArray: Array.from(this.promiseMap),
      result: this.result,
    }
  }

  /**
   * could load all values here
   */
  set(key: string, promise: Promise<DataLoadingTypeArg>): void {
    this.promiseMap.set(key, promise)

    promise.then(value => {
      this.result.push([key, value])
    })
  }

  get<TypeArg = DataLoadingTypeArg>(key: string) {
    /**
     * @note this may return a Promise of type...
     */
    return (this.promiseMap.get(key) as any) as TypeArg
  }

  has(key: string) {
    return this.promiseMap.has(key)
  }

  get hasPromises(): boolean {
    return this.promiseMap.size > 0
  }

  all() {
    if (this.result.length > 0) {
      return Promise.resolve(this.result)
    }

    const mapAsList = Array.from(this.promiseMap)
    const mapAsPromiseList = mapAsList.map(async ([key, value]) => {
      return [key, await value]
    })
    const loading = Promise.all(mapAsPromiseList)
    loading.then(result => {
      this.result = result as Array<[string, DataLoadingTypeArg]>
    })

    return loading
  }

  clear() {
    this.result = [] as Array<[string, DataLoadingTypeArg]>
    this.promiseMap.clear()
  }
}
