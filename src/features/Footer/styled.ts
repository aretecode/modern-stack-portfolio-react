import styled from 'styled-components'
import { SocialProfiles } from '../SocialProfiles'
import { StyledLink } from '../Link'
import HeartIcon from './icons/HeartIcon'
import CanadaIcon from './icons/CanadaIcon'

export const StyledFooter = styled.footer`
  transition: background-color 0.24s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: var(--theme-footer-background);
  padding: 2rem 1.25rem;

  p {
    color: var(--color-text-body);
  }
`

export const MadeWithHeart = styled(HeartIcon)`
  color: #df0909;
  display: inline-flex;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  height: 12px;
`

export const CanadaEh = styled(CanadaIcon)`
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  transform: translateY(1px);
  display: inline-flex;
  width: 38px;
  height: 14px;
`

export const MadeWithText = styled.span``

export const OpenSourceLink = styled(StyledLink)`
  padding-left: 0.3rem;
  text-decoration: underline;
`

/**
 * @todo cleanup these styles & move @@codesmell
 * ^ especially remove elements from the dom, rather than styles to hide
 *
 * @todo this also has weird effect of these styles not being applied in correct order
 *       may be styled-components bug (thus using `&&`)
 */
export const StyledSocialProfiles = styled(SocialProfiles)`
  && {
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    padding: 0;
    width: 25vw;
    height: unset;
    > a {
      width: unset;
      flex-basis: unset;
      display: initial;
      padding: 1rem 1rem 1rem 0;
      &:last-child {
        display: none;
      }
      > svg {
        path:first-of-type {
          fill: #fff;
        }
      }
    }
  }
`
