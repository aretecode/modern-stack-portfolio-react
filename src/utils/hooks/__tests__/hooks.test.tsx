import * as React from 'react'
import { waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { portfolioKeyValStore } from '../../../storage'
import * as darkModeModule from '../../../features/DarkMode/useDarkMode'
import {
  useDarkMode,
  usePrefersDarkMode,
} from '../../../features/DarkMode/useDarkMode'
import { useIndexDb } from '../useIndexDb'
import { useMedia } from '../useMedia'

describe('utils/hooks', () => {
  /** @todo this needs to be better */
  describe('useDarkMode', () => {
    it.skip('should be true when value in indexdb is true', async () => {
      await portfolioKeyValStore.set('dark-mode-enabled' as any, true)
      const { result } = renderHook(() => useDarkMode())

      await waitFor(() => {
        console.log({ result })
        expect(result.current[0]).toBe(true)
      })
      await portfolioKeyValStore.delete('dark-mode-enabled' as any)
    })

    it.skip('should be true when value in media-query is true', async () => {
      const spy = jest
        .spyOn(darkModeModule, 'usePrefersDarkMode')
        .mockImplementation(() => true)
      const { result } = renderHook(() => useDarkMode())

      await waitFor(() => {
        expect(result.current[0]).toBe(true)
      })
      spy.mockRestore()
    })

    it.skip('should work - at least always false on server', async () => {
      const { result } = renderHook(() => useDarkMode())

      await waitFor(() => {
        expect(result.current[0]).toBe(false)
      })
    })

    it('should work with usePrefersDarkMode', async () => {
      const { result } = renderHook(() => usePrefersDarkMode())
      await waitFor(() => {
        expect(result.current).toBe(false)
      })
    })
  })

  describe('useIndexDb', () => {
    it('should work the same way as indexDb storage tests - currently this tests only the sync value', async () => {
      await portfolioKeyValStore.set('eh' as any, 'canada')

      const { result } = renderHook(() => useIndexDb('eh'))

      await waitFor(async () => {
        const value = await result.current[0]
        expect(value).toBe('canada')
      })
    })
  })

  describe('useMedia', () => {
    it('should return false for non browser', async () => {
      const { result } = renderHook(() =>
        useMedia(['(prefers-color-scheme: dark)'], [true], false)
      )
      await waitFor(() => {
        expect(result.current).toBe(false)
      })
    })
  })
})
