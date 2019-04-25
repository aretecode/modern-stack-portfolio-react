/**
 * @todo (#low) publish universal lib for it
 *       can support in-memory as well and setup whole thing
 *       with intention of perf & build size (to compare to alternatives)
 *       or use existing one
 */

/**
 * @see https://github.com/jakearchibald/idb#typescript
 */
import { openDB, DBSchema, IDBPDatabase } from 'idb'
import { ResumeType, WithTypeNameRecursive } from './typings'

const IS_REALM_WITHOUT_INDEX_DB =
  typeof indexedDB !== 'object' || !process.browser

/**
 * could also split into the `basics` & `workList`
 */
export interface SpecificPortfolioSchemaType {
  /**
   * @deprecated changed to `portfolio`
   */
  resume?: {
    key: string
    value: WithTypeNameRecursive<ResumeType>
  }
  portfolio: {
    key: string
    value: WithTypeNameRecursive<ResumeType>
  }
}

export type PortfolioSchemaType = DBSchema & SpecificPortfolioSchemaType
export type PortfolioDatabaseType = IDBPDatabase<PortfolioSchemaType>

/**
 * @todo this is in a ternary like this for perf & easier elimination (though we put inMemoryStore above), but we could put it in a function & fold
 * @todo this will need to be removed with build and simplified for article...
 * @note this is a very minimal stub for our domain purposes
 * @todo can do this better to avoid the require and reference-error above
 *
 * if we care about perf here
 * can compare this approach with alternatives of
 * - inlining with build system as if else in portfolioKeyValStore
 * - with non-async methods
 * - ...
 */
const inMemoryStore = new Map<any, any>()
const dbPortfolioPromise: Promise<PortfolioDatabaseType> =
  IS_REALM_WITHOUT_INDEX_DB === false
    ? openDB<PortfolioSchemaType>('portfolio-store', 1, {
        upgrade(db: PortfolioDatabaseType) {
          db.createObjectStore('portfolio')
        },
      })
    : (Promise.resolve({
        put(namespace: string, value: any, key: string) {
          return inMemoryStore.set(key, value)
        },
        delete(namespace: string, key: string) {
          return inMemoryStore.delete(key)
        },
        get(namespace: string, key: string) {
          return inMemoryStore.get(key)
        },
        // no args for these guys, unless we namespace a map or use the node fs mock
        clear: inMemoryStore.clear.bind(inMemoryStore),
        getAllKeys: inMemoryStore.keys.bind(inMemoryStore),
      }) as any)

/**
 * @see https://github.com/jakearchibald/idb#keyval-store
 *
 * could abstract
 */
const portfolioKeyValStore = {
  async get<Key extends keyof SpecificPortfolioSchemaType>(key: Key) {
    return (await dbPortfolioPromise).get('portfolio', key)
  },
  async set<Key extends keyof SpecificPortfolioSchemaType>(
    key: Key,
    // SpecificPortfolioSchemaType[Key]['value']
    val: any
  ) {
    return (await dbPortfolioPromise).put('portfolio', val, key)
  },
  /**
   * @todo (#ts) top level key generic
   */
  async delete<
    Key extends
      | keyof SpecificPortfolioSchemaType['portfolio']['value']
      | keyof SpecificPortfolioSchemaType
  >(key: Key) {
    return (await dbPortfolioPromise).delete('portfolio', key)
  },
  async clear() {
    return (await dbPortfolioPromise).clear('portfolio')
  },
  async keys() {
    return (await dbPortfolioPromise).getAllKeys('portfolio')
  },
}

export { portfolioKeyValStore }
