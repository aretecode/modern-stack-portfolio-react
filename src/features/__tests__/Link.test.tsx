import * as React from 'react'
import { render } from '../../../__tests__/render'
import { StyledLink } from '../Link'

describe('Link', () => {
  it('should render an <a> tag when using an absolute url', () => {
    const { container } = render(<StyledLink to="https://google.ca" />)
    expect(container.innerHTML).toContain('<a')
  })
  it('should render a link  when using relative links', () => {
    const { container } = render(<StyledLink to="/eh" />)
    expect(container.innerHTML).toContain('<a')
  })
})
