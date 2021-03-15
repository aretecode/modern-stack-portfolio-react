import { createGlobalStyle } from 'styled-components'
import { StyledCard } from '../../features/Card'
import { darkColorStyles } from '../../AppStyles'
import { StyledLeaderBoard } from './styled'

/** @see https://amp.dev/documentation/examples/components/amp-fx-collection/ */
export default createGlobalStyle`
  header[role='banner'] {
    position: unset;
  }
  figure > figcaption {
    padding-top: 20%;
  }

  @media (prefers-color-scheme: dark) {
    ${darkColorStyles};
    :root {
      ${darkColorStyles};
    }
  }
  .parallax-image-window { overflow: hidden; }
  @media (min-width: 1024px) {
    amp-img { width: 110%; }
  }
  ${StyledLeaderBoard} { padding: 0; };
  ${StyledCard} > figure > figcaption { z-index: 2; padding-left: 1rem;margin-bottom: -20%; }
  ${StyledCard}:nth-of-type(1) figcaption { margin-bottom: -10%; }
  ${StyledCard}:nth-of-type(2) { margin-top: 20%; }
  ${StyledCard}:last-of-type { &&& { margin-bottom: 20%; } }
`
