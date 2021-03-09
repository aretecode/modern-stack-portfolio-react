import * as React from 'react'
import { createContext } from 'react'
import { AnimateHeightContextStateType } from './typings'
import { AnimateHeightState } from './AnimateHeightState'

export const AnimateHeightContext = createContext<AnimateHeightContextStateType>(
  new AnimateHeightState()
)

/**
 * @note this only updates because state is getting destructured
 *       if we have a `===` reference to the same object
 *       components consuming the context will not update
 *       so the `AnimateHeightContext` above will not work in all cases
 *       and as such, can be ErrorProne
 */
export class AnimateHeightContextProvider extends React.PureComponent {
  public state = {
    height: 0,
    maxHeight: (undefined as any) as number,
    isExpanded: false,
  }

  private set = (
    key: keyof AnimateHeightContextStateType,
    value: number | boolean
  ) => {
    this.setState({ [key]: value })
  }

  public render() {
    return (
      <AnimateHeightContext.Provider value={{ ...this.state, set: this.set }}>
        {this.props.children}
      </AnimateHeightContext.Provider>
    )
  }
}
