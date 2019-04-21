// tslint:disable
import * as React from 'react'
import {
  ResumeContext,
  ResumeContextType,
} from '../../src/features/ResumeContext'
import { ResumeHead } from '../../src/features/ResumeHead'
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
function renderWork(work: WorkType, index: number) {
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
            <TimeRange startDate={work.startDate} endDate={work.endDate} />
          </section>
        </figcaption>
      </StyledCardFigure>
    </StyledCard>
  )
}

/**
 * could provide a cool graph to sort resumes too and highlight
 * like build your own github
 */
export class ResumePage extends React.PureComponent {
  static contextType = ResumeContext
  readonly context: ResumeContextType

  render() {
    const { name, summary } = this.context.basics
    const titleText = `${name}'s Resume`

    /**
     * @todo move static url out
     */
    const imageUrl =
      'https://noccumpr-cdn.sirv.com/images/james-wiens-work-experience-combined-filtered.png'

    return (
      <>
        <ResumeHead title={titleText} description={summary} image={imageUrl} />
        <StyledMain>
          <StyledLeaderBoard>
            <h1>What I've done</h1>
          </StyledLeaderBoard>
          <StyledGrid>{this.context.work.map(renderWork)}</StyledGrid>
        </StyledMain>
      </>
    )
  }
}
