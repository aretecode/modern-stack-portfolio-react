/**
 * @see https://www.apollographql.com/docs/apollo-server/features/metrics.html#Granular-Logs
 */
import type { BaseLogger, LogFn } from 'pino'
const pino = require('pino')

export const logger = pino({
  /**
   * @note we would separate this to a small function, but for perf it's inlined
   */
  level:
    process.env.NODE_ENV === 'test'
      ? 'silent'
      : process.env.NODE_ENV === 'development'
      ? 'debug'
      : process.env.NODE_ENV === 'production'
      ? 'info'
      : '',
  prettyPrint: process.env.NODE_ENV === 'development' && {
    colorize: true,
  },
}) as BaseLogger & { log: LogFn }
