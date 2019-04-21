import * as React from 'react'
import styled, { css } from 'styled-components'
import { ProfileType } from '../../typings'
import { MaterialIcon } from '../MaterialIcon'
import { PortfolioContext, PortfolioContextType } from '../PortfolioContext'
import { StyledLink } from '../Link'

/**
 * @todo material-ui timings
 * @todo when transitioning mobile to desktop, needs to morph
 *
 * @note `order` is here because nothing is currently reused, would style in the page or larger component
 */
export const StyledSocialProfilesWrap = styled.aside`
  padding: 1rem;
  width: 75px;
  display: inline-flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;

  object-fit: contain;
  object-position: bottom;
  transition: flex-direction 0.24s ease-in-out, width 0.24s ease-in-out;

  @media (max-width: 1023px) {
    width: 75%;
    flex-direction: row;
    order: 2;
    height: unset;
    justify-content: unset;
    padding: 0 0 0.5rem 0;
  }
`

/**
 * @todo HACK remove the twitter resize on mobile, make into overflow
 * @see https://github.com/aretecode/modern-stack-web-portfolio/issues/53
 *
 * @note 33% because parent is 75% and we have 3 items
 */
export const StyledProfileLink = styled(StyledLink)`
  @media (max-width: 1023px) {
    flex-basis: 33%;
    width: 33%;
    text-align: center;
    ${(props: React.ComponentProps<typeof StyledLink>) =>
      String(props.to).includes('twitter') &&
      css`
        display: none;
      `};
  }
`

export const StyledSocialProfileIcon = styled(MaterialIcon)`
  width: 2rem;
  height: 2rem;
`

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
export default class SocialProfiles extends React.PureComponent {
  static contextType = PortfolioContext
  readonly context: PortfolioContextType

  render() {
    const { profiles, resumeWebsite } = this.context.basics

    return (
      <StyledSocialProfilesWrap {...this.props}>
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
