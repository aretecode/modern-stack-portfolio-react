import * as React from 'react'
import { AmpAnimateHeight } from '../../../features/AnimateHeight/amp'
import { PortfolioContext } from '../../../features/PortfolioContext'
import { StyledSkillsWrap, StyledSkillItem, StyledSkillList } from '../Skills'

export function Skills(props: {}) {
  const portfolioContext = React.useContext(PortfolioContext)
  const { skills } = portfolioContext.basics

  return (
    <AmpAnimateHeight>
      <StyledSkillsWrap>
        <StyledSkillList>
          {skills.map(x => (
            <StyledSkillItem key={x}>{x}</StyledSkillItem>
          ))}
        </StyledSkillList>
      </StyledSkillsWrap>
    </AmpAnimateHeight>
  )
}
