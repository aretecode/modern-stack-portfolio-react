import * as React from 'react'
import styled, { css } from 'styled-components'
import { AnimateHeight } from '../../features/AnimateHeight/AnimateHeight'
import { AnimateHeightContext } from '../../features/AnimateHeight/AnimateHeightContext'
import { PortfolioContext } from '../../features/PortfolioContext'

/**
 * @todo split out
 * @see StyledSocialProfilesWrap for related `order` comments
 */
export const StyledSkillsWrap = styled.aside`
  overflow: hidden;
  transition: margin-top 0.62s ease-in-out, height 0.24s ease-out;
  height: 0;
  background: white;
  width: 100vw;
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  order: 4;

  ${(props: { isExpanded?: boolean }) =>
    props.isExpanded === true &&
    css`
      margin-top: 1.5rem;
      transition: margin-top 0s ease-in-out, height 0.48s ease-out;
    `};
`

export const StyledSkillItem = styled.li`
  display: inline-flex;
  border-radius: 4px;
  margin: 0.25rem;
  padding: 0.5rem;
  background: var(--color-dark-background-dark);
  color: white;
  border-radius: 6px;
`

export const StyledSkillList = styled.ul`
  margin: 0;
  padding: 1rem;
`

export function Skills(props: {}) {
  const animateHeight = React.useContext(AnimateHeightContext)
  const portfolioContext = React.useContext(PortfolioContext)
  const animateRef = React.createRef<any>()
  const { skills } = portfolioContext.basics

  return (
    <AnimateHeight isDefaultExpanded={false} ref={animateRef}>
      <StyledSkillsWrap ref={animateRef} isExpanded={animateHeight.isExpanded}>
        <StyledSkillList>
          {skills.map(x => (
            <StyledSkillItem key={x}>{x}</StyledSkillItem>
          ))}
        </StyledSkillList>
      </StyledSkillsWrap>
    </AnimateHeight>
  )
}
