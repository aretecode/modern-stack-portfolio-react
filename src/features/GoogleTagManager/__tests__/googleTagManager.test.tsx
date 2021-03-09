import * as React from 'react'
import { render } from '../../../../__tests__/render'
import * as exported from '../index'
import {
  GoogleTagManagerHeaderScript,
  GoogleTagManagerBodyScript,
} from '../index'

describe('GoogleTagManager', () => {
  it('should export the same stuff', () => {
    expect(exported).toMatchSnapshot()
  })
  it('should render in *non* AMP mode', () => {
    const headScript = render(<GoogleTagManagerHeaderScript />).container
    const bodyScript = render(<GoogleTagManagerBodyScript />).container
    expect(headScript).toMatchSnapshot()
    expect(bodyScript).toMatchSnapshot()
  })
  it('should render *in* AMP mode', () => {
    const headScript = render(<GoogleTagManagerHeaderScript isAmp={true} />)
      .container
    const bodyScript = render(<GoogleTagManagerBodyScript isAmp={true} />)
      .container
    expect(headScript).toMatchSnapshot()
    expect(bodyScript).toMatchSnapshot()
  })
})
