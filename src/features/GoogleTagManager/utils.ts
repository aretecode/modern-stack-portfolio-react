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

export function globalDataLayer() {
  const dataLayer = toGlobalThis().dataLayer || []
  return dataLayer as TagManagerEventType[]
}

export function load() {
  toGlobalThis().dataLayer = globalDataLayer()
}

export function trackEvent(args: TagManagerEventType) {
  globalDataLayer().push(args)
}
