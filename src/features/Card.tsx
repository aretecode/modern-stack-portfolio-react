import styled, { css } from 'styled-components'

/**
 * @see https://material.io/design/components/cards.html#anatomy
 * @see https://material-components.github.io/material-components-web-catalog/#/component/elevation
 * @see https://material-components.github.io/material-components-web-catalog/#/component/card
 */
export const StyledCard = styled.article`
  &&& {
    min-width: calc(100vw - 2rem);

    transition: background-color 0.24s cubic-bezier(0.4, 0, 0.2, 1),
      color 0.24s cubic-bezier(0.4, 0, 0.2, 1);
    color: ${props =>
      props.theme.isDark
        ? 'var(--color-text-body)'
        : 'var(--color-dark-background-main)'};
    background-color: ${props =>
      props.theme.isDark
        ? 'var(--color-dark-background-light)'
        : 'var(--color-light-background-main)'};

    margin: 0;
    padding: 0;

    position: relative;
    min-width: 0;
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    background-clip: border-box;
    border-radius: 0.125rem;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);

    img {
      border-radius: 0.125rem 0;
    }
    /* padding here because of grid gap */
    margin-bottom: 0.5rem;
    @media (min-width: 1024px) {
      margin-bottom: 0;
      padding: 0 1rem 0 0;
      img {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0.125rem;
      }
    }
    @media (max-width: 1023px) {
      box-shadow: 0 1rem 0.75rem rgba(0, 0, 0, 0.19),
        0 0.5rem 0.5rem rgba(0, 0, 0, 0.23);
    }

    /* @todo @@styles split out */
    figcaption {
      @media (max-width: 1023px) {
        padding: 1.25rem;
      }

      ${props =>
        props.theme.isAmp
          ? css`
              padding-top: 20%;
            `
          : ''};
      background-color: ${props =>
        props.theme.isDark
          ? 'rgba(52,73,85,0.9)'
          : 'var(--color-light-background-main)'};
    }
    header {
      transition: inherit;
      color: ${props =>
        props.theme.isDark
          ? 'var(--color-text-secondary)'
          : 'var(--color-text-heading-main)'};

      font-size: 1.5rem;
      font-weight: 300;
    }
    div[role='separator'],
    time {
      font-size: 80%;
      font-weight: 400;
      color: var(--color-text-unimportant);
    }
    a {
      color: var(--color-text-unimportant);
      border-color: var(--color-text-unimportant);
      border-width: 1px;

      &:link,
      &:visited {
        color: var(--color-text-unimportant);
      }
      &::after {
        display: none;
      }
    }
  }
`
