import * as React from 'react'
import { StyledSeparator } from '../../features/Separator'
import { StyledTime } from './styled'

export interface TimeRangeProps {
  endDate: string
  startDate: string
}

export default React.memo(function TimeRange({
  startDate,
  endDate,
}: TimeRangeProps) {
  return (
    <>
      <StyledTime dateTime={startDate}>{startDate}</StyledTime>
      <StyledSeparator />
      <StyledTime dateTime={endDate}>{endDate}</StyledTime>
    </>
  )
})
