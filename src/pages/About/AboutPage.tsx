/**
 * @see https://material.io/design/components/cards.html#actions
 * @file @todo move out the `⇔` @@hack
 * @todo on mobile, could expand to full screen
 *
 * could style `Phone` & `Email` on mobile as buttons
 */
import * as React from 'react'
import { PortfolioHead } from '../../features/PortfolioHead'
import { PortfolioContext } from '../../features/PortfolioContext'
import { PortfolioSchema } from '../../features/PortfolioSchema'
import {
  AnimateHeightContextProvider,
  AnimateHeightContext,
} from '../../features/AnimateHeight/AnimateHeightContext'
import {
  StyledSocialProfiles,
  StyledName,
  StyledSummary,
  StyledLabel,
  StyledAboutMeArticle,
  StyledAboutMeImg,
  StyledArrow,
  StyledLink,
  StyledContactNav,
  StyledFigCaption,
  StyledFigure,
  StyledTextLineSeparator,
  StyledCardDivider,
} from './styled'
import { Skills } from './Skills'

/**
 * @see https://reactjs.org/docs/hooks-reference.html#usecontext
 */
export function AboutMeImage(
  props: React.ComponentProps<typeof StyledAboutMeImg>
) {
  const value = React.useContext(AnimateHeightContext)
  return <StyledAboutMeImg {...props} isExpanded={value.isExpanded} />
}
export function CardDivider(props: {}) {
  const value = React.useContext(AnimateHeightContext)
  return <StyledCardDivider isExpanded={value.isExpanded} />
}

export function AboutPage() {
  const {
    name,
    label = '',
    picture,
    summary,
    telephone,
    email,
  } = React.useContext(PortfolioContext).basics

  const titleText = `About ${name}`
  return (
    <>
      <PortfolioHead titleText={titleText} description={summary} />
      <PortfolioSchema />
      <AnimateHeightContextProvider>
        <StyledAboutMeArticle>
          <StyledSocialProfiles />
          <StyledFigure>
            <AboutMeImage
              src={picture}
              height={'600'}
              width={'600'}
              alt="about me picture"
            />
            <StyledFigCaption>
              <StyledName>{name}</StyledName>
              <StyledLabel>
                {label.split('⇔').shift()}
                <StyledArrow>↔</StyledArrow>
                {label.split('⇔').pop()}
              </StyledLabel>
              <StyledTextLineSeparator />
              <StyledSummary>{summary}</StyledSummary>
              <StyledContactNav>
                <section>
                  <header>Phone</header>
                  <StyledLink to={`tel:${telephone}`}>+{telephone}</StyledLink>
                </section>
                <section>
                  <header>Email</header>
                  <StyledLink to={`mailto:${email}`}>{email}</StyledLink>
                </section>
              </StyledContactNav>
            </StyledFigCaption>
          </StyledFigure>
          <CardDivider />
          <Skills />
        </StyledAboutMeArticle>
      </AnimateHeightContextProvider>
    </>
  )
}

export default AboutPage
