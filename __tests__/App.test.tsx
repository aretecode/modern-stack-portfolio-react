/**
 * @see https://github.com/zeit/next.js/blob/master/examples/with-jest/__tests__/index.test.js
 */
import * as React from 'react'
import * as useAmpModule from 'next/amp'
import { waitFor, act } from '@testing-library/react'
import { render } from './render'
import AboutPage from '../pages/About'
import PortfolioPage from '../pages/Portfolio'
import { defaultApolloStatePortfolio } from './constants'

/** @todo https://github.com/styled-components/styled-components/issues/1931 */
describe.skip('<App>', () => {
  it('should match snapshot', async () => {
    const view = (
      <>
        <PortfolioPage {...defaultApolloStatePortfolio} />
        <AboutPage {...defaultApolloStatePortfolio} />
      </>
    )
    const { container, getByText } = render(view)
    console.log('[tests] App - waiting')
    await waitFor(() =>
      expect(() =>
        getByText(defaultApolloStatePortfolio.work[0].company)
      ).not.toThrowError()
    )
    act(() => {
      jest.runOnlyPendingTimers()
    })
    console.log('[tests] App - waited')
    expect(container).toMatchSnapshot()
  })

  it('should match snapshot for amp', async () => {
    const spy = jest
      .spyOn(useAmpModule, 'useAmp')
      .mockImplementation(() => true)

    const view = (
      <>
        <PortfolioPage {...defaultApolloStatePortfolio} />
        <AboutPage {...defaultApolloStatePortfolio} />
      </>
    )
    const { container, getByText } = render(view)
    console.log('[tests] App - waiting')
    await waitFor(() =>
      expect(() =>
        getByText(defaultApolloStatePortfolio.work[0].company)
      ).not.toThrowError()
    )
    act(() => {
      jest.runOnlyPendingTimers()
    })
    console.log('[tests] App - waited')
    expect(container).toMatchSnapshot()
    spy.mockRestore()
  })
})
