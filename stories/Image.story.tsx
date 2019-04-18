import * as React from 'react'
import { storiesOf } from '@storybook/react'
import styled, { css } from 'styled-components'
import ObservablePicture from '../src/features/ObservablePicture'

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
      <ObservablePicture />
    </Wrap>
  </>
))
