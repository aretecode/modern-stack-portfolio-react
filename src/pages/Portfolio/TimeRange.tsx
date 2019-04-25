import * as React from 'react'
import { StyledSeparator } from '../../features/Separator'
import { StyledTime } from './styled'

export interface TimeRangeProps {
  endDate: string
  startDate: string
}

/**
 * could use date-fns here
 */
export class TimeRange extends React.PureComponent<TimeRangeProps> {
  render() {
    const { startDate, endDate } = this.props
    return (
      <>
        <StyledTime dateTime={startDate}>{startDate}</StyledTime>
        <StyledSeparator />
        <StyledTime dateTime={endDate}>{endDate}</StyledTime>
      </>
    )
  }
}
