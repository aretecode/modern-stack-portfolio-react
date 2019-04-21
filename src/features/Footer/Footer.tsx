import * as React from 'react'
import { PortfolioContext, PortfolioContextType } from '../PortfolioContext'
import {
  StyledFooter,
  MadeWithText,
  MadeWithHeart,
  CanadaEh,
  OpenSourceLink,
} from './styled'

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
        <p>
          <MadeWithText>Made with</MadeWithText>
          <MadeWithHeart />
          <MadeWithText>in</MadeWithText>
          <CanadaEh />
        </p>
        <p>
          <MadeWithText>Open Sourced at</MadeWithText>
          <OpenSourceLink />
        </p>
      </StyledFooter>
    )
  }
}
