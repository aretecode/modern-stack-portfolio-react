import * as React from 'react'
import { SocialProfiles } from '../SocialProfiles'
import { PortfolioContext, PortfolioContextType } from '../PortfolioContext'
import {
  StyledFooter,
  MadeWithText,
  MadeWithHeart,
  CanadaEh,
  OpenSourceLink,
} from './styled'
import styled from 'styled-components'

/**
 * @todo cleanup these styles & move @@codesmell
 * ^ especially remove elements from the dom, rather than styles to hide
 */
const StyledSocialProfiles = styled(SocialProfiles)`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  padding: 0;
  width: 25vw;
  height: unset;
  @media (max-width: 1023px) {
    width: 50vw;
  }
  > a {
    width: unset;
    flex-basis: unset;
    display: initial;
    padding: 1rem 1rem 1rem 0;
    &:last-child {
      display: none;
    }
    > svg {
      &:first-child {
        fill: white;
      }
    }
  }
`

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
        <StyledSocialProfiles />
      </StyledFooter>
    )
  }
}
