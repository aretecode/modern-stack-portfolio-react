import * as React from 'react'
import { useAmp } from 'next/amp'
import type { ImageObjectType } from '../../typings'
import Picture from '../../features/Picture/Picture'
import { StyledAboutMeImg } from './styled'

export default React.memo(function AboutMePicture(props: {
  image: ImageObjectType
  className?: string
}) {
  const isAmp = useAmp()
  return (
    <Picture
      {...props}
      RenderImage={imgProps => {
        return (
          <StyledAboutMeImg
            loading={'eager'}
            srcSizes={isAmp ? props.image.srcSizes : []}
            {...imgProps}
            {...(isAmp ? { width: 1, height: 1.3 } : {})}
          />
        )
      }}
    />
  )
})
