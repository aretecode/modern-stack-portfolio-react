import * as React from 'react'
import { render } from 'react-testing-library'
import { portfolioKeyValStore } from '../../../storage'
import { useDarkMode, usePrefersDarkMode } from '../useDarkMode'
import { useIndexDb } from '../useIndexDb'
import { useMedia } from '../useMedia'

describe('utils/hooks', () => {
  describe('useDarkMode', () => {
    it('should work - at least always false on server', () => {
      expect.assertions(1)

      return new Promise(async resolve => {
        function DarkMode() {
          const [doesPreferDarkMode] = useDarkMode()

          Promise.resolve(doesPreferDarkMode).then((value = false) => {
            expect(value).toEqual(false)
            resolve(value)
          })

          return <></>
        }
        const view = render(<DarkMode />)
        return view
      })
    })

    it('should work with usePrefersDarkMode', () => {
      expect.assertions(1)

      return new Promise(async resolve => {
        function DarkMode() {
          const doesPreferDarkMode = usePrefersDarkMode()

          Promise.resolve(doesPreferDarkMode).then(value => {
            expect(value).toEqual(false)
            resolve(value)
          })

          return <></>
        }
        const view = render(<DarkMode />)
        return view
      })
    })
  })

  describe('useIndexDb', () => {
    it('should work the same way as indexDb storage tests - currently this tests only the sync value', () => {
      expect.assertions(1)

      return new Promise(async resolve => {
        await portfolioKeyValStore.set('eh' as any, 'canada')
        function IndexDb() {
          const [asyncValue] = useIndexDb('eh') as [Promise<any>, any]
          asyncValue.then(value => {
            expect(value).toEqual('canada')
            resolve(value)
          })
          return <></>
        }
        const view = render(<IndexDb />)
        return view
      })
    })
  })

  describe('useMedia', () => {
    it('should return false for non browser', () => {
      expect.assertions(1)
      return new Promise(async resolve => {
        function Media() {
          const prefersDarkMode = useMedia(
            ['(prefers-color-scheme: dark)'],
            [true],
            false
          )
          expect(prefersDarkMode).toEqual(false)
          return <></>
        }
        const view = render(<Media />)
        resolve(view)
      })
    })
  })
})
