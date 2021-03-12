'use strict'
process.env.NODE_ENV = process.env.NODE_ENV || 'production'
const { resolve } = require('path')
const { realpathSync, writeFile } = require('fs')
const { promisify } = require('util')
const { formatISO } = require('date-fns')

const appDirectory = realpathSync(process.cwd())
const resolveApp = relativePath => resolve(appDirectory, relativePath)
const asyncWriteFile = promisify(writeFile)

const now = Date.now()

async function updateSiteMeta() {
  const updatedTime = formatISO(now)

  const structured = { updatedTime }
  const structuredString = JSON.stringify(structured, null, 2)
  await asyncWriteFile(resolveApp('public/structured.json'), structuredString)
}

updateSiteMeta()
