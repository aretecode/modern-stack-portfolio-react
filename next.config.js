const withTypescript = require('@zeit/next-typescript')
const withOffline = require('next-offline')

/**
 * @description Make sure any symlinks in the project folder are resolved:
 * @see  https://github.com/facebookincubator/create-react-app/issues/637
 */
const { resolve, join } = require('path')
const { realpathSync } = require('fs')
const appDirectory = realpathSync(process.cwd())
const resolveApp = relativePath => resolve(appDirectory, relativePath)
/**
 * this is to copy our src code into the output
 * @see exportPathMap
 */
const { copyFile } = require('fs')
const { promisify } = require('util')
const asyncCopyFile = promisify(copyFile)

/**
 * @see https://zeit.co/examples/nextjs/
 * @todo @see https://zeit.co/docs/v2/deployments/ignoring-source-paths
 * @see https://github.com/hanford/next-offline/tree/master/examples/now2
 *
 * @todo add DefinePlugin
 * @example
 *   {
 *     DISABLE_CACHE: false,
 *     DISABLE_SSR: false,
 *     LOCAL_PRODUCTION: undefined,
 *     REALM_TYPE: 'browser' | 'node'
 *   }
 */
const nextConfig = {
  target: 'serverless',
  /**
   * @see https://www.javascripting.com/view/next-js
   */
  async exportPathMap(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    if (dev) {
      return defaultPathMap
    }
    /**
     * will copy a file from project root => out directory
     */
    async function copyFromTo(from, to = from) {
      return await asyncCopyFile(join(dir, from), join(outDir, to))
    }

    await copyFromTo('static/robots.txt', 'robots.txt')
    await copyFromTo('static/manifest.json', 'manifest.json')
    await copyFromTo('static/sitemap.xml', 'sitemap.xml')
    return defaultPathMap
  },
  webpack(config, options) {
    if (process.env.NODE_ENV === 'production') {
      console.debug('[next] in production mode, not type checking')
      return config
    } else if (options.isServer) {
      console.debug('[next] not type checking server')
      return config
    } else {
      console.debug('[next] in development mode, type checking')
    }

    const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
    const plugin = new ForkTsCheckerWebpackPlugin({
      tsconfig: require.resolve('./tsconfig.json'),
      tslint: require.resolve('./tslint.json'),
      useTypescriptIncrementalApi: true,
      checkSyntacticErrors: true,
      watch: [resolveApp('src'), resolveApp('pages')],
      reportFiles: [
        // only src, not __tests__
        'src/**/*.{ts,tsx}',
        '!**/__tests__/*',
      ],
    })
    config.plugins.push(plugin)
    return config
  },
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'networkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
}

const typescriptConfig = withTypescript(nextConfig)
const workboxConfig = withOffline(typescriptConfig)

module.exports = workboxConfig
