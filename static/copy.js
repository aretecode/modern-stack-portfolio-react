/**
 * this is to copy our src code into the output
 */
'use strict'
process.env.NODE_ENV = process.env.NODE_ENV || 'production'
const { resolve, join } = require('path')
const { realpathSync } = require('fs')
const appDirectory = realpathSync(process.cwd())

const resolveApp = relativePath => resolve(appDirectory, relativePath)
const { copyFile } = require('fs')
const { promisify } = require('util')
const asyncCopyFile = promisify(copyFile)

/**
 * @todo split out
 * @todo remove sitemap from git
 * @todo test this, especially the date by writing file reading
 */
const now = Date.now()
const { format } = require('date-fns')
const { writeFile } = require('fs')
const { env } = require('../env')
const asyncWriteFile = promisify(writeFile)
async function updateSiteMap() {
  console.debug('[update] updating site map')
  const isoDate = format(now, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
  const siteMap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>${env.WEBSITE_ORIGIN}/Portfolio</loc>
    <lastmod>${isoDate}</lastmod>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>${env.WEBSITE_ORIGIN}/</loc>
    <lastmod>${isoDate}</lastmod>
    <priority>0.90</priority>
  </url>
</urlset>
`
  const siteMapPath = resolveApp('static/sitemap.xml')
  await asyncWriteFile(siteMapPath, siteMap)
  console.debug('[update] site map updated')
}

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

async function updateAndCopy() {
  await updateSiteMap()
  await copyFilesToDist()
}

updateAndCopy()
