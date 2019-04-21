import styled from 'styled-components'
import { StyledLink } from '../Link'
import { SpecialIcon } from './SpecialIcon'

export const StyledFooter = styled.footer`
  background-color: var(--color-material-background-purple);
  padding: 2rem 1.25rem;

  p {
    color: var(--color-text-body);
  }
`

export const MadeWithHeart = styled(SpecialIcon).attrs({
  icon: 'heart',
})`
  color: #df0909;
  display: inline-flex;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  height: 12px;
`

export const CanadaEh = styled(SpecialIcon).attrs({
  icon: 'canada',
})`
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  transform: translateY(1px);
  display: inline-flex;
  width: 38px;
  height: 14px;
`

export const MadeWithText = styled.span``

/**
 * @todo move to dynamic
 */
export const OpenSourceLink = styled(StyledLink).attrs({
  to: 'https://github.com/aretecode/modern-stack-web-portfolio',
  children: 'github.com/aretecode',
})`
  padding-left: 0.3rem;
  text-decoration: underline;
`
