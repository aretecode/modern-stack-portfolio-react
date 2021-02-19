import * as React from 'react'
import { render } from '../../../../__tests__/render'
import * as exported from '../index'
import { AmpContext } from '../../AmpContext'
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
    const headScript = render(
      <AmpContext.Provider value={{ isAmp: true }}>
        <GoogleTagManagerHeaderScript />
      </AmpContext.Provider>
    ).container
    const bodyScript = render(
      <AmpContext.Provider value={{ isAmp: true }}>
        <GoogleTagManagerBodyScript />
      </AmpContext.Provider>
    ).container
    expect(headScript).toMatchSnapshot()
    expect(bodyScript).toMatchSnapshot()
  })
})
