import * as React from 'react'
import { render } from '../../../../__tests__/render'
import { PortfolioContext } from '../../PortfolioContext'
import SocialProfiles from '../SocialProfiles'
import { defaultApolloStatePortfolio } from '../../../constants'

describe('SocialProfiles', () => {
  it('should render all for context', () => {
    const { container } = render(
      <PortfolioContext.Provider value={defaultApolloStatePortfolio as any}>
        <SocialProfiles />
      </PortfolioContext.Provider>
    )
    expect(container).toMatchSnapshot()
  })
})
