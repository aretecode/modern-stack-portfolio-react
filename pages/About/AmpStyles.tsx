import * as React from 'react'
import { createGlobalStyle } from 'styled-components'
import { AmpContext } from '../../src/features/AmpContext'
import { StyledAboutMeArticle } from './styled'
import { StyledSkillsWrap } from './Skills'

export default function() {
  const { isAmp } = React.useContext(AmpContext)
  if (isAmp === false) {
    return null
  } else {
    const AmpStyles = createGlobalStyle`
      amp-img {
        width: 100%;
        height: auto;
      }

      ${StyledAboutMeArticle} {
        > aside {
          width: 100%;
        }
      }
      amp-accordion {
        width: 100%;

        @media (min-width: 1024px) {
          margin-top: 3rem;
          margin-bottom: -1rem;
        }
        @media (max-width: 1023px) {
          order: 4;
        }


        > header > div {
          width: 100%;
          text-align: center;
          > button > svg {
            transition: transform 0.24s ease-in-out;
          }
        }
        > section {
          ${StyledSkillsWrap} {
            max-width: 100%;
          }

          &[expanded=""] {
            svg {
              transform: rotate(180deg);
            }
            ${StyledSkillsWrap} {
              height: auto;
              overflow: visible;
            }
          }
        }
      }
    `

    return <AmpStyles />
  }
}
