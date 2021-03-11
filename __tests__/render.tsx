import * as React from 'react'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import { render as renderReact } from '@testing-library/react'

export const render: typeof renderReact = (children: any) =>
  renderReact(
    <StyleSheetManager disableVendorPrefixes>
      <ThemeProvider theme={{ isDark: false }}>{children}</ThemeProvider>
    </StyleSheetManager>
  ) as any
