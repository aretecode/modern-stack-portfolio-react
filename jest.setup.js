require('./env')
require('intersection-observer')
require('raf').polyfill(global)
require('jest-styled-components')
const { cleanup } = require('@testing-library/react')

/**
 * this is in src/utils/polyfill
 */
const globalAny = global
globalAny.fetch = require('node-fetch')

afterEach(cleanup)
