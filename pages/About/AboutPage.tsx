/**
 * @see https://material.io/design/components/cards.html#actions
 * @file @todo move out the `⇔` @@hack
 * @todo on mobile, could expand to full screen
 */
import * as React from 'react'
import { PortfolioHead } from '../../src/features/PortfolioHead'
import { PortfolioContext } from '../../src/features/PortfolioContext'
import { PortfolioSchema } from '../../src/features/PortfolioSchema'
import { Address } from './Address'
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
import {
  AnimateHeightContextProvider,
  AnimateHeightContext,
} from '../../src/features/AnimateHeight'

/**
 * @see https://reactjs.org/docs/hooks-reference.html#usecontext
 */
function AboutMeImage(props: React.ComponentProps<typeof StyledAboutMeImg>) {
  const value = React.useContext(AnimateHeightContext)
  return <StyledAboutMeImg {...props} isExpanded={value.isExpanded} />
}
function CardDivider(props: {}) {
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
