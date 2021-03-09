import * as React from 'react'
import { useAmp } from 'next/amp'
import { PortfolioSchema } from '../../features/PortfolioSchema'
import { PortfolioHead } from '../../features/PortfolioHead'
import { StyledCard } from '../../features/Card'
import { StyledMain } from '../../features/Main'
import Picture from '../..//features/Picture/Picture'
import Footer from '../../features/Footer'
import type { WorkType, ResumeType } from '../../typings'
import {
  StyledLink,
  StyledGrid,
  StyledCardImage,
  StyledCardFigure,
  StyledLeaderBoard,
  StyledExperienceSection,
  StyledHeader,
} from './styled'
import TimeRange from './TimeRange'
import AmpStyles from './AmpStyles'

export function renderWork(work: WorkType, index: number) {
  const isAmp = useAmp()
  const fx = React.useMemo(
    () =>
      ({
        card: isAmp
          ? { 'amp-fx': 'parallax', 'data-parallax-factor': '1.15' }
          : {},
        caption: isAmp
          ? { 'amp-fx': 'parallax', 'data-parallax-factor': '1.19' }
          : {},
      } as const),
    [isAmp]
  )

  return (
    <StyledCard key={work.company + work.startDate + work.endDate}>
      <StyledCardFigure>
        <Picture
          image={work.image}
          RenderImage={imgProps => (
            <StyledCardImage
              loading={index === 0 ? 'eager' : 'lazy'}
              {...imgProps}
              {...fx.card}
            />
          )}
        ></Picture>
        <figcaption {...fx.caption}>
          <header>{work.company}</header>
          <section>
            <strong>{work.position}</strong>
            {typeof work.highlights === 'string' &&
            work.highlights.includes('- ') ? (
              <ul key="highlights">
                {work.highlights
                  .split('- ')
                  .filter(Boolean)
                  .map(highlight => (
                    <li key={highlight}>{highlight}</li>
                  ))}
              </ul>
            ) : (
              <p key="highlights">{work.highlights}</p>
            )}
            <p>{work.summary}</p>
            <StyledLink to={work.website}>{work.website}</StyledLink>
          </section>
          <StyledExperienceSection>
            <StyledLink to={`/Portfolio/Experience/${work.id}`}>
              <TimeRange startDate={work.startDate} endDate={work.endDate} />
            </StyledLink>
          </StyledExperienceSection>
        </figcaption>
      </StyledCardFigure>
    </StyledCard>
  )
}

/**
 * @idea could provide a cool graph to sort resumes/portfolios too and highlight
 * like build your own github
 */
export function PortfolioPage({
  person,
  work,
  openSource,
  ...rest
}: ResumeType) {
  const isAmp = useAmp()
  const fx = React.useMemo(
    () =>
      isAmp
        ? ({ 'amp-fx': 'parallax', 'data-parallax-factor': '1.3' } as const)
        : {},
    []
  )

  return (
    <>
      {isAmp && <AmpStyles />}
      <PortfolioHead
        {...person}
        {...rest}
        titleText={`${person.name}'s Portfolio`}
        description={person.summary}
        image={person.image}
      />
      <PortfolioSchema person={person} work={work} openSource={openSource} />
      <StyledHeader name={person.name} />
      <StyledMain>
        <StyledLeaderBoard {...fx}>
          <h1>What I&apos;ve done</h1>
        </StyledLeaderBoard>
        <StyledGrid className="parallax-image-window">
          {work.map(renderWork)}
        </StyledGrid>
      </StyledMain>
      <Footer name={person.name} openSource={openSource} />
    </>
  )
}

export default PortfolioPage
