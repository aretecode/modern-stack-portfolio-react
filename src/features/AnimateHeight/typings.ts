import * as React from 'react'
import type { AnyFunction } from '../../typings'

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

export interface AnimateHeightContextStateType {
  height: number
  maxHeight: undefined | number
  isExpanded: boolean
  setIsExpanded(x: boolean): void
  setMaxHeight(x: number): void
  setHeight(x: number): void
}

export interface RenderTriggerProps {
  isExpanded: boolean
  /** optional for amp */
  onClick?: AnyFunction
}

export type AmpAnimateHeightProps = AnimateHeightProps & {
  onClick?: () => void
  isExpanded?: boolean
  children: React.ReactNode
}
