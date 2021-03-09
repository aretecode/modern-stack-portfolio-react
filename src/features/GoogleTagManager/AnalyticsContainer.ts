import { trackEvent } from './utils'

export class AnalyticsContainer {
  public initializeAnalytics() {
    this.trackPageView()
  }
  public trackPageView() {
    trackEvent({ event: 'pageView' })
  }
  public trackColorChange() {
    trackEvent({ event: 'colorChange', theme: 'dark' })
  }
}
