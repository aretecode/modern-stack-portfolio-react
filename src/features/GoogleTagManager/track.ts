import { trackEvent } from './utils'

export const trackPageView = () => trackEvent({ event: 'pageView' })
export const trackColorChange = () =>
  trackEvent({ event: 'colorChange', theme: 'dark' })
