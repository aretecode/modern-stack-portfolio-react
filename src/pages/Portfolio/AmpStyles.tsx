import { createGlobalStyle } from 'styled-components'

/** @see https://amp.dev/documentation/examples/components/amp-fx-collection/ */
export default createGlobalStyle`
  .parallax-image-window { overflow: hidden; }
  @media (min-width: 1024px) {
    amp-img { width: 110%; }
  }
  figcaption { z-index: 2; padding-left: 1rem; }
`
