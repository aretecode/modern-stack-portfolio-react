/**
 * @description currently based on the link below
 * @see https://css-tricks.com/using-css-transitions-auto-dimensions/
 *
 * @file @goals
 *   - allow animation of height without requiring extra divs
 *
 * @file @todo
 *   1. cleanup the helper functions
 *   2. decouple state so it can be handled externally (_or listen to props to update_)
 *   3. use this as a hook?
 *
 * @todo split to files
 */
import * as React from 'react'
import styled from 'styled-components'
import { AnyFunction } from '../typings'
import { MaterialIcon } from './MaterialIcon'

/* this default styled trigger is specific to resume page */
export const StyledLargeMaterialIcon = styled(MaterialIcon)`
  width: 42px;
  height: 42px;
`
export const StyledButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  transition: justify-content 500ms ease-in-out;
  margin-right: 1rem;

  @media (max-width: 1023px) {
    padding-top: 0.5rem;
    justify-content: center;
    flex-basis: 25%;
    order: 1;
    margin: 0;
  }
`
export const StyledButton = styled.button`
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0;
  appearance: none;
  user-select: none;

  @media (max-width: 1023px) {
    width: 42px;
    height: 42px;
  }
`

export interface AnimateHeightProps {
  className?: string
  forwardedRef?: React.RefObject<any>
  children?: React.ReactNode

  /**
   * currently only accepting props
   * ...could accept state also
   */
  isDefaultExpanded?: boolean

  renderTrigger?: (props: RenderTriggerProps) => React.ReactNode
}

function collapseSection(element: HTMLElement) {
  // get the height of the element's inner content, regardless of its actual size
  const sectionHeight = element.scrollHeight

  // temporarily disable all css transitions
  const elementTransition = element.style.transition
  element.style.transition = ''

  return new Promise(resolve => {
    // on the next frame (as soon as the previous style change has taken effect),
    // explicitly set the element's height to its current pixel height, so we
    // aren't transitioning out of 'auto'
    requestAnimationFrame(() => {
      element.style.height = sectionHeight + 'px'
      element.style.transition = elementTransition

      // on the next frame (as soon as the previous style change has taken effect),
      // have the element transition to height: 0
      requestAnimationFrame(() => {
        element.style.height = 0 + 'px'
        resolve(element.style.height)
      })
    })

    // mark the section as "currently collapsed"
    element.setAttribute('aria-hidden', 'true')
  })
}

function expandSection(element: HTMLElement) {
  // get the height of the element's inner content, regardless of its actual size
  const sectionHeight = element.scrollHeight

  // have the element transition to the height of its inner content
  element.style.height = sectionHeight + 'px'

  // when the next css transition finishes (which should be the one we just triggered)
  element.addEventListener('transitionend', function(e) {
    // @todo invalid
    // remove this event listener so it only gets triggered once
    // element.removeEventListener('transitionend', arguments.callee)
    //
    // remove "height" from the element's inline styles, so it can return to its initial value
    // element.style.height = null
  })

  // mark the section as "currently not collapsed"
  element.setAttribute('aria-hidden', 'false')
}

export interface AnimateHeightContextStateType {
  height: number
  maxHeight: undefined | number
  isExpanded: boolean
  set(key: 'height', value: number): void
  set(key: 'maxHeight', value: number): void
  set(key: 'isExpanded', value: boolean): void
}

/**
 * could also do this with hooks, but this an example app and showing a few different methods
 * could also add an `observe` method & `forceUpdate` higher up
 */
export class AnimateHeightState implements AnimateHeightContextStateType {
  height = 0
  maxHeight = undefined
  isExpanded = false
  set(key: keyof AnimateHeightContextStateType, value: number | boolean): void {
    this[key] = value
  }
}

export const AnimateHeightContext = React.createContext<
  AnimateHeightContextStateType
>(new AnimateHeightState())

/**
 * @note this only updates because state is getting destructured
 *       if we have a `===` reference to the same object
 *       components consuming the context will not update
 *       so the `AnimateHeightContext` above will not work in all cases
 *       and as such, can be ErrorProne
 */
export class AnimateHeightContextProvider extends React.PureComponent {
  state = {
    height: 0,
    maxHeight: undefined,
    isExpanded: false,
  }

  set = (key: keyof AnimateHeightContextStateType, value: number | boolean) => {
    this.setState({ [key]: value })
  }

  render() {
    return (
      <AnimateHeightContext.Provider value={{ ...this.state, set: this.set }}>
        {this.props.children}
      </AnimateHeightContext.Provider>
    )
  }
}

export interface RenderTriggerProps {
  isExpanded: boolean
  onClick: AnyFunction
}

export function defaultRenderTrigger(props: RenderTriggerProps) {
  const { isExpanded, onClick } = props
  const text = isExpanded ? 'hide' : 'show'
  const icon = isExpanded ? 'up_arrow' : 'down_arrow'
  return (
    <StyledButtonWrap key="wrap">
      <StyledButton onClick={onClick} key="toggle">
        <StyledLargeMaterialIcon icon={icon} title={text} />
      </StyledButton>
    </StyledButtonWrap>
  )
}

/**
 * if needed, can use ref in `componentDidUpdate`
 */
export class AnimateHeightComponent extends React.PureComponent<
  AnimateHeightProps
> {
  static defaultProps = {
    renderTrigger: defaultRenderTrigger,
  }
  static contextType = AnimateHeightContext
  readonly context: AnimateHeightContextStateType

  constructor(props: AnimateHeightProps, state: any) {
    super(props, state)

    const isExpanded =
      this.props.isDefaultExpanded === undefined
        ? true
        : this.props.isDefaultExpanded
    this.context.set('isExpanded', isExpanded)
  }

  updateRefTimeout: any = undefined

  /**
   * @todo move data out of ui
   */
  async componentDidMount() {
    if (this.isExpanded === false) {
      const { forwardedRef } = this.props

      /**
       * if we do not have a ref, call `componentDidMount` again to see if we have one later
       */
      if (forwardedRef === undefined || forwardedRef.current === null) {
        if (process.env.NODE_ENV === 'development') {
          console.error(`[AnimateHeight] missing forwarded ref current target,
          make sure you have rendered your ref like <AnimateHeight ref={refObj}><section ref={refObj}></section></AnimateHeight>`)
        }

        /**
         * clear if we already have one
         */
        if (this.updateRefTimeout !== undefined) {
          clearTimeout(this.updateRefTimeout)
        }
        /**
         * handle calling this again if we don't have a ref yet
         */
        const handleTimeout = () => {
          this.componentDidMount()
        }
        this.updateRefTimeout = setTimeout(handleTimeout, 500)
        return
      }

      /**
       * 1. get the element
       * 2. reset it's _transition_ (after storing a **reference** to it)
       * 3. hide it quickly
       * 4. restore the _transition_ to the **reference**
       * 5. update the state so it re-renders
       */
      const element = forwardedRef!.current
      // const elementTransition = element.style.transition
      // element.style.transition = ''
      await collapseSection(element)
      // element.style.transition = elementTransition

      this.setIsExpanded(false)
    }
  }

  /**
   * added here for ease of change
   * though it has a negligible perf hit
   */
  get isExpanded() {
    return this.context.isExpanded
  }
  setIsExpanded = (isExpanded: boolean) => {
    this.context.set('isExpanded', isExpanded)
    /**
     * required to update the arrow icon
     */
    this.forceUpdate()
  }
  handleShow = () => {
    const { forwardedRef } = this.props
    expandSection(forwardedRef!.current)
    this.setIsExpanded(true)
  }
  handleHide = () => {
    const { forwardedRef } = this.props as Required<AnimateHeightProps>
    collapseSection(forwardedRef!.current)
    this.setIsExpanded(false)
  }
  handleToggle = () => {
    if (this.isExpanded) {
      this.handleHide()
    } else {
      this.handleShow()
    }
  }

  render() {
    const { className, forwardedRef, renderTrigger, children } = this.props

    /**
     * @todo split to another component, could be renderProp
     */

    return (
      <>
        {renderTrigger!({
          onClick: this.handleToggle,
          isExpanded: this.isExpanded,
        })}
        {children}
      </>
    )
  }
}

export const AnimateHeight = React.forwardRef(
  (props: AnimateHeightProps, ref: React.RefObject<any>) => {
    return React.createElement(AnimateHeightComponent, {
      ...props,
      forwardedRef: ref || props.forwardedRef,
    })
  }
)
export default AnimateHeight
