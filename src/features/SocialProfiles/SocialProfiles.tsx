import * as React from 'react'
import { ProfileType } from '../../typings'
import { PortfolioContext } from '../PortfolioContext'
import {
  StyledProfileLink,
  StyledSocialProfileIcon,
  StyledSocialProfilesWrap,
} from './styled'

/**
 * I used a resize observer hook here
 * but it updated far too often
 * https://codesandbox.io/s/9yrwl14rp4
 *
 * @todo find or make a hook & store for resizing
 */
function ProfileItem(props: ProfileType) {
  const { url, username, network } = props
  return (
    <StyledProfileLink rel="me" to={url} title={username}>
      <StyledSocialProfileIcon icon={network} />
    </StyledProfileLink>
  )
}

export function renderProfileItem(profile: ProfileType, index?: number) {
  return <ProfileItem {...profile} key={profile.url} />
}

/**
 * @poc
 *    <img src="https://user-images.githubusercontent.com/4022631/55691849-01c82e80-59c0-11e9-8c5b-69f64a055b1f.png" />
 */
export default function SocialProfiles(
  props: React.ComponentProps<typeof StyledSocialProfilesWrap>
) {
  const { profiles, resumeWebsite } = React.useContext(PortfolioContext).basics

  return (
    <StyledSocialProfilesWrap {...props}>
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
