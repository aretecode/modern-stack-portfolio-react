import type { NextWebVitalsMetric } from 'next/app'

/**
 * @desc Use `window.gtag` if you initialized Google Analytics as this example:
 * @see https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_document.js
 */
export function reportWebVitals({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric) {
  window?.gtag?.('event', name, {
    event_category:
      label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  })
}
