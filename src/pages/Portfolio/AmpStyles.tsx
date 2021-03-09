import { createGlobalStyle } from 'styled-components'
import { darkModeCheckboxStyles } from '../../features/DarkMode/AmpStyles'

/** @see https://amp.dev/documentation/examples/components/amp-fx-collection/ */
export default createGlobalStyle`
  ${darkModeCheckboxStyles};

  .parallax-image-window {
    overflow: hidden;
  }
`
