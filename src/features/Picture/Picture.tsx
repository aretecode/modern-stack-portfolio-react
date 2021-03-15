import * as React from 'react'
import { useAmp } from 'next/amp'
import styled from 'styled-components'
import type { ImageObjectType } from '../../typings'
import ImageComponent from './Image'

export const StyledPicture = styled.picture`
  width: 100%;
`

export const PictureWithAmpSupport = (
  props: React.ComponentProps<typeof StyledPicture>
) => {
  const isAmp = useAmp()
  if (isAmp) {
    return <>{props.children}</>
  } else {
    return <StyledPicture {...props} />
  }
}

const toNextUrl = (srcUrl: string, srcWidth?: number | string) => {
  const srcUpdated = `/_next/image?url=${encodeURIComponent(srcUrl)}`
  if (srcWidth) {
    return `${srcUpdated}&w=${srcWidth}&q=99`
  }
  return srcUpdated
}

export default function ResponsiveImage({
  image,
  className,
  RenderImage = ImageComponent,
}: {
  image: ImageObjectType
  className?: string
  RenderImage?: React.FC<React.ComponentProps<typeof ImageComponent>>
}) {
  const isAmp = useAmp()

  return (
    <PictureWithAmpSupport className={className}>
      {!isAmp &&
        image.srcSizes.map(([size, srcSet, srcWidth]) => (
          <source
            key={size}
            media={size}
            srcSet={toNextUrl(srcSet, srcWidth)}
          />
        ))}
      <RenderImage
        key="int"
        src={image.url}
        width={image.width}
        height={image.height}
        alt={image.description}
        srcSizes={image.srcSizes}
      />
    </PictureWithAmpSupport>
  )
}
