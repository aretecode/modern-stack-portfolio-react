/* eslint-disable max-statements */
/**
 * @todo might be able to put more of these in build-time only
 * @see https://github.com/zeit/next.js/issues/876
 * @see https://github.com/vercel/next.js/discussions/13810
 */
const withOffline = require('next-offline')
const { env, envWithoutNodeEnv } = require('./env')

/**
 * @description Make sure any symlinks in the project folder are resolved:
 * @see  https://github.com/facebookincubator/create-react-app/issues/637
 */
const { resolve, join } = require('path')
const { realpathSync } = require('fs')
const appDirectory = realpathSync(process.cwd())
const resolveApp = relativePath => resolve(appDirectory, relativePath)

/**
 * @see https://zeit.co/examples/nextjs/
 * @see https://zeit.co/docs/v2/deployments/ignoring-source-paths
 * @see https://github.com/hanford/next-offline/tree/master/examples/now2
 *
 * @see https://nextjs.org/docs#build-time-configuration
 */
const nextConfig = {
  images: {
    domains: ['noccumpr-cdn.sirv.com'],
  },
  amp: 'hybrid',
  env: envWithoutNodeEnv,
  target:
    process.env.DISABLE_SERVERLESS !== undefined ? 'server' : 'serverless',
  webpack(config, options) {
    if (process.env.IS_DOCKER === undefined) {
      const { EnvironmentPlugin } = require('webpack')
      config.plugins.push(new EnvironmentPlugin(env))
    }

    if (process.env.NODE_ENV === 'production') {
      console.debug('[next] in production mode, not type checking')
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        occurrenceOrder: true,
        sideEffects: true,
        usedExports: true,
        providedExports: true,
        concatenateModules: true,
        nodeEnv: 'production',
      }

      return config
    } else if (options.isServer) {
      console.debug('[next] not type checking server')
      return config
    } else {
      console.debug('[next] in development mode, type checking')
    }

    const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
    const plugin = new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: require.resolve('./tsconfig.eslint.json'),
        diagnosticOptions: {
          syntactic: true,
          semantic: true,
          declaration: false,
          global: false,
        },
      },
    })
    config.plugins.push(plugin)

    return config
  },
  /** next-offline typings @todo */
  workboxOpts: {
    swDest: 'static/service-worker.js',
  },
}

const workboxConfig = withOffline(nextConfig)

function withBuildTimeDeps() {
  const withBundleAnalyzer = require('@next/bundle-analyzer')
  return withBundleAnalyzer({
    ...workboxConfig,
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../../bundles/server.html',
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html',
      },
    },
  })
}

module.exports =
  process.env.IS_DOCKER === undefined &&
  process.env.SHOULD_ANALYZE_BUNDLE !== undefined
    ? withBuildTimeDeps()
    : workboxConfig
