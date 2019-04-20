/**
 * @todo update to add remaining stories
 * - SocialProfiles
 * - AMP (_knob - toggle_)
 * - ObservablePicture & Image
 * - Card
 * - MaterialIcon (_knob - icon name_)
 * - Link (_knob - url & text_)
 * - Separator
 * - VectorFilter
 * - GoogleDocument (_knob - url_)
 * - show rendered head as inline text
 */
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

storiesOf('features/Navigation', module).add('default', () => <Navigation />)
