import styled, { css } from 'styled-components'

const lightImg =
  'https://noccumpr.sirv.com/images/meow-bg-color--blur.jpg?w=2000&q=75&blur=50&lightness=30&format=webp'
const darkImg =
  'https://noccumpr.sirv.com/images/meow-bg-color--blur.jpg?w=2000&q=75&blur=50&lightness=30&format=webp'
const modernBrowserTestImg =
  'https://noccumpr.sirv.com/images/meow-bg-color--blur.jpg?w=1&h=1&q=1'

export const webpBackgroundStyles = css`
  --bg: url('${darkImg}');
  ${props =>
    props.theme.isDark
      ? css`
          --bg: url('${darkImg}');
        `
      : css`
          --bg: url('${lightImg}');
        `}

  /** @see https://dev.to/janhohner/webp-support-detection-with-supports-and-media-1fm */
  @media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
    @supports (
      background-image: -webkit-image-set(url('${modernBrowserTestImg}') 1x)
    ) {
      background-image: -webkit-image-set(var(--bg) 1x);
      background-image: var(--bg);
      background-size: cover;
    }
  }
`
