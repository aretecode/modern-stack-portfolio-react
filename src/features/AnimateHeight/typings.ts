import { AnyFunction } from '../typings'

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

export interface AnimateHeightContextStateType {
  height: number
  maxHeight: undefined | number
  isExpanded: boolean
  set(key: 'height', value: number): void
  set(key: 'maxHeight', value: number): void
  set(key: 'isExpanded', value: boolean): void
}

export interface RenderTriggerProps {
  isExpanded: boolean
  onClick: AnyFunction
}
