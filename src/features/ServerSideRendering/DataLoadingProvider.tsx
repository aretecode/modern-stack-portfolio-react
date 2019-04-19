import * as React from 'react'
import { DataLoading } from './DataLoading'
import { DataLoadingContext } from './DataLoadingContext'

export class DataLoadingProvider extends React.PureComponent<{
  contextValue: DataLoading
}> {
  render() {
    return React.createElement(
      DataLoadingContext.Provider as any,
      { value: this.props.contextValue },
      this.props.children
    )
  }
}
