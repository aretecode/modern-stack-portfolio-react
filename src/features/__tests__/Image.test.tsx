import * as React from 'react'
import * as useAmpModule from 'next/amp'
import { render } from '../../../__tests__/render'
import Image from '../Picture/Image'

describe('Image', () => {
  it('should render empty without an error (except for types)', () => {
    const { container } = render(<Image src="" alt="" />)
    expect(container.innerHTML).toContain('<img')
  })
  it('should render an "amp-img" when providing an AmpContext', () => {
    jest.spyOn(useAmpModule, 'useAmp').mockImplementation(() => true)

    const { container } = render(
      <>
        <Image src={'https://google.com'} alt={'google'} />
      </>
    )
    expect(container.innerHTML).toContain('<amp-img')
  })
  it('should render an "amp-img" with only amp attributes', () => {
    jest.spyOn(useAmpModule, 'useAmp').mockImplementation(() => true)

    const src =
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
    const { container } = render(
      <>
        <Image src={src} ignored={true} />
      </>
    )
    const img = container.querySelector('[src]')!
    expect(img.getAttribute('src')).toEqual(src)
    expect(img.getAttribute('ignored')).toEqual(null)
  })
})
