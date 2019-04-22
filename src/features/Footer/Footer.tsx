import * as React from 'react'
import { PortfolioContext } from '../PortfolioContext'
import {
  StyledFooter,
  MadeWithText,
  MadeWithHeart,
  CanadaEh,
  OpenSourceLink,
  StyledSocialProfiles,
} from './styled'

export default function Footer(props: { className?: string }) {
  const context = React.useContext(PortfolioContext)
  return (
    <StyledFooter {...props}>
      <p>
        <span>©{new Date().getFullYear()}</span>{' '}
        <span>{context.basics.name}</span>
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
      <StyledSocialProfiles />
    </StyledFooter>
  )
}
