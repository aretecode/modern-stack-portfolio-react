import * as React from 'react'
import styled from 'styled-components'
import AnimateHeight from '../../src/features/AnimateHeight'
import {
  ResumeContext,
  ResumeContextType,
} from '../../src/features/ResumeContext'

/**
 * @todo split out
 * @todo should be default height 0 if we want it to be hidden initially
 */
export const StyledSkillsWrap = styled.aside`
  overflow: hidden;
  transition: height 0.3s ease-out;
`

export class Skills extends React.PureComponent {
  static contextType = ResumeContext
  readonly context: ResumeContextType
  animateRef = React.createRef<any>()

  render() {
    const { skills } = this.context.basics
    return (
      <AnimateHeight isDefaultExpanded={false} ref={this.animateRef}>
        <StyledSkillsWrap ref={this.animateRef}>
          <header>skills</header>
          <ol>
            {skills.map(x => (
              <li key={x}>{x}</li>
            ))}
          </ol>
        </StyledSkillsWrap>
      </AnimateHeight>
    )
  }
}
