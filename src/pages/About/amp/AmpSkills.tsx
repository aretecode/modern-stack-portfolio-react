import * as React from 'react'
import { AmpAnimateHeight } from '../../../features/AnimateHeight/amp'
import { StyledSkillsWrap, StyledSkillItem, StyledSkillList } from '../Skills'

export function Skills({ skills }: { skills: string[] }) {
  return (
    <AmpAnimateHeight>
      <StyledSkillsWrap as="aside">
        <StyledSkillList>
          {skills.map(x => (
            <StyledSkillItem key={x}>{x}</StyledSkillItem>
          ))}
        </StyledSkillList>
      </StyledSkillsWrap>
    </AmpAnimateHeight>
  )
}
