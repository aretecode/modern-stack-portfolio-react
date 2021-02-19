import * as React from 'react'
import { render } from '../../../../__tests__/render'
import { MaterialIcon } from '../MaterialIcon'

describe('MaterialIcon', () => {
  it('should render icon for name', () => {
    const { container } = render(<MaterialIcon icon="pdf" />)
    expect(container).toMatchSnapshot()
  })
})
