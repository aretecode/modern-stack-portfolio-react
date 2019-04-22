/**
 * to do this properly, we would load it from graphql
 */
// tslint:disable
import * as React from 'react'
import { PortfolioContext } from '../../src/features/PortfolioContext'
import { PortfolioSchema } from '../../src/features/PortfolioSchema'
import { PortfolioHead } from '../../src/features/PortfolioHead'
import { StyledCard } from '../../src/features/Card'
import { StyledMain } from '../../src/features/Main'
import { StyledLink } from '../../src/features/Link'
import { WorkType } from '../../src/typings'
import {
  StyledGrid,
  StyledCardImage,
  StyledCardFigure,
  StyledLeaderBoard,
} from './styled'
import { TimeRange } from './TimeRange'

/**
 * @hack images with specific sizes
 */
export function renderWork(work: WorkType, index: number) {
  return (
    <StyledCard key={work.company + work.startDate + work.endDate}>
      <StyledCardFigure>
        <StyledCardImage
          width="1000"
          height="692"
          isAlwaysAboveTheFold={index === 0}
          src={work.picture}
          loading="lazy"
          srcSizeList={[
            ['(max-width: 800px)', work.picture.replace('m-', 'm-')],
            ['(max-width: 1024px)', work.picture.replace('m-', 'w-m-')],
            ['(min-width: 2000px)', work.picture.replace('m-', 'xl-')],
          ]}
          alt={`work picture for ${work.company}`}
        />
        <figcaption>
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
          <section>
            <StyledLink to={`/Portfolio/Experience?index=${index}`}>
              <TimeRange startDate={work.startDate} endDate={work.endDate} />
            </StyledLink>
          </section>
        </figcaption>
      </StyledCardFigure>
    </StyledCard>
  )
}

/**
 * could provide a cool graph to sort resumes/portfolios too and highlight
 * like build your own github
 */
export function PortfolioPage() {
  const portfolioContext = React.useContext(PortfolioContext)
  const { summary, name } = portfolioContext.basics
  const titleText = `${name}'s Portfolio`

  /**
   * @todo move static url out
   */
  const imageUrl =
    'https://noccumpr-cdn.sirv.com/images/james-wiens-work-experience-combined-filtered.png'

  return (
    <>
      <PortfolioHead
        titleText={titleText}
        description={summary}
        image={imageUrl}
      />
      <PortfolioSchema />
      <StyledMain>
        <StyledLeaderBoard>
          <h1>What I've done</h1>
        </StyledLeaderBoard>
        <StyledGrid>{portfolioContext.work.map(renderWork)}</StyledGrid>
      </StyledMain>
    </>
  )
}
