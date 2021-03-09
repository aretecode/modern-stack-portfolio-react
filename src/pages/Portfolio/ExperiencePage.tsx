import * as React from 'react'
import { useRouter } from 'next/router'
import { AppContext } from '../../features/AppContext'
import { PortfolioSchema } from '../../features/PortfolioSchema'
import { PortfolioHead } from '../../features/PortfolioHead'
import { StyledMain } from '../../features/Main'
import type { ResumeType } from '../../typings'
import { StyledGrid, StyledLeaderBoard } from './styled'
import { renderWork } from './PortfolioPage'

/**
 * @file @name PortfolioWorkExperienceItemPage
 */
export default function PortfolioWorkExperienceItemPage({
  person,
  work,
  openSource,
  ...rest
}: ResumeType) {
  const {
    query: { pid = -42 },
  } = useRouter()
  const { url } = React.useContext(AppContext)
  const pidIndex = work?.findIndex(({ id }) => id == pid)
  /** @todo this does not load yet, was going to do as backwards compatibility */
  const searchIndex = url.searchParams?.has('index')
    ? +url.searchParams.get('index')!
    : pid
  const index: number = Number(pidIndex ?? searchIndex)
  const workItem = work?.[index]

  /** @todo show 404 */
  if (workItem === undefined) {
    return <h1>Not found</h1>
  }

  return (
    <>
      <PortfolioHead
        titleText={`${person.name}'s Portfolio - ${workItem.company}`}
        description={person.summary}
        {...person}
        {...rest}
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
