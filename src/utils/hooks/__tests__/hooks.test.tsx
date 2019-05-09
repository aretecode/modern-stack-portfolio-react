import { useDarkMode, usePrefersDarkMode } from '../useDarkMode'
import { useIndexDb } from '../useIndexDb'
import { useMedia } from '../useMedia'

describe('utils/hooks', () => {
  describe('useDarkMode', () => {
    it('should work - at least always false on server', () => {
      return new Promise(async resolve => {
        function DarkMode() {
          const [doesPreferDarkMode, setDoesPreferDarkMode] = useDarkMode()
          expect(doesPreferDarkMode).toEqual(false)
          return <></>
        }
        const view = <DarkMode />
        resolve(view)
      })
    })
  })

  describe('useIndexDb', () => {
    it('should work the same way as indexDb storage tests - currently this tests only the sync value', () => {
      return new Promise(async resolve => {
        function IndexDb() {
          const [value, setValue] = useIndexDb('eh', 'canada')
          expect(value).toEqual('canada')
          return <></>
        }
        const view = <IndexDb />
        resolve(view)
      })
    })
  })

  describe('useMedia', () => {
    it('should return false for non browser', () => {
      expect.assertions(1)
      function Media() {
        const prefersDarkMode = useMedia(
          ['(prefers-color-scheme: dark)'],
          [true],
          false
        )
        expect(prefersDarkMode).toEqual(false)
        return <></>
      }
      const view = <Media />
      // expect fragment?
    })
  })
})
