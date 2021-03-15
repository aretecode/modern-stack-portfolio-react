import * as React from 'react'

export function useDarkModeClassName(isDarkMode: boolean) {
  if (typeof window === 'undefined') {
    return
  }

  React.useLayoutEffect(() => {
    if (isDarkMode === true) {
      !window.document.body.classList.contains('dark-mode') &&
        window.document.body.classList.add('dark-mode')
    } else if (isDarkMode === false) {
      window.document.body.classList.contains('dark-mode') &&
        window.document.body.classList.remove('dark-mode')
    }
  }, [isDarkMode])
}
