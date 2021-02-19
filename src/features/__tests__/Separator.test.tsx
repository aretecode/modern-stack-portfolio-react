import * as React from 'react'
import { render } from '../../../__tests__/render'
import { StyledSeparator } from '../Separator'

describe('Separator', () => {
  it('should match snapshot', () => {
    const { container } = render(<StyledSeparator />)
    expect(container).toMatchSnapshot()
  })
})
