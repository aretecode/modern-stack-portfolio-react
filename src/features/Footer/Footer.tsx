import * as React from 'react'
import type { OpenSourceType, ProfileType } from '../../typings'
import {
  StyledFooter,
  MadeWithText,
  MadeWithHeart,
  CanadaEh,
  OpenSourceLink,
  StyledSocialProfiles,
} from './styled'

export default React.memo(function Footer({
  name,
  openSource,
  profiles,
  resumeWebsite,
  ...props
}: {
  profiles?: ProfileType[]
  resumeWebsite?: string
  openSource: OpenSourceType
  className?: string
  name?: string
}) {
  return (
    <StyledFooter {...props} role="contentinfo">
      <p>
        <span>©{new Date().getFullYear()}</span> <span>{name}</span>
      </p>
      <p>
        <MadeWithText>Made with</MadeWithText>
        <MadeWithHeart />
        <MadeWithText>in</MadeWithText>
        <CanadaEh />
      </p>
      <p>
        <MadeWithText>Open Sourced at</MadeWithText>
        <OpenSourceLink href={openSource.url}>
          github.com/aretecode
        </OpenSourceLink>
      </p>
      {resumeWebsite && profiles && (
        <StyledSocialProfiles
          profiles={profiles}
          resumeWebsite={resumeWebsite}
          key="profiles"
        />
      )}
    </StyledFooter>
  )
})
