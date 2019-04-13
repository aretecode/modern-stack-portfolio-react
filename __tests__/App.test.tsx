/**
 * @see https://github.com/zeit/next.js/blob/master/examples/with-jest/__tests__/index.test.js
 */
import * as React from 'react'
import { render, waitForElement } from 'react-testing-library'
import { defaultApolloStateResume } from '../src/apolloState'
import { InnerApp } from '../pages/_app'
import AboutPage from '../pages/About'
import ResumePage from '../pages/Resume'

const sleep = async (time: number) => Promise.resolve(time)

describe('app', () => {
  it('should match snapshot', async () => {
    const view = (
      <InnerApp>
        <ResumePage />
        <AboutPage />
      </InnerApp>
    )
    const { container, rerender, getByText } = render(view)
    rerender(view)
    console.log('[tests] App - waiting')
    await waitForElement(() =>
      getByText(defaultApolloStateResume.work[0].company)
    )
    await sleep(5000)

    console.log('[tests] App - waited')
    expect(container).toMatchSnapshot()
  })
})
