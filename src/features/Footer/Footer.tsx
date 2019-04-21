import * as React from 'react'
import { StyledFooter } from './styled'
import { PortfolioContext, PortfolioContextType } from '../PortfolioContext'

export default class Footer extends React.PureComponent<{
  className?: string
}> {
  static contextType = PortfolioContext
  readonly context: PortfolioContextType

  render() {
    return (
      <StyledFooter {...this.props}>
        <p>
          <span>©{new Date().getFullYear()}</span>{' '}
          <span>{this.context.basics.name}</span>
        </p>
      </StyledFooter>
    )
  }
}
