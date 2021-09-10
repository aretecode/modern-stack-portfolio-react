import * as React from 'react'
import { storiesOf } from '@storybook/react'
import styled, { css } from 'styled-components'
import ObservablePicture from '../src/pages/About/AboutMePicture'

const StyledPad = styled.div`
  margin-top: 200vh;
`
const Wrap = styled.div`
  transition: background-color 2s ease-in-out;
  height: 30rem;
  padding: 5rem;

  ${(props: { isIntersecting?: boolean }) =>
    props.isIntersecting === true &&
    css`
      background-color: purple;
    `}

  img {
    object-fit: cover;
    max-height: 100%;
    max-width: 100%;
    width: 100%;
    object-position: top;
  }
`

storiesOf('image', module).add('default', () => (
  <>
    <StyledPad />
    <Wrap>
      <ObservablePicture
        image={{
          title: 'about',
          srcSizes: [],
          url: 'https://jameswiens.dev/_next/image?url=https%3A%2F%2Fnoccumpr-cdn.sirv.com%2Fimages%2Fm-james-wiens-profile-picture-wedding.jpg',
          width: 4024,
          height: 3024,
        }}
      />
    </Wrap>
  </>
))
