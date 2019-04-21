import { load, trackEvent } from './utils'

export class AnalyticsContainer {
  initializeAnalytics() {
    load()
    this.trackPageView()
  }
  trackPageView() {
    trackEvent({ event: 'pageView' })
  }
  trackColorChange() {
    trackEvent({ event: 'colorChange', theme: 'dark' })
  }
}
