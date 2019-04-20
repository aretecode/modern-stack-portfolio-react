import * as React from 'react'
import { Navigation } from '../Navigation'
import { ResumeContext, ResumeContextType } from '../ResumeContext'
import { StyledHeader, StyledLogo, StyledLogoLink } from './styled'

function fromResumeNameToSimpleText(name: string) {
  return name.replace(/\s+/, '').toLowerCase()
}

export default class Header extends React.PureComponent<{
  className?: string
}> {
  static contextType = ResumeContext
  readonly context: ResumeContextType

  render() {
    const nameText = fromResumeNameToSimpleText(this.context.basics.name)

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
