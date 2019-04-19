/**
 * @file @todo move out the `⇔` @@hack
 */
import * as React from 'react'
import {
  ResumeContext,
  ResumeContextType,
} from '../../src/features/ResumeContext'
import { SocialProfiles } from '../../src/features/SocialProfiles'
import { Address } from './Address'
import {
  StyledButtonWrap,
  StyledName,
  StyledSummary,
  StyledLabel,
  StyledAboutMeArticle,
  StyledAboutMeImg,
  StyledSeparator,
  StyledArrow,
  StyledButton,
  StyledLink,
  StyledContactNav,
  StyledFigCaption,
  StyledFigure,
} from './styled'
import { Skills } from './Skills'

export class AboutPage extends React.PureComponent {
  static contextType = ResumeContext
  readonly context: ResumeContextType

  render() {
    const {
      name,
      label = '',
      picture,
      summary,
      telephone,
      email,
    } = this.context.basics

    return (
      <>
        <StyledAboutMeArticle>
          <SocialProfiles />
          <StyledFigure>
            <StyledAboutMeImg
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
              <StyledSeparator />
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

              <StyledButtonWrap>
                <StyledButton>Portfolio</StyledButton>
              </StyledButtonWrap>

              <Skills />
            </StyledFigCaption>
          </StyledFigure>
        </StyledAboutMeArticle>
      </>
    )
  }
}
