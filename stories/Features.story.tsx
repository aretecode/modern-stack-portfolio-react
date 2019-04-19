import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { StyledLink } from '../src/features/Link'
import { StyledSeparator } from '../src/features/Separator'
import { Footer } from '../src/features/Footer'
import { Header } from '../src/features/Header'
import { Navigation } from '../src/features/Navigation'

storiesOf('features/link', module).add('default', () => (
  <StyledLink to="/eh">eh</StyledLink>
))

storiesOf('features/Separator', module).add('default', () => (
  <StyledSeparator />
))

storiesOf('features/Footer', module).add('default', () => <Footer />)

storiesOf('features/Header', module).add('default', () => <Header />)
