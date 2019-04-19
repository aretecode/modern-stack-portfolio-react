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
 */
import * as React from 'react'

export interface AnimateHeightProps {
  className?: string
  forwardedRef?: React.RefObject<any>
  children?: React.ReactNode

  /**
   * currently only accepting props
   * ...could accept state also
   */
  isDefaultExpanded?: boolean
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

/**
 * @todo remove
 */
const compiled = Date.now()

export class AnimateHeight extends React.PureComponent<AnimateHeightProps> {
  state = {
    height: 0,
    maxHeight: undefined,
    isExpanded:
      this.props.isDefaultExpanded === undefined
        ? true
        : this.props.isDefaultExpanded,
  }

  updateRefTimeout: any = undefined

  async componentDidMount() {
    console.log(Date.now() - compiled, 'mount')

    if (this.state.isExpanded === false) {
      const { forwardedRef } = this.props
      if (forwardedRef === undefined || forwardedRef.current === null) {
        console.error(`[AnimateHeight] missing forwarded ref current target,
        make sure you have rendered your ref like <AnimateHeight ref={refObj}><section ref={refObj}></section></AnimateHeight>`)

        const handleTimeout = () => {
          this.componentDidMount()
        }
        if (this.updateRefTimeout !== undefined) {
          clearTimeout(this.updateRefTimeout)
        }
        this.updateRefTimeout = setTimeout(handleTimeout, 500)
        return
      }

      const element = forwardedRef!.current
      const elementTransition = element.style.transition
      element.style.transition = ''
      await collapseSection(element)
      element.style.transition = elementTransition
      this.setState({
        ...this.state,
        isExpanded: false,
      })
    }
  }

  componentDidUpdate() {
    console.debug('@todo update ref from initial here')
  }

  handleShow = () => {
    const { forwardedRef } = this.props
    expandSection(forwardedRef!.current)
    this.setState({
      ...this.state,
      isExpanded: true,
    })
  }
  handleHide = () => {
    const { forwardedRef } = this.props as Required<AnimateHeightProps>
    collapseSection(forwardedRef!.current)
    this.setState({
      ...this.state,
      isExpanded: false,
    })
  }
  handleToggle = () => {
    if (this.state.isExpanded) {
      this.handleHide()
    } else {
      this.handleShow()
    }
  }

  render() {
    console.log(Date.now() - compiled, '[animateHeight] render')
    const { className, forwardedRef, children } = this.props

    return (
      <>
        {children}
        <button onClick={this.handleToggle}>
          {this.state.isExpanded ? 'hide' : 'show'}
        </button>
      </>
    )
  }
}

export default React.forwardRef(
  (props: AnimateHeightProps, ref: React.RefObject<any>) => {
    return React.createElement(AnimateHeight, {
      ...props,
      forwardedRef: ref || props.forwardedRef,
    })
  }
)
