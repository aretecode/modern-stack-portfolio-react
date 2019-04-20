/**
 * @file this would be named `URL` if we only exported the class, but it's the module (_`require('url')`_)
 * @see https://github.com/tc39/proposal-global (_would be nice to use_)
 * could use ponyfill instead
 */

// tslint:disable:no-var-requires
export const URL = !process.browser ? require('url').URL : window.URL
export const URLSearchParams = !process.browser
  ? require('url').URLSearchParams
  : window.URLSearchParams
