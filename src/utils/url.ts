/**
 * @file this would be named `URL` if we only exported the class, but it's the module (_`require('url')`_)
 * @see https://github.com/tc39/proposal-global (_would be nice to use_)
 * could use ponyfill instead
 */

export const URL: typeof globalThis.URL = !process.browser
  ? require('url').URL
  : globalThis.URL

export const URLSearchParams: typeof globalThis.URLSearchParams =
  !process.browser ? require('url').URLSearchParams : globalThis.URLSearchParams
