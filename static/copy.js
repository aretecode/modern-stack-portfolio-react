/**
 * this is to copy our src code into the output
 */
const { resolve, join } = require('path')
const { realpathSync } = require('fs')
const appDirectory = realpathSync(process.cwd())

const resolveApp = relativePath => resolve(appDirectory, relativePath)
const { copyFile } = require('fs')
const { promisify } = require('util')
const asyncCopyFile = promisify(copyFile)

/**
 * will copy a file from project root => out directory
 */
async function copyFromTo(from, to) {
  const srcDir = resolveApp('')
  const distStaticDir = resolveApp('.next/static')

  const fromAbsolutePath = join(srcDir, from)
  const toAbsolutePath = join(distStaticDir, to)
  console.debug(`[scripts] copying ${fromAbsolutePath} => ${toAbsolutePath}`)
  await asyncCopyFile(fromAbsolutePath, toAbsolutePath)
}

/**
 * @note this is here because next offline adds one as well, so we hack to reference & wrap that fn
 * @see https://github.com/zeit/next.js/#copying-custom-files
 */
async function copyFilesToDist() {
  console.debug('[scripts] starting copying')
  await copyFromTo('static/robots.txt', 'robots.txt')
  await copyFromTo('static/manifest.json', 'manifest.json')
  await copyFromTo('static/sitemap.xml', 'sitemap.xml')
  console.debug('[scripts] done copying')
}

copyFilesToDist()
