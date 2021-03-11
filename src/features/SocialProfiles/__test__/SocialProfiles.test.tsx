import * as React from 'react'
import { render } from '../../../../__tests__/render'
import SocialProfiles from '../SocialProfiles'

describe('SocialProfiles', () => {
  it('should render all for context', () => {
    const { container } = render(
      <SocialProfiles profiles={[]} resumeWebsite={''} />
    )
    expect(container).toMatchSnapshot()
  })
})
