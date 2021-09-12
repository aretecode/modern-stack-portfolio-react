/**
 * @see https://material.io/design/components/cards.html#actions
 * @file @todo move out the `⇔` @@hack
 * @idea on mobile, could expand to full screen
 * @idea could style `Phone` & `Email` on mobile as buttons
 */
import * as React from 'react'
import { useAmp } from 'next/amp'
import type { ResumeEverythingType } from '../../typings'
import PortfolioHead from '../../features/PortfolioHead'
import PortfolioSchema from '../../features/PortfolioSchema'
import {
  useAnimateContextState,
  AnimateHeightContext,
} from '../../features/AnimateHeight/AnimateHeightContext'
import SocialProfiles from '../../features/SocialProfiles'
import {
  GlobalPageStyles,
  StyledHeader,
  StyledFooter,
  StyledName,
  StyledSummary,
  StyledLabel,
  StyledAboutMeArticle,
  StyledArrow,
  StyledLink,
  StyledContactNav,
  StyledFigCaption,
  StyledFigure,
  StyledTextLineSeparator,
  StyledAboutMeMain,
  StyledCardDivider,
} from './styled'
import { Skills } from './Skills'
import AboutMePicture from './AboutMePicture'
import AmpAboutPage from './amp/AmpAboutPage'

export default React.memo(function AboutPage(props: ResumeEverythingType) {
  const isAmp = useAmp()
  if (isAmp) return <AmpAboutPage {...props} />

  const { person, work, openSource, ...rest } = props
  const {
    name,
    label = '',
    summary,
    telephone,
    email,
    profiles,
    resumeWebsite,
    skills,
    image,
  } = person
  const titleText = `About ${name}`
  const animateHeightState = useAnimateContextState()
  return (
    <>
      <GlobalPageStyles />
      <PortfolioHead
        titleText={titleText}
        description={summary}
        isProfilePage={true}
        {...person}
        {...rest}
      />
      <PortfolioSchema {...props} />
      <StyledHeader name={name} />
      <AnimateHeightContext.Provider value={animateHeightState}>
        <StyledAboutMeMain
          className={
            animateHeightState.isExpanded ? 'is-expanded' : 'not-expanded'
          }
        >
          <StyledAboutMeArticle>
            <SocialProfiles profiles={profiles} resumeWebsite={resumeWebsite} />
            <StyledFigure>
              <AboutMePicture image={image} />
              <StyledFigCaption>
                <StyledName>{name}</StyledName>
                <StyledLabel>
                  {label.split('⇔').shift()}
                  <StyledArrow>↔</StyledArrow>
                  {label.split('⇔').pop()}
                </StyledLabel>
                <StyledTextLineSeparator />
                {React.useMemo(
                  () =>
                    summary
                      .split('\n')
                      .filter(Boolean)
                      .map(paragraph => (
                        <StyledSummary key={paragraph.slice(0, 10)}>
                          {paragraph}
                        </StyledSummary>
                      )),
                  [summary]
                )}
                <StyledContactNav>
                  <section>
                    <header>Phone</header>
                    <StyledLink to={`tel:${telephone}`}>
                      +{telephone}
                    </StyledLink>
                  </section>
                  <section>
                    <header>Email</header>
                    <StyledLink to={`mailto:${email}`}>{email}</StyledLink>
                  </section>
                </StyledContactNav>
              </StyledFigCaption>
            </StyledFigure>
            <StyledCardDivider />
            <Skills skills={skills} />
          </StyledAboutMeArticle>
        </StyledAboutMeMain>
      </AnimateHeightContext.Provider>
      <StyledFooter name={name} openSource={openSource} />
    </>
  )
})
