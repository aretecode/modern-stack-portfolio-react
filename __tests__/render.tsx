import * as React from 'react'
import { StyleSheetManager } from 'styled-components'
import { render as renderReact } from '@testing-library/react'

export const render: typeof renderReact = children =>
  renderReact(
    <StyleSheetManager disableVendorPrefixes>{children}</StyleSheetManager>
  )
