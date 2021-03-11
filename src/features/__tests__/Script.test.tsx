import * as React from 'react'
import { render } from '../../../__tests__/render'
import Script from '../Script'

describe('Script', () => {
  it('should render empty without an error (except for types)', () => {
    const { container } = render(<Script />)
    expect(container.innerHTML).toContain('<script')
  })
  it('should use "application/ld+json" when children is an object', () => {
    const children = { isTest: true }
    const { container } = render(<Script>{children}</Script>)

    expect(container.querySelector('script').getAttribute('type')).toEqual(
      'application/ld+json'
    )
  })
  it('should have no type when children is not an object', () => {
    const { container } = render(<Script />)
    expect(container.querySelector('script').getAttribute('type')).toEqual(null)
  })
  it('should work when children is a string', () => {
    const children = { isTest: true }
    const { container } = render(<Script>{'alert(1);'}</Script>)

    expect(container.innerHTML).toEqual('<script>alert(1);</script>')
  })
})
