import styled, { css } from 'styled-components'
import { MaterialIcon } from '../MaterialIcon'
import { StyledLink, StyledLinkProps } from '../Link'

export const StyledSocialProfileIcon = styled(MaterialIcon)`
  width: 2rem;
  height: 2rem;

  path:first-of-type {
    transition: fill 0.24s cubic-bezier(0.4, 0, 0.2, 1);
    fill: var(--theme-material-icon-fill);
  }
`

/**
 * @see https://material.io/design/motion/speed.html#easing
 * @todo when transitioning mobile to desktop, needs to morph
 * @note `order` is here because nothing is currently reused, would style in the page or larger component
 * @todo   transition: flex-direction 0.24s cubic-bezier(0, 0, 0.2, 1), width 0.24s cubic-bezier(0, 0, 0.2, 1);
 */
export const StyledSocialProfilesWrap = styled.aside`
  align-items: center;
  object-fit: contain;
  object-position: bottom;
  display: flex;
  max-width: 100%;
  background: transparent;

  @media (max-width: 1023px) {
    width: 75%;
    flex-direction: row;
    order: 2;
    height: unset;
    justify-content: unset;
    padding: 0 0 0.5rem 0;
  }
  @media (min-width: 1024px) {
    padding: 1rem;
    width: 75px;
    justify-content: space-around;
    flex-direction: column;
    flex-flow: column;
  }
`

/**
 * @todo HACK remove the twitter resize on mobile, make into overflow
 * @see https://github.com/aretecode/modern-stack-web-portfolio/issues/53
 *
 * @note 33% because parent is 75% and we have 3 items
 */
export const StyledProfileLink = styled(StyledLink)`
  @media (max-width: 1023px) {
    flex-basis: 33%;
    width: 33%;
    text-align: center;
    ${(props: StyledLinkProps) =>
      String(props.to).includes('twitter') &&
      css`
        display: none;
      `};
  }
`
