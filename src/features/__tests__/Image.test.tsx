import * as React from 'react'
import { render } from '../../../__tests__/render'
import { Image } from '../Image'
import { AmpContext } from '../AmpContext'

describe('Image', () => {
  it('should render empty without an error (except for types)', () => {
    const { container } = render(<Image src="" alt="" />)
    expect(container.innerHTML).toContain('<img')
  })
  it('should render an "amp-img" when providing an AmpContext', () => {
    const { container } = render(
      <AmpContext.Provider value={{ isAmp: true }}>
        <Image />
      </AmpContext.Provider>
    )
    expect(container.innerHTML).toContain('<amp-img')
  })
  it('should render an "amp-img" with only amp attributes', () => {
    const src =
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
    const { container } = render(
      <AmpContext.Provider value={{ isAmp: true }}>
        <Image src={src} ignored={true} />
      </AmpContext.Provider>
    )
    const img = container.querySelector('[src]')!
    expect(img.getAttribute('src')).toEqual(src)
    expect(img.getAttribute('ignored')).toEqual(null)
  })
})
