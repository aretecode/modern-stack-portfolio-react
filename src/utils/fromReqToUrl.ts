/* eslint-disable max-statements */
/* eslint-disable max-depth */
import type { Request as ExpressRequest } from 'express'
import type { UnknownObj } from '../typings'
import { logger } from '../log'
import { URL } from './url'

/**
 * @todo test - copy from elsewhere
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URL
 */
export function fromReqToUrl(
  req: ExpressRequest & { url?: string; headers: UnknownObj }
): URL {
  if (req === undefined) {
    if (process.browser) {
      if (process.env.NODE_ENV === 'development') {
        logger.warn(
          '[fromReqToUrl] missing url, falling back to url from window'
        )
      }
      return new URL(window.location.href)
    } else {
      if (process.env.NODE_ENV === 'development') {
        logger.error('[fromReqToUrl] missing url in request!')
      }
    }
  }

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
