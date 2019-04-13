import { Request as ExpressRequest } from 'express'

/**
 * @todo test - copy from elsewhere
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URL
 */
export function fromReqToUrl(req: ExpressRequest): URL {
  const urlPath = req.url || ''
  /**
   * enforcing https only
   */
  const urlHost = req.headers.host
  const urlOrigin = 'https://' + urlHost
  const urlFull = urlOrigin + urlPath

  const url = new URL(urlFull)

  return url
}
