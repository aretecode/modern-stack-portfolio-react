import * as React from 'react'
import { PortfolioHead } from '../../../features/PortfolioHead'
import { PortfolioContext } from '../../../features/PortfolioContext'
import { PortfolioSchema } from '../../../features/PortfolioSchema'
import { SocialProfiles } from '../../../features/SocialProfiles'
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
} from '../styled'
import { AboutMeImage, CardDivider } from '../AboutPage'
import AmpStyles from './AmpStyles'
import { Skills } from './AmpSkills'

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
      <AmpStyles />
      <PortfolioHead titleText={titleText} description={summary} />
      <PortfolioSchema />
      <StyledAboutMeArticle>
        <SocialProfiles />
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
    </>
  )
}

export default AboutPage
