/**
 * @file sideEffects: true
 * @file @todo https://github.com/tc39/proposal-global
 */

/**
 * @see fromReqToUrl
 */
if (!process.browser) {
  (global as any).URL = require('url').URL
}

/**
 * @see apolloClient
 */
if (!process.browser) {
  (global as any).fetch = require('node-fetch')
}
