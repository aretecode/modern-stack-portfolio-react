import * as React from 'react'
import type { ImageObjectType } from '../../typings'
import { AnimateHeightContext } from '../../features/AnimateHeight/AnimateHeightContext'
import Picture from '../../features/Picture/Picture'
import { StyledAboutMeImg } from './styled'

/**
 * @see https://reactjs.org/docs/hooks-reference.html#usecontext
 */
export function AboutMeImage(
  props: React.ComponentProps<typeof StyledAboutMeImg>
) {
  const value = React.useContext(AnimateHeightContext)
  return <StyledAboutMeImg {...props} isExpanded={value.isExpanded} />
}

export default React.memo(function AboutMePicture(props: {
  image: ImageObjectType
  className?: string
}) {
  return (
    <Picture
      {...props}
      RenderImage={imgProps => {
        return (
          <AboutMeImage
            loading={'eager'}
            srcSizes={props.image.srcSizes}
            {...imgProps}
          />
        )
      }}
    />
  )
})
