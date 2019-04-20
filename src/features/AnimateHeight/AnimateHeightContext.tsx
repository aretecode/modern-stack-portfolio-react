import * as React from 'react'
import { createContext } from 'react'
import { AnimateHeightContextStateType } from './typings'
import { AnimateHeightState } from './AnimateHeightState'

export const AnimateHeightContext = createContext<
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
