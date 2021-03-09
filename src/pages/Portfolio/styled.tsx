import styled, { css } from 'styled-components'
import AmpCompatImage from '../../features/Picture/Image'
import { StyledLink as BaseStyledLink } from '../../features/Link'

export const StyledGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-gap: 0.5rem;
  grid-auto-rows: auto;

  @media (max-width: 420px) {
    padding: 0;
  }
`

/**
 * @idea could use https://amp.dev/documentation/examples/components/amp-timeago/
 */
export const StyledTime = styled.time`
  display: inline-flex;
`

/**
 * @see https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/
 * @see https://addyosmani.com/blog/lazy-loading/
 */
export const StyledCardImage = styled(AmpCompatImage)`
  ${props =>
    props.theme.isDark &&
    css`
      filter: url(#green-tint);
    `};
  object-fit: cover;
  max-width: 100%;
  > img {
    max-width: 100%;
  }
`

export const StyledCardFigure = styled.figure`
  margin: 0;
  padding: 0;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: calc(50vw - 2rem) calc(50vw - 2rem);
    grid-gap: 1rem;

    picture,
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    figcaption {
      padding: 1.25rem 0;
    }
  }

  @media (max-width: 1023px) {
    img {
      max-height: 65vh;
    }
  }
  @media (max-width: 800px) {
    img {
      max-height: 15vh;
    }
  }
  @media (max-width: 480px) {
    img {
      width: 100%;
      height: auto;
    }
  }
`

export const StyledLeaderBoard = styled.header`
  transition: background-color 0.24s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: var(--color-orange);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0 0 0;

  > h1 {
    color: #fff;
    font-size: 3em;
    font-weight: 300;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.55), 0 2px 0 rgba(0, 0, 0, 0.1),
      0 3px 0 rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    padding-top: 8rem;
  }
`

export const StyledLink = styled(BaseStyledLink)`
  padding: 0.5rem 0;
`

export const StyledExperienceSection = styled.section`
  display: flex;
`
