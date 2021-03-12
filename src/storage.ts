/**
 * @see https://github.com/jakearchibald/idb#typescript
 * @see https://github.com/jakearchibald/idb#keyval-store
 */
import { get, set, del, clear, keys } from 'idb-keyval'
import type { ResumeEverythingType } from './typings'

/** @lint configure https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md to allow */
// eslint-disable-next-line @typescript-eslint/naming-convention
const IS_REALM_WITHOUT_INDEX_DB =
  typeof indexedDB !== 'object' || !process.browser

/** @idea could also split into the `basics` & `workList` */
export interface SpecificPortfolioSchemaType {
  portfolio: {
    key: string
    value: ResumeEverythingType
  }
}

type PortfolioKeyType =
  | keyof SpecificPortfolioSchemaType['portfolio']['value']
  | keyof SpecificPortfolioSchemaType

const inMemoryStore = new Map<any, any>()

export const portfolioKeyValStore = {
  async get<Key extends keyof SpecificPortfolioSchemaType>(key: Key) {
    if (IS_REALM_WITHOUT_INDEX_DB) {
      return inMemoryStore.get(key)
    } else {
      return await get(key)
    }
  },
  async set<Key extends keyof SpecificPortfolioSchemaType>(key: Key, val: any) {
    if (IS_REALM_WITHOUT_INDEX_DB) {
      return inMemoryStore.set(key, val)
    } else {
      return await set(key, val)
    }
  },
  async delete<Key extends PortfolioKeyType>(key: Key) {
    if (IS_REALM_WITHOUT_INDEX_DB) {
      return inMemoryStore.delete(key)
    } else {
      return await del(key)
    }
  },
  async clear() {
    if (IS_REALM_WITHOUT_INDEX_DB) {
      return inMemoryStore.clear()
    } else {
      return await clear()
    }
  },
  async keys() {
    if (IS_REALM_WITHOUT_INDEX_DB) {
      return inMemoryStore.keys()
    } else {
      return await keys()
    }
  },
} as const
