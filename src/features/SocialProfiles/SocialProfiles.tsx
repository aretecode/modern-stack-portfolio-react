import * as React from 'react'
import type { ProfileType } from '../../typings'
import {
  StyledProfileLink,
  StyledSocialProfileIcon,
  StyledSocialProfilesWrap,
} from './styled'

/**
 * @note I used a resize observer hook here - but using one caused too many updates
 * @see https://codesandbox.io/s/9yrwl14rp4
 * @todo find or make a hook & store for resizing
 */
function ProfileItem({ url, username, network }: ProfileType) {
  return (
    <StyledProfileLink rel="me" to={url} title={username}>
      <StyledSocialProfileIcon icon={network} />
    </StyledProfileLink>
  )
}

export function renderProfileItem(profile: ProfileType, index?: number) {
  return <ProfileItem {...profile} key={profile.url} />
}

export type SocialProfileProps = React.ComponentProps<
  typeof StyledSocialProfilesWrap
> & {
  profiles: ProfileType[]
  resumeWebsite: string
}

/**
 * @poc
 *    <img src="https://user-images.githubusercontent.com/4022631/55691849-01c82e80-59c0-11e9-8c5b-69f64a055b1f.png" />
 */
export default React.memo(function SocialProfiles({
  profiles,
  resumeWebsite,
  ...props
}: SocialProfileProps) {
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
})
