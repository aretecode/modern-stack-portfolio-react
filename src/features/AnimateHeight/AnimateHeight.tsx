import * as React from 'react'
import { logger } from '../../log'
import { AnimateHeightProps, AnimateHeightContextStateType } from './typings'
import { collapseSection, expandSection } from './utils'
import { defaultRenderTrigger } from './renderProps'
import { AnimateHeightContext } from './AnimateHeightContext'

/**
 * if needed, can use ref in `componentDidUpdate`
 */
export class AnimateHeightComponent extends React.PureComponent<
  AnimateHeightProps,
  unknown,
  AnimateHeightContextStateType
> {
  public static defaultProps = {
    renderTrigger: defaultRenderTrigger,
  }
  public static contextType = AnimateHeightContext

  constructor(props: AnimateHeightProps, state: any) {
    super(props, state)

    const isExpanded =
      this.props.isDefaultExpanded === undefined
        ? true
        : this.props.isDefaultExpanded
    this.context.set('isExpanded', isExpanded)
  }

  protected updateRefTimeout: any = undefined

  /**
   * @todo move data out of ui
   */
  public async componentDidMount() {
    if (this.isExpanded === false) {
      const { forwardedRef } = this.props

      /**
       * if we do not have a ref, call `componentDidMount` again to see if we have one later
       */
      if (forwardedRef === undefined || forwardedRef.current === null) {
        if (process.env.NODE_ENV === 'development') {
          logger.error(`[AnimateHeight] missing forwarded ref current target,
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
      /**
       * the following is not done because we just set height to 0 to start
       *
       * @example
       *    const elementTransition = element.style.transition
       *    element.style.transition = ''
       *    await collapseSection(element)
       *    element.style.transition = elementTransition
       */
      await collapseSection(element)
      this.setIsExpanded(false)
    }
  }

  /**
   * added here for ease of change
   * though it has a negligible perf hit
   */
  protected get isExpanded() {
    return this.context.isExpanded
  }
  // @lint this is a value
  protected setIsExpanded = (isExpanded: boolean) => {
    this.context.set('isExpanded', isExpanded)
    /**
     * required to update the arrow icon
     */
    this.forceUpdate()
  }
  protected handleShow = () => {
    const { forwardedRef } = this.props
    expandSection(forwardedRef!.current)
    this.setIsExpanded(true)
  }
  protected handleHide = () => {
    const { forwardedRef } = this.props as Required<AnimateHeightProps>
    collapseSection(forwardedRef!.current)
    this.setIsExpanded(false)
  }
  protected handleToggle = () => {
    if (this.isExpanded) {
      this.handleHide()
    } else {
      this.handleShow()
    }
  }

  public render() {
    const { renderTrigger, children } = this.props
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
