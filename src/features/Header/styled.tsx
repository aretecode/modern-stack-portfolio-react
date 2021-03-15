import styled, { css } from 'styled-components'
import { StyledLink } from '../Link'

// @todo
// transition: background-color 0.24s cubic-bezier(0.4, 0, 0.2, 1);
export const StyledHeader = styled.header.attrs({
  role: 'banner',
})`
  background-color: var(--theme-header-background);
  top: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;

  width: 100%;
  height: 4rem;
  padding-left: 1.5rem;
  padding-right: 0.5rem;

  @media (max-width: 480px) {
    height: 7rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`

export const StyledLogoLink = styled(StyledLink)`
  display: flex;
  width: 100px;

  svg {
    padding: 1rem 0;
    /* align the baselines including j */
    margin-bottom: -6px;
    > path {
      fill: #fff;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    flex-basis: 100%;
    visibility: hidden;
    display: none;
    width: 0;
    height: 0;
  }
`
