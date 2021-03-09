import * as React from 'react'
import { StyledLink } from '../Link'
import { StyledNav, StyledNavList } from './styled'

export default React.memo(function HeaderNavigation(props: {
  className?: string
}) {
  return (
    <StyledNav {...props}>
      <StyledNavList>
        <li>
          <StyledLink to="/Portfolio" rel="me">
            work
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/" rel="me">
            about
          </StyledLink>
        </li>
      </StyledNavList>
    </StyledNav>
  )
})
