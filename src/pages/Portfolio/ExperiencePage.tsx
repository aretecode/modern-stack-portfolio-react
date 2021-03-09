import * as React from 'react'
import { AppContext } from '../../features/AppContext'
import { PortfolioSchema } from '../../features/PortfolioSchema'
import { PortfolioHead } from '../../features/PortfolioHead'
import { StyledMain } from '../../features/Main'
import { ResumeType } from '../../typings'
import { StyledGrid, StyledLeaderBoard } from './styled'
import { renderWork } from './PortfolioPage'
import { useRouter } from 'next/router'

/**
 * @file @name PortfolioWorkExperienceItemPage
 */
export default function PortfolioWorkExperienceItemPage({
  person,
  work,
  openSource,
}: ResumeType) {
  const {
    query: { pid = -42 },
  } = useRouter()
  const { url } = React.useContext(AppContext)
  const { name, summary } = person

  const index = +pid
  const workItem = work[index]

  /** @todo show 404 */
  if (workItem === undefined) {
    return <h1>Not found</h1>
  }

  const titleText = `${name}'s Portfolio - ${workItem.company}`

  return (
    <>
      <PortfolioHead
        titleText={titleText}
        description={summary}
        {...person}
        image={workItem.image}
      />
      <PortfolioSchema
        person={person}
        work={work}
        openSource={openSource}
        workIndex={index}
      />
      <StyledMain>
        <StyledLeaderBoard>
          <h1>{workItem.company}</h1>
        </StyledLeaderBoard>
        <StyledGrid>{renderWork(workItem, index)}</StyledGrid>
      </StyledMain>
    </>
  )
}
