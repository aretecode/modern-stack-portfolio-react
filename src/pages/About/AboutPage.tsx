/**
 * @see https://material.io/design/components/cards.html#actions
 * @file @todo move out the `⇔` @@hack
 * @idea on mobile, could expand to full screen
 * @idea could style `Phone` & `Email` on mobile as buttons
 */
import * as React from 'react'
import { useAmp } from 'next/amp'
import type { ResumeType } from '../../typings'
import { PortfolioHead } from '../../features/PortfolioHead'
import { PortfolioSchema } from '../../features/PortfolioSchema'
import { AnimateHeightContextProvider } from '../../features/AnimateHeight/AnimateHeightContext'
import { SocialProfiles } from '../../features/SocialProfiles'
import {
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
  CardDivider,
} from './styled'
import { Skills } from './Skills'
import AboutMePicture from './AboutMePicture'
import AmpAboutPage from './amp/AmpAboutPage'

export default React.memo(function AboutPage({
  person,
  work,
  openSource,
  ...rest
}: ResumeType) {
  const isAmp = useAmp()

  if (isAmp) {
    return <AmpAboutPage person={person} work={work} openSource={openSource} />
  }

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
  return (
    <>
      <PortfolioHead
        titleText={titleText}
        description={summary}
        isProfilePage={true}
        {...person}
        {...rest}
      />
      <PortfolioSchema person={person} work={work} openSource={openSource} />
      <StyledHeader name={name} />
      <AnimateHeightContextProvider>
        <StyledAboutMeMain>
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
                        <StyledSummary key={paragraph.slice(0, 3)}>
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
            <CardDivider />
            <Skills skills={skills} />
          </StyledAboutMeArticle>
        </StyledAboutMeMain>
      </AnimateHeightContextProvider>
      <StyledFooter name={name} openSource={openSource} />
    </>
  )
})
