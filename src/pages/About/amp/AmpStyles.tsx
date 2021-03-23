import { css, createGlobalStyle } from 'styled-components'
import {
  darkColorStyles,
  aboutMePageDarkStyles,
  aboutMePageLightStyles,
  aboutMePageDynamicColorStyles,
} from '../../../AppStyles'
import { StyledButtonWrap } from '../../../features/AnimateHeight/styled'
import { StyledAboutMeArticle } from '../styled'
import { StyledSkillsWrap } from '../Skills'

const pureAccordionStyles = css`
  amp-img {
    width: 100%;
    height: auto;
    min-width: 300px;
  }
  amp-accordion {
    width: 100%;
    > header > div {
      width: 100%;
      text-align: center;
    }
    > header > div > button > svg {
      transition: transform 0.24s ease-in-out;
    }
    > section[expanded=''] svg {
      transform: rotate(180deg);
    }
    > section[expanded=''] ${StyledSkillsWrap} {
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

export default createGlobalStyle`
  :root {
    ${aboutMePageLightStyles};
  }
  @media (prefers-color-scheme: dark) {
    :root {
      ${darkColorStyles};
      ${aboutMePageDarkStyles};
    }
    amp-accordion > section > header.amp-accordion-header {
      background-color: var(--theme-footer-background);
      border-width: 4px;
    }
  }
  @media (min-width: 1024px) {
    footer[role='contentinfo'] {
      position: fixed;
      bottom: 0;
      width: 100%;
      z-index: 1000000;
    }
  }
  header[role='banner'] {
    position: unset;
  }
  @media (max-width: 1023px) {
    ${StyledAboutMeArticle} > aside {
      width: 100%;
    }
  }
  ${pureAccordionStyles};
  amp-accordion ${StyledButtonWrap} { margin-top: unset; }
  amp-accordion, amp-accordion > section > aside { max-width: 100%; }

`
