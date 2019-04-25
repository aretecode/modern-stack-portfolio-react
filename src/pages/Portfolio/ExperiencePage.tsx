import * as React from 'react'
import { AppContext, DEFAULT_URL } from '../../features/AppContext'
import { PortfolioContext } from '../../features/PortfolioContext'
import { PortfolioSchema } from '../../features/PortfolioSchema'
import { PortfolioHead } from '../../features/PortfolioHead'
import { StyledMain } from '../../features/Main'
import { StyledGrid, StyledLeaderBoard } from './styled'
import { renderWork } from './PortfolioPage'

/**
 * @todo when we put this in `Portfolio`
 *       routing as a nested route does not properly update `_document`
 *       and `url` is wrong...
 * @file @name PortfolioWorkExperienceItemPage
 */
export default function PortfolioWorkExperienceItemPage() {
  const { url } = React.useContext(AppContext)
  const portfolioContext = React.useContext(PortfolioContext)
  const { basics } = portfolioContext
  const { name, summary } = basics

  const index = url.searchParams.has('index')
    ? +url.searchParams.get('index')!
    : -42

  const workItem = portfolioContext.work[index]

  /**
   * @todo show 404
   */
  if (workItem === undefined) {
    return <h1>Not found</h1>
  }

  const imageUrl = workItem.picture
  const titleText = `${name}'s Portfolio - ${workItem.company}`

  return (
    <>
      <PortfolioHead
        titleText={titleText}
        description={summary}
        image={imageUrl}
      />
      <PortfolioSchema workIndex={index} />
      <StyledMain>
        <StyledLeaderBoard>
          <h1>{workItem.company}</h1>
        </StyledLeaderBoard>
        <StyledGrid>{renderWork(workItem, index)}</StyledGrid>
      </StyledMain>
    </>
  )
}
