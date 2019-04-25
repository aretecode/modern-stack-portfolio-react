import { trackEvent } from './utils'

export class AnalyticsContainer {
  initializeAnalytics() {
    this.trackPageView()
  }
  trackPageView() {
    trackEvent({ event: 'pageView' })
  }
  trackColorChange() {
    trackEvent({ event: 'colorChange', theme: 'dark' })
  }
}
