import * as React from 'react'
import styled, { css } from 'styled-components'
import { AnimateHeight } from '../../features/AnimateHeight/AnimateHeight'
import { AnimateHeightContext } from '../../features/AnimateHeight/AnimateHeightContext'

/**
 * @todo split out
 * @see StyledSocialProfilesWrap for related `order` comments
 */
export const StyledSkillsWrap = styled.aside`
  overflow: hidden;
  transition: background-color 0.24s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.24s cubic-bezier(0.4, 0, 0.2, 1),
    margin-top 0.62s cubic-bezier(0.4, 0, 0.2, 1), height 0.24s ease-out;
  height: 0;

  background-color: var(--theme-skills-background);
  color: var(--theme-color);

  width: 100vw;
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  order: 4;

  ${(props: { isExpanded?: boolean }) =>
    props.isExpanded === true &&
    css`
      margin-top: 1.5rem;
      transition: margin-top 0s cubic-bezier(0.4, 0, 0.2, 1),
        background-color 0.24s cubic-bezier(0.4, 0, 0.2, 1),
        color 0.24s cubic-bezier(0.4, 0, 0.2, 1), height 0.48s ease-out;
    `};
`

export const StyledSkillItem = styled.li`
  display: inline-flex;
  border-radius: 4px;
  margin: 0.25rem;
  padding: 0.5rem;

  transition: background-color 0.24s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.24s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: var(--theme-skills-item-color);
  color: var(--theme-skills-item-background);

  border-radius: 6px;
`

export const StyledSkillList = styled.ul`
  margin: 0;
  padding: 1rem;
`

export function Skills({ skills }: { skills: string[] }) {
  const animateHeight = React.useContext(AnimateHeightContext)
  const animateRef = React.createRef<any>()
  const [isHidden, setIsHidden] = React.useState(true)

  /** this prevents it from painting the element, hiding it, then re-painting it */
  React.useEffect(() => {
    setIsHidden(false)
  }, [])

  const hidingProps = React.useMemo(
    () => ({
      hidden: isHidden ? true : false,
      className: isHidden ? 'visually-hidden' : '',
      style: isHidden ? { display: 'none' } : {},
    }),
    [isHidden]
  )

  return (
    <AnimateHeight isDefaultExpanded={false} ref={animateRef} {...hidingProps}>
      <StyledSkillsWrap
        ref={animateRef}
        isExpanded={animateHeight.isExpanded}
        {...hidingProps}
      >
        <StyledSkillList>
          {skills.map(x => (
            <StyledSkillItem key={x}>{x}</StyledSkillItem>
          ))}
        </StyledSkillList>
      </StyledSkillsWrap>
    </AnimateHeight>
  )
}
