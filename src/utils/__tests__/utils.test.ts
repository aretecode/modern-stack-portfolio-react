/**
 * @note - have not tested `is`, it is tested in `chain-able`
 */
import { requestIdleCallback } from '../requestIdleCallback'
import { EMPTY_OBJ, EMPTY_ARRAY } from '../EMPTY'
import { keep } from '../keep'

describe('utils', () => {
  describe('keep', () => {
    it('should keep props we want, side effect free', () => {
      const KEEP_LIST = Object.freeze(['src', 'alt'])
      const obj = {
        src: 'canada',
        alt: 'eh',
        moose: true,
        igloo: 1,
      }
      const kept = keep(obj, KEEP_LIST)
      expect(obj === kept).toEqual(false)
      expect(kept).toEqual({
        src: 'canada',
        alt: 'eh',
      })
    })

    it('should keep only the props we list', () => {
      const obj = {
        one: 1,
        two: 2,
      }

      function expectKept(kept: Partial<typeof obj>) {
        // removed a property
        expect(Object.keys(kept).length).toEqual(1)
        expect(kept.two).toEqual(2)
        expect(kept.one).toEqual(undefined)

        // did not mutate
        expect(obj.two).toEqual(2)
      }

      expect.assertions(4)
      const kept = keep(obj, ['two'])
      expectKept(kept)
    })
  })

  describe('requestIdleCallback', () => {
    it('should be ~immediate in test environment', () => {
      const now = Date.now()
      requestIdleCallback(() => {
        const after = Date.now()
        expect(after - now).toBeLessThan(250)
      })
    })
  })
  describe('empty', () => {
    it('should just be simple frozen empty objects', () => {
      expect(Object.isFrozen(EMPTY_OBJ)).toEqual(true)
      expect(Object.isFrozen(EMPTY_ARRAY)).toEqual(true)
      expect(EMPTY_ARRAY.length).toEqual(0)
      expect(Object.keys(EMPTY_OBJ).length).toEqual(0)
    })
  })
})
