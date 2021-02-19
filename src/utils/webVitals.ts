import { getCLS, getFID, getLCP } from 'web-vitals'

function sendToAnalytics(metric: {} & unknown) {
  const body = JSON.stringify(metric)

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  if (navigator?.sendBeacon) {
    navigator.sendBeacon('/analytics', body)
  } else {
    fetch('/analytics', { body, method: 'POST', keepalive: true })
  }
}

export const webVitals = () => {
  getCLS(sendToAnalytics)
  getFID(sendToAnalytics)
  getLCP(sendToAnalytics)
}
