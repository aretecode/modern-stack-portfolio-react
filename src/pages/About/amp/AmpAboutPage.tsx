import * as React from 'react'
import type { ResumeType } from '../../../typings'
import { PortfolioHead } from '../../../features/PortfolioHead'
import { PortfolioSchema } from '../../../features/PortfolioSchema'
import { SocialProfiles } from '../../../features/SocialProfiles'
import Footer from '../../../features/Footer'
import Header from '../../../features/Header'
import {
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
  CardDivider,
} from '../styled'
import { AboutMeImage } from '../AboutMePicture'
import AmpStyles from './AmpStyles'
import { Skills } from './AmpSkills'

export default function AboutPage({ person, work, openSource }: ResumeType) {
  const {
    name,
    label = '',
    summary,
    telephone,
    email,
    image,
    profiles,
    resumeWebsite,
    skills,
  } = person

  const titleText = `About ${name}`
  return (
    <>
      <Header name={name} />
      <AmpStyles />
      <PortfolioHead titleText={titleText} description={summary} {...person} />
      <PortfolioSchema person={person} work={work} openSource={openSource} />
      <StyledAboutMeArticle>
        <SocialProfiles profiles={profiles} resumeWebsite={resumeWebsite} />
        <StyledFigure>
          <AboutMeImage image={image} />
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
        <Skills skills={skills} />
      </StyledAboutMeArticle>
      <Footer name={name} openSource={openSource} />
    </>
  )
}
