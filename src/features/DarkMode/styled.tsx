import * as React from 'react'
import styled from 'styled-components'
import { StyledAnimatedBrightnessIcon } from '../MaterialIcon/AnimatedBrightnessIcon'
import { AppContext } from '../AppContext'

const StyledBrightnessButton = styled.button`
  color: unset;
  background: none;
  border: none;
  padding: 1rem;
`

export function BrightnessButton() {
  const [doesPreferDarkMode, setDarkMode] = React.useContext(
    AppContext
  ).darkMode

  return (
    <StyledBrightnessButton
      key="darkmode"
      aria-pressed={doesPreferDarkMode ? 'true' : 'false'}
      onClick={() => {
        setDarkMode(!doesPreferDarkMode)
      }}
    >
      <StyledAnimatedBrightnessIcon />
    </StyledBrightnessButton>
  )
}
