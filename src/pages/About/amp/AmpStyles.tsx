import { createGlobalStyle } from 'styled-components'
import { StyledButtonWrap } from '../../../features/AnimateHeight/styled'
import { StyledAboutMeArticle } from '../styled'
import { StyledSkillsWrap } from '../Skills'

export default createGlobalStyle`
  amp-img {
    width: 100%;
    height: auto;
  }

  ${StyledAboutMeArticle} {
    > aside {
      @media (max-width: 1023px) {
        width: 100%;
      }
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
    ${StyledButtonWrap} {
      margin-top: unset;
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
