/**
 * @note - currently styling most of the things the pieces
 *         if this was scaled for reuse
 *         we would style parts of the pieces in presets & larger pieces
 */
import * as React from 'react'
import styled, { css } from 'styled-components'
import { SocialProfiles } from '../../src/features/SocialProfiles'
import { StyledSeparator as Separator } from '../../src/features/Separator'
import { StyledLink as Link } from '../../src/features/Link'
import { StyledImage } from '../../src/features/Image'

export const StyledSocialProfiles = styled(SocialProfiles)``

export const StyledLink = styled(Link)`
  &&& {
    color: unset;
    text-decoration: initial;
    letter-spacing: initial;
  }
`

/**
 * @todo @@perf add keys and use a resize hook to only show dom on mobile
 * we could make `Separator` `hr` by default
 * @see https://material.io/design/components/cards.html#anatomy
 */
export const StyledCardDivider = styled(Separator).attrs({
  children: undefined,
  as: 'hr',
})`
  width: 90%;
  border: none;
  border-top: 1px solid var(--color-dark-background-light);
  border-bottom: 1px solid var(--color-dark-background-dark);
  opacity: 0.1;
  margin: 0 auto;
  margin-top: 1rem;
  padding: 0;
  height: 2px;
  order: 1;
  transition: margin-top 0.96s ease-in-out, margin-left 0.24s ease-in-out;

  @media (max-width: 1023px) {
    margin-bottom: 1rem;
  }

  @media (min-width: 1024px) {
    ${(props: { isExpanded?: boolean }) =>
      props.isExpanded === true
        ? css`
            transition: margin-top 0.01s ease-in-out;
            margin-top: 3.5rem;
            width: 45%;
            margin-left: 50%;
          `
        : css`
            visibility: hidden;
            margin: 0;
          `};
  }
`

export const StyledTextLineSeparator = styled(Separator).attrs({
  children: undefined,
  as: 'hr',
})`
  color: var(--color-text-secondary);
  border: none;
  border-top: 5px solid var(--color-text-secondary);
  margin: 0;
  padding: 0;
  height: 0.75rem;
  width: 8vw;
`

export const StyledName = styled.h3`
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

export const StyledLabel = styled.h4`
  color: var(--color-dark-background-main);
  margin: 0;
  margin-top: -0.5rem;
  font-size: 1.2rem;

  @media (max-width: 1024px) {
    flex-basis: 100%;
  }
`

/**
 * @todo material-ui standard animation timings
 * @see https://www.styled-components.com/docs/basics#attaching-additional-props
 */
const FilteredAboutMeImage = ({ isExpanded, ...remaining }) => (
  <StyledImage {...remaining} />
)
export const StyledAboutMeImg = styled(FilteredAboutMeImage)`
  display: flex;
  object-fit: cover;

  border-radius: 0.125rem;
  box-shadow: none;

  transition: margin-top 0.5s ease-in-out, max-width 0.24s ease-in-out,
    height 1s ease-in-out, object-position 0.8s ease-in-out,
    box-shadow 0.24s ease-in-out;

  @media (max-width: 500px) {
    object-position: left;
  }
  @media (max-width: 1023px) {
    width: 100%;
  }
  @media (min-width: 1024px) {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    height: 120%;
    object-position: left;
    margin-top: -3rem;
    max-width: 21rem;
    flex-basis: 30%;

    ${(props: { isExpanded?: boolean }) =>
      props.isExpanded === true &&
      css`
        box-shadow: none;
      `};
  }
`

export const StyledFigure = styled.figure`
  margin: 0;
  padding: 0;
  display: flex;
  width: calc(100% - 75px);

  @media (max-width: 1023px) {
    flex-wrap: wrap;
    width: 100%;
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

/**
 * @todo split this out into pieces @@HACK
 */
export const StyledAboutMeArticle = styled.article`
  background-color: #fff;
  margin: 9rem 1rem 9rem 1rem;
  border-radius: 0.125rem;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);

  display: flex;
  flex-wrap: wrap;
  width: 80%;

  @media (max-width: 1023px) {
    width: calc(100% - 2rem);
    height: unset;
    flex-wrap: wrap;
  }

  address {
    color: var(--color-text-unimportant);
  }
`
