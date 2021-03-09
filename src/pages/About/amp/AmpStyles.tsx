import { css, createGlobalStyle } from 'styled-components'
import {
  aboutMePageDarkStyles,
  aboutMePageDynamicColorStyles,
} from '../../../AppStyles'
import { StyledButtonWrap } from '../../../features/AnimateHeight/styled'
import { StyledAboutMeArticle } from '../styled'
import { StyledSkillsWrap } from '../Skills'

export default createGlobalStyle`
  :root {
    ${aboutMePageDynamicColorStyles};
  }
  @media (prefers-color-scheme: dark) {
    ${aboutMePageDarkStyles};
  }

  amp-img {
    width: 100%;
    height: auto;
  }

  @media (max-width: 1023px) {
    ${StyledAboutMeArticle} > aside {
      width: 100%;
    }
  }

  amp-accordion {
    width: 100%;

    ${StyledButtonWrap} {
      margin-top: unset;
    }

    > header > div {
      width: 100%;
      text-align: center;
    }
    > header > div > button > svg {
      transition: transform 0.24s ease-in-out;
    }
    > section > header.amp-accordion-header {
      ${props =>
        props.theme.isDark &&
        css`
          background-color: var(--color-dark-background-dark-surface);
          border-width: 4px;
        `};
    }

    > section ${StyledSkillsWrap} {
      max-width: 100%;
    }
    > section[expanded=""] svg {
      transform: rotate(180deg);
    }
    > section[expanded=""] ${StyledSkillsWrap} {
      height: auto;
      overflow: visible;
    }
  }

  @media (min-width: 1024px) {
    amp-accordion {
      margin-top: 3rem;
        margin-bottom: -1rem;
    }
  }
  @media (max-width: 1023px) {
    amp-accordion {
      order: 4;
    }
  }
`
