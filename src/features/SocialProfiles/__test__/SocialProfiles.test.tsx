import * as React from 'react'
import { render } from 'react-testing-library'
import { PortfolioContext } from '../../PortfolioContext'
import SocialProfiles from '../SocialProfiles'
import { defaultApolloStatePortfolio } from '../../../constants'

describe('SocialProfiles', () => {
  it('should render all for context', () => {
    const { container } = render(
      <PortfolioContext.Provider value={defaultApolloStatePortfolio}>
        <SocialProfiles />
      </PortfolioContext.Provider>
    )
    expect(container).toMatchSnapshot()
  })
})
