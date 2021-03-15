import * as React from 'react'
import { createContext } from 'react'
import { AnimateHeightContextStateType } from './typings'

export const AnimateHeightContext = createContext<AnimateHeightContextStateType>(
  undefined as any
)

export const useAnimateContextState = () => {
  const [height, setHeight] = React.useState(0)
  const [maxHeight, setMaxHeight] = React.useState<number>(undefined as any)
  const [isExpanded, setIsExpanded] = React.useState(false)

  return {
    height,
    maxHeight,
    isExpanded,
    setHeight,
    setMaxHeight,
    setIsExpanded,
  }
}
