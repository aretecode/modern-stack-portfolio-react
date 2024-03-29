/**
 * @note - currently styling most of the things the pieces
 *         if this was scaled for reuse
 *         we would style parts of the pieces in presets & larger pieces
 */
import styled, { createGlobalStyle, css } from 'styled-components'
import { aboutMePageDynamicColorStyles } from '../../AppStyles'
import Header from '../../features/Header'
import Footer from '../../features/Footer'
import { StyledLink as Link } from '../../features/Link'
import AmpCompatImage from '../../features/Picture/Image'
import { StyledMain } from '../../features/Main'
import { webpBackgroundStyles } from '../../features/BackgroundStyles'

export const GlobalPageStyles = createGlobalStyle`
  ${aboutMePageDynamicColorStyles};
  #__next {
    ${webpBackgroundStyles};
  }
`

export const StyledAboutMeMain = styled(StyledMain)``
export const StyledHeader = styled(Header)``
export const StyledFooter = styled(Footer)`
  background-color: var(--theme-header-background);
`
export const StyledLink = styled(Link)`
  &&& {
    color: unset;
    text-decoration: initial;
    letter-spacing: initial;
    word-break: normal;
  }
`

/**
 * @todo @@perf add keys and use a resize hook to only show dom on mobile
 * we could make `Separator` `hr` by default
 * @see https://material.io/design/components/cards.html#anatomy
 * @example styled(Separator)
 */
export const StyledCardDivider = styled.hr.attrs({
  role: 'separator',
})`
  color: var(--color-text-body);
  display: inline-flex;
  width: 90%;
  border: none;
  border-top: 1px solid var(--theme-about-me-separator-top);
  border-bottom: 1px solid var(--theme-about-me-separator-bottom);
  opacity: 0.2;
  margin: 0 auto;
  margin-top: 1rem;
  padding: 0;
  height: 2px;
  order: 1;
  transition: margin-top 0.96s ease-in-out, margin-left 0.24s ease-in-out,
    opacity 0.24s ease-in-out, border-top 0.24s ease-in-out,
    border-bottom 0.24s ease-in-out, height 0.24s ease-in-out;

  @media (max-width: 1023px) {
    margin-bottom: 1rem;
  }

  @media (min-width: 1024px) {
    visibility: hidden;
    margin: 0;
    height: 0;

    .is-expanded & {
      transition: margin-top 0.01s ease-in-out;
      margin-top: 3.5rem;
      width: 45%;
      margin-left: 50%;
      height: 2px;
    }
  }
`

export const StyledTextLineSeparator = styled.hr.attrs({
  role: 'separator',
})`
  display: inline-flex;
  color: var(--theme-about-me-divider-top);
  border: none;
  border-top: 5px solid var(--theme-about-me-divider-top);
  margin: 0;
  padding: 0;
  height: 0.75rem;
  width: 8vw;
`

export const StyledName = styled.h1`
  font-size: 2rem;
  margin-bottom: 0;
  @media (min-width: 1024px) {
    margin-top: 3rem;
  }
  @media (max-width: 1024px) {
    flex-basis: 100%;
  }
`

export const StyledArrow = styled.i`
  font-style: unset;
  padding-right: 0.15rem;
  opacity: 0.3;
`

export const StyledSummary = styled.p`
  margin-top: 1rem;

  @media (min-width: 1024px) {
    flex-basis: 100%;
  }
  @media (max-width: 1024px) {
    flex-basis: 100%;
  }
`

export const StyledLabel = styled.h2`
  transition: color 0.24s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--theme-label-color);
  margin: 0;
  margin-top: -0.5rem;
  font-size: 1.2rem;

  @media (max-width: 1024px) {
    flex-basis: 100%;
  }
`

/**
 * @see https://material.io/design/motion/speed.html#easing for material easing on y axis
 * @note "object-position" is tightly coupled to the image src
 */
export const materialHeightTiming = 'cubic-bezier(0.4, 0.0, 0.2, 1)'
export const StyledAboutMeImg = styled(AmpCompatImage)`
  display: flex;
  object-fit: cover;
  user-select: none;

  .dark-mode & {
    filter: grayscale(98%);
  }

  border-radius: 0.125rem;
  box-shadow: none;
  object-position: top;

  transition: filter 0.12s cubic-bezier(0.4, 0, 0.2, 1) 0.24s,
    margin-top 0.5s ${materialHeightTiming},
    max-width 0.24s ${materialHeightTiming}, height 1s ${materialHeightTiming},
    object-position 0.8s ${materialHeightTiming},
    box-shadow 0.24s ${materialHeightTiming};

  @media (max-width: 800px) {
    max-height: 40vh;
  }
  @media (max-width: 1023px) {
    width: 100%;
  }
  @media (min-width: 1024px) {
    /* make it vertical */
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    height: 120%;
    margin-top: -3rem;
    max-width: 24rem;
    flex-basis: 30%;

    object-position: 30% 50%;

    .is-expanded & {
      box-shadow: none;
    }
  }
  @media (min-width: 1200px) {
    max-width: 28rem;
  }
  @media (min-width: 1400px) {
    max-width: 32rem;
    object-position: top;
  }
  @media (min-width: 2000px) {
    max-height: 75vh;
    max-width: unset;
    height: 150%;
    object-position: 0 80%;

    .is-expanded & {
      height: 120%;
      object-position: 0 60%;
    }
  }
`

export const StyledFigure = styled.figure`
  margin: 0;
  padding: 0;
  display: flex;
  width: calc(100% - 75px);

  > {
    min-width: 400px;
  }

  @media (max-width: 1023px) {
    flex-wrap: wrap;
    width: 100%;
  }

  @media (min-width: 1400px) {
    max-height: 60vh;
  }
  @media (min-width: 2000px) {
    max-height: 40vh;
  }
`

export const StyledFigCaption = styled.figcaption`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  word-break: break-word;

  @media (max-width: 1023px) {
    display: flex;
    flex-wrap: wrap;
  }
`

export const StyledContactNav = styled.nav`
  display: flex;
  padding: 2rem 0;
  transition: flex-direction 500ms ease-in-out;

  @media (max-width: 1023px) {
    padding: 0.5rem 0;
    width: 100%;
  }

  > section {
    flex-basis: 50%;

    > header {
      font-weight: bold;
    }
  }
`

export const StyledAboutMeArticle = styled.article`
  background-color: var(--theme-about-me-article-background);
  color: var(--theme-about-me-article-color);
  margin: 9rem 1rem 9rem 1rem;
  border-radius: 0.125rem;
  box-shadow: var(--theme-about-me-image-shadow);
  display: flex;
  flex-wrap: wrap;

  backdrop-filter: blur(10px);
  *,
  nav,
  > article,
  > ${StyledFigure}, > ${StyledFigure} > ${StyledFigCaption} {
    background-color: transparent;
  }

  @media (min-width: 1201px) {
    width: 90%;
  }
  @media (min-width: 1601px) {
    width: 85%;
  }
  @media (max-width: 1200px) {
    width: calc(100% - 2rem);
  }
  @media (max-width: 1023px) {
    width: calc(100% - 2rem);
    height: unset;
    flex-wrap: wrap;
    margin: 5.5rem 1rem 2rem 1rem;
  }
  @media (max-width: 480px) {
    margin: 8rem 1rem 2rem;
  }
  @media (min-width: 2000px) {
    max-width: 1600px;
  }
`
