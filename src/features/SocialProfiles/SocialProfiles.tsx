import * as React from 'react'
import styled from 'styled-components'
import { ProfileType } from '../../typings'
import { MaterialIcon } from '../MaterialIcon'
import { ResumeContext, ResumeContextType } from '../ResumeContext'
import { StyledLink } from '../Link'

/**
 * @todo material-ui timings
 * @todo when transitioning mobile to desktop, needs to morph
 */
export const StyledSocialProfilesWrap = styled.aside`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  flex-direction: column;
  transition: flex-direction 0.24s ease-in-out, width 0.24s ease-in-out;
  height: inherit;

  @media (max-width: 1023px) {
    width: 100%;
    flex-direction: row;
    order: 1;
    border-top: 4px solid;
    margin-top: 1rem;
  }
`

export const StyledSocialProfileIcon = styled(MaterialIcon)`
  width: 2rem;
  height: 2rem;
`

export function renderProfileItem(profile: ProfileType, index?: number) {
  return (
    <StyledLink
      rel="me"
      to={profile.url}
      title={profile.username}
      key={profile.url}
    >
      <StyledSocialProfileIcon icon={profile.network} />
    </StyledLink>
  )
}

/**
 * @poc
 *    <img src="https://user-images.githubusercontent.com/4022631/55691849-01c82e80-59c0-11e9-8c5b-69f64a055b1f.png" />
 */
export default class SocialProfiles extends React.PureComponent {
  static contextType = ResumeContext
  readonly context: ResumeContextType

  render() {
    const { profiles, resumeWebsite } = this.context.basics

    return (
      <StyledSocialProfilesWrap>
        {Array.isArray(profiles) && profiles.map(renderProfileItem)}
        {resumeWebsite !== '' &&
          renderProfileItem({
            url: resumeWebsite,
            username: 'download resume',
            network: 'pdf',
          })}
      </StyledSocialProfilesWrap>
    )
  }
}
