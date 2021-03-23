import * as React from 'react'
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'
import { useAmp } from 'next/amp'
import PortfolioSchema from '../../features/PortfolioSchema'
import PortfolioHead from '../../features/PortfolioHead'
import { StyledMain } from '../../features/Main'
import Picture from '../..//features/Picture/Picture'
import Header from '../../features/Header'
import Footer from '../../features/Footer'
import { URL } from '../../utils/url'
import { StyledPicture } from '../../features/Picture/Picture'
import { StyledCard as BaseStyledCard } from '../../features/Card'
import type { ResumeEverythingType } from '../../typings'
import { StyledLeaderBoard, StyledCardImage } from './styled'
import { FigCaption } from './PortfolioPage'

const StyledAmpPicture = styled.div`
  height: 100vh;
  width: 100vw;
  max-height: 40vh;
  overflow-y: scroll;
  -webkit-box-reflect: above;
  background: var(--theme-card-figcaption-background);
  @media (max-width: 1024px) {
    max-height: 20vh;
    height: 50vh;
  }
`

const CustomPictureWithAmpSupport = (
  props: React.ComponentProps<typeof StyledPicture>
) => {
  const isAmp = useAmp()
  if (isAmp) {
    return <StyledAmpPicture>{props.children}</StyledAmpPicture>
  } else {
    return <StyledPicture {...props} />
  }
}

const StyledFooter = styled(Footer)``

const StyledHeader = styled(Header)`
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 4px rgb(0 0 0 / 50%);

  body:not(.dark-mode) & {
    background-color: #6200eef2;
  }
  body.dark-mode & {
    background-color: rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 480px) {
    height: 4rem;
  }
`

const centerH1 = css`
  top: 0;
  font-size: 4rem;
  font-weight: 500;
  backdrop-filter: blur(4px);
  z-index: 3;
  padding: 2rem;
  background-color: rgba(52, 73, 85, 0.01);
  text-align: center;
`

const StyledH1 = styled.h1`
  > span {
    position: sticky;
    z-index: 1;
    transform: translateZ(0);
  }

  ${centerH1};
  overflow: hidden;
  transform: translateZ(0);
  text-align: center;
  font-size: 4rem;
  font-weight: 300;
  color: var(--theme-card-header);
  text-shadow: 0 1px 0 rgb(255 255 255 / 55%), 0 4px 0 rgb(0 0 0 / 10%),
    0 5px 0 rgb(0 0 0 / 10%), 0 4px 0 rgb(0 0 0 / 10%);
  min-width: 100%;
  margin: 0;
  background-color: transparent;
`

const StyledLeaderBoardColoured = styled(StyledLeaderBoard)`
  position: relative;
  background-color: var(--theme-card-background);
  padding: 0;
  margin: 0;
  padding-top: 3rem;
  position: relative;
  background-color: transparent;

  picture {
    max-height: 70vh;
    overflow-y: scroll;
    -webkit-box-reflect: above;
    background: var(--theme-card-figcaption-background);
  }
  @media (max-width: 1024px) {
    padding-top: 2rem;
    picture {
      max-height: 35vh;
    }
    ${StyledH1} {
      font-size: 2rem;
      padding-bottom: 0.5rem;
    }
  }
  @media (max-width: 480px) {
    &&& {
      padding-top: 2rem;
    }
    ${StyledH1} {
      font-size: 1.5rem;
    }
  }
  ${StyledCardImage} {
    height: unset;
    min-width: 100%;
  }
`

/** @todo hiding header because the same content is shown in the h1. improve the accessibility and semantics of this approach. */
const StyledCard = styled(BaseStyledCard)`
  &&& {
    margin-bottom: 2rem;
    padding: 0;
  }

  figure {
    margin: 0;
    padding: 0;
    header {
      display: none;
    }
  }
  @media (min-width: 1024px) {
    figure {
      padding: 2rem 1.5rem 1.75rem 1.5rem;
    }
  }
  @media (min-width: 1200px) {
    figure {
      padding: 3rem 2rem 2.5rem 2rem;
    }
  }
  @media (min-width: 1600px) {
    figure {
      padding: 3rem 2rem 2.5rem 2rem;
    }
  }
`

/** @todo move to another file, make re-usable */
const changeQualitySearchParam = (src: string) => {
  const srcUrl = new URL(src)
  srcUrl.searchParams.set('q', '80')
  return srcUrl.href
}

export default React.memo(function PortfolioWorkExperienceItemPage({
  person,
  work,
  openSource,
  ...rest
}: ResumeEverythingType) {
  const {
    query: { pid = -42 },
  } = useRouter()
  const isAmp = useAmp()
  const pidIndex = work?.findIndex(({ id }) => id == pid)
  const index: number = Number(pidIndex)
  const workItem = work?.[index]

  /** @todo show 404 */
  if (workItem === undefined) {
    return <h1>Not found</h1>
  }

  return (
    <>
      <PortfolioHead
        titleText={`${person.name} at ${workItem.company} as a ${workItem.position}`}
        {...person}
        {...rest}
        image={workItem.image}
        description={workItem.summary}
        highlightsPicture={workItem.image}
      />
      <PortfolioSchema
        person={person}
        work={work}
        openSource={openSource}
        workIndex={index}
      />
      <StyledHeader name={person.name} />
      <StyledMain>
        <StyledLeaderBoardColoured>
          <StyledH1>
            <span>{workItem.company}</span>
          </StyledH1>
          <Picture
            RenderPicture={CustomPictureWithAmpSupport}
            image={{
              ...workItem.image,
              srcSizes: workItem.image.srcSizes.filter(([media]) => {
                if (
                  media.includes(' 800') ||
                  media.includes(' 600') ||
                  media.includes(' 480')
                ) {
                  return false
                }
                return true
              }),
            }}
            RenderImage={imgProps => {
              const src = changeQualitySearchParam(imgProps.src as string)
              return (
                <StyledCardImage
                  loading={index === 0 ? 'eager' : 'lazy'}
                  {...imgProps}
                  src={src}
                  // @todo use sizes param to check ratio
                  // srcSizes={workItem.image.srcSizes}
                />
              )
            }}
          />
        </StyledLeaderBoardColoured>
        <>
          <StyledCard>
            <figure>
              <FigCaption work={workItem} />
            </figure>
          </StyledCard>
        </>
      </StyledMain>
      <StyledFooter
        name={person.name}
        resumeWebsite={person.resumeWebsite}
        profiles={person.profiles}
        openSource={openSource}
      />
    </>
  )
})
