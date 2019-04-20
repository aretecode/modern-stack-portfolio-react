import * as React from 'react'
import { render } from 'react-testing-library'
import { MaterialIcon } from '../MaterialIcon'

describe('MaterialIcon', () => {
  it('should render icon for name', () => {
    const { container } = render(<MaterialIcon icon="pdf" />)
    expect(container).toMatchSnapshot()
  })
})
