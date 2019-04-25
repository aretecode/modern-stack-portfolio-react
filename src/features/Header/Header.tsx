import * as React from 'react'
import { Navigation } from '../Navigation'
import { PortfolioContext } from '../PortfolioContext'
import { StyledHeader, StyledLogo, StyledLogoLink } from './styled'

function fromContextNameToSimpleText(name: string) {
  return name.replace(/\s+/, '').toLowerCase()
}

export default function Header(props: { className?: string }) {
  const { name } = React.useContext(PortfolioContext).basics
  const nameText = fromContextNameToSimpleText(name)

  return (
    <StyledHeader {...props}>
      <StyledLogoLink to="/">
        <StyledLogo>{nameText}</StyledLogo>
      </StyledLogoLink>
      <Navigation />
    </StyledHeader>
  )
}
