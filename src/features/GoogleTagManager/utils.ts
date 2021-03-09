import type { TagManagerEventType } from './typings'

export function toGoogleTagManager() {
  return (window as any).gta as typeof gapi.client
}

export function trackEvent(args: TagManagerEventType) {
  const globalDataLayer: TagManagerEventType[] = globalThis.dataLayer ?? []
  globalDataLayer.push(args)
}
