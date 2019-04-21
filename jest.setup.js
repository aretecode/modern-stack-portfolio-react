require('./env')
require('intersection-observer')
require('raf').polyfill(global)
require('react-testing-library/cleanup-after-each')
require('jest-styled-components')

/**
 * this is in src/utils/polyfill
 */
const globalAny = global
globalAny.fetch = require('node-fetch')
