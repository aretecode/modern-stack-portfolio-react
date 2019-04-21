import * as React from 'react'
import { Navigation } from '../Navigation'
import { PortfolioContext, PortfolioContextType } from '../PortfolioContext'
import { StyledHeader, StyledLogo, StyledLogoLink } from './styled'

function fromContextNameToSimpleText(name: string) {
  return name.replace(/\s+/, '').toLowerCase()
}

export default class Header extends React.PureComponent<{
  className?: string
}> {
  static contextType = PortfolioContext
  readonly context: PortfolioContextType

  render() {
    const nameText = fromContextNameToSimpleText(this.context.basics.name)

    return (
      <StyledHeader {...this.props}>
        <StyledLogoLink to="/">
          <StyledLogo>{nameText}</StyledLogo>
        </StyledLogoLink>
        <Navigation />
      </StyledHeader>
    )
  }
}
