import { TagManagerEventType } from './typings'

export function toGoogleTagManager() {
  return (window as any).gta as typeof gapi.client
}

/**
 * @todo move & reuse & test
 */
export function toGlobalThis() {
  return process.browser ? (window as any) : (global as any)
}

export function trackEvent(args: TagManagerEventType) {
  const globalDataLayer = toGlobalThis().dataLayer as TagManagerEventType[]
  globalDataLayer.push(args)
}
