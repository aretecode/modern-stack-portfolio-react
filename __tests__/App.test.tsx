/**
 * @see https://github.com/zeit/next.js/blob/master/examples/with-jest/__tests__/index.test.js
 */
import * as React from 'react'
import * as useAmpModule from 'next/amp'
import { waitFor } from '@testing-library/react'
import { render } from './render'
import { defaultApolloStatePortfolio } from '../src/constants'
import AboutPage from '../pages/About'
import PortfolioPage from '../pages/Portfolio'

const sleep = (time: number) => Promise.resolve(time)

describe('<App>', () => {
  it('should match snapshot', async () => {
    const view = (
      <>
        <PortfolioPage />
        <AboutPage />
      </>
    )
    const { container, rerender, getByText } = render(view)
    rerender(view)
    console.log('[tests] App - waiting')
    await waitFor(() =>
      expect(() =>
        getByText(defaultApolloStatePortfolio.work[0].company)
      ).not.toThrowError()
    )
    await sleep(5000)

    console.log('[tests] App - waited')
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot for amp', async () => {
    jest.spyOn(useAmpModule, 'useAmp').mockImplementation(() => true)

    const view = (
      <>
        <PortfolioPage />
        <AboutPage />
      </>
    )
    const { container, rerender, getByText } = render(view)
    rerender(view)
    console.log('[tests] App - waiting')
    await waitFor(() =>
      expect(() =>
        getByText(defaultApolloStatePortfolio.work[0].company)
      ).not.toThrowError()
    )
    await sleep(5000)

    console.log('[tests] App - waited')
    expect(container).toMatchSnapshot()
  })
})
