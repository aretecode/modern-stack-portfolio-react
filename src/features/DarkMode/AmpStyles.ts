import { css } from 'styled-components'

/** @see https://codepen.io/tomayac/pen/bGGzqNb */
export const darkModeCheckboxStyles = css`
  .visually-hidden {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    white-space: nowrap;
  }
  #dark-mode:checked ~ label::before {
    content: '☀️ ';
  }
  #dark-mode:checked ~ * {
    color: ${props => (props.theme.isDark ? '#fff' : '#000')};
  }
  label[for='dark-mode']::before {
    content: '🌒 ';
  }
  #dark-mode,
  label[for='dark-mode'] {
    color: ${props => (props.theme.isDark ? '#fff' : '#000')};
    top: 1rem;
    right: 0.25rem;
  }
`
