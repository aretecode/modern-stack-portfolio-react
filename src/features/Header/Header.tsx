import * as React from 'react'
import { Navigation } from '../Navigation'
import { DarkModeToggle } from '../DarkMode/DarkModeToggle'
import { StyledHeader } from './styled'
import { LogoLink } from './Logo'

function fromContextNameToSimpleText(name: string) {
  return name.replace(' ', '').toLowerCase()
}

export default React.memo(function Header({
  name,
  ...rest
}: {
  className?: string
  name: string
}) {
  const nameText = fromContextNameToSimpleText(name)

  return (
    <StyledHeader {...rest}>
      <>
        <LogoLink name={nameText} key="logo" />
        <Navigation key="nav" />
        <DarkModeToggle key="darkmode" />
      </>
    </StyledHeader>
  )
})
