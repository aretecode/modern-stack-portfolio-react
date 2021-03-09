import { createGlobalStyle, css } from 'styled-components'

/**
 * @todo not above the fold...
 * @see https://codepen.io/addyosmani/pen/jlvoC
 * @see https://material-ui.com/style/color/
 * @see https://material.io/design/color/the-color-system.html#color-usage-palettes
 * @see https://css-tricks.com/dont-just-copy-the-font-face-out-of-google-fonts-urls/
 * @see https://fonts.google.com/specimen/Source+Sans+Pro?selection.family=Source+Sans+Pro:300,400,600
 * @see https://developers.google.com/web/updates/2016/02/font-display
 * @see https://fonts.google.com/specimen/Roboto
 * @see https://material.io/design/color/color-usage.html#
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme (dark-mode)
 *
 * --color-text-unimportant-bad-contrast: #6c757d;
 */

export const aboutMePageDarkStyles = css`
  --theme-about-me-divider-top: #4a6572;
  --theme-about-me-divider-bottom: #000;
  --theme-skills-background: var(--color-dark-background-dark-surface);
  --theme-skills-color: #fff;
  --theme-skills-item-background: #000;
  --theme-skills-item-color: #fff;
  --theme-label-color: #bb86fc;
  --theme-about-me-article-background: #000;
  --theme-header-background: rgba(0, 0, 0, 0.35);
  --theme-about-me-image-shadow: '0 1rem 0.75rem rgb(0 0 0 / 19%), 0 0.5rem 0.5rem rgb(0 0 0 / 23%)';
  --theme-about-me-article-color: rgba(255, 255, 255, 1);
`
export const aboutMePageLightStyles = css`
  --theme-about-me-divider-top: #4a6572;
  --theme-about-me-divider-bottom: #000;
  --theme-skills-background: #fff;
  --theme-skills-color: '#1b1b1b';
  --theme-skills-item-background: #fff;
  --theme-skills-item-color: '#1b1b1b';
  --theme-label-color: #232f34;
  --theme-about-me-article-background: #fff;
  --theme-about-me-article-color: #000;
  --theme-about-me-image-shadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)';
`
export const aboutMePageDynamicColorStyles = css`
  ${aboutMePageLightStyles};
  @media (prefers-color-scheme: dark) {
    ${aboutMePageDarkStyles};
  }
  @media not (prefers-color-scheme: dark) {
    ${props => props.theme.isDark && aboutMePageDarkStyles};
  }
`

const darkColorStyles = css`
  --color-link: #fff;
  --color-link-hover: #aaa;
  --color-text-body: #fff;
  --color-text-unimportant: #bbb;

  --color-text-body: #fff;
  --theme-card-color: #fff;
  --theme-material-icon-fill: #fff;
  --color-text-unimportant: #bbb;

  --theme-card-figcaption-background: rgba(52, 73, 85, 0.9);
  --theme-card-header: var(--color-text-secondary);
  --theme-card-background: #344955;

  --theme-selection-background: #bb86fc;
  --theme-footer-background: var(--color-dark-background-dark-surface);
  --theme-page-background: #232f34;
`

const lightColorStyle = css`
  --color-link: #fff;
  --color-link-hover: #aaa;
  --color-text-body: #fff;
  --color-text-unimportant: #bbb;

  --theme-card-figcaption-background: #f5f5f5;
  --theme-card-background: #f5f5f5;

  --theme-card-header: #000000;
  --theme-card-color: #232f34;

  --theme-material-icon-fill: #000;
  --theme-header-background: var(--color-material-background-purple);
  --theme-selection-background: rgba(0, 0, 0, 0.5);
  --color-text-unimportant: #3b3b3b;
  --theme-footer-background: var(--color-material-background-purple);
  --theme-page-background: #ddd;
`

const appStylesUglified = css`
  :root {
    --color-material-background-purple: #6200ee;
    --color-text-secondary: #03dac6;
    --color-orange: #ff5722;
    --color-dark-background-dark-surface: #121212;
    ${lightColorStyle};
  }
  @media (prefers-color-scheme: dark) {
    ${darkColorStyles};
  }
  @media not (prefers-color-scheme: dark) {
    ${props => props.theme.isDark && darkColorStyles};
  }

  @font-face {
    font-family: 'Source Sans Pro';
    font-display: optional;
    font-style: normal;
    font-weight: 300;
    src: local('Source Sans Pro Light'), local('SourceSansPro-Light'),
      url(https://fonts.gstatic.com/s/sourcesanspro/v12/6xKydSBYKcSV-LCoeQqfX1RYOo3ik4zwlxdu3cOWxw.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Source Sans Pro';
    font-display: optional;
    font-style: normal;
    font-weight: 400;
    src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'),
      url(https://fonts.gstatic.com/s/sourcesanspro/v12/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7lujVj9w.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Source Sans Pro';
    font-display: optional;
    font-style: normal;
    font-weight: 600;
    src: local('Source Sans Pro SemiBold'), local('SourceSansPro-SemiBold'),
      url(https://fonts.gstatic.com/s/sourcesanspro/v12/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rwlxdu3cOWxw.woff2)
        format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }

  html {
    box-sizing: border-box;
    background-color: var(--color-material-background-purple);
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  html,
  body {
    margin: 0;
    min-height: 100vh;
    overflow-x: hidden;
  }
  body {
    padding: 0;
    font-family: 'Source Sans pro', 'Roboto', 'chaparral-pro', 'Open Sans',
      'proxima-nova', 'HelveticaNeue', 'Helvetica Neue', 'Helvetica', 'Arial',
      sans-serif, serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  }
  #__next {
    min-height: inherit;
    background-color: var(--theme-page-background);
    display: flex;
    flex-direction: column;
  }
`

export const AppStyles = createGlobalStyle`
  ${appStylesUglified};
`

const reduceMotion = css`
  @media (prefers-reduced-motion: reduce) {
    *,
    ::before,
    ::after {
      & {
        animation-delay: -1ms;
        animation-duration: 1ms;
        animation-iteration-count: 1;
        background-attachment: initial;
        scroll-behavior: auto;
        transition-duration: 0s;
        transition-delay: 0s;
      }
    }
  }
`

/**
 * @idea could also style outlines here
 */
export const BelowTheFoldStyles = createGlobalStyle`
  ::selection {
    background: var(--theme-selection-background);
    color: #fff;
    text-shadow: none;
  }
  ${reduceMotion};
`
