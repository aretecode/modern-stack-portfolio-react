/**
 * @see https://github.com/zeit/next.js/tree/master/examples/ssr-caching
 * @see https://github.com/zeit/next.js/tree/canary/examples/custom-server-typescript/server
 * @see https://medium.com/@igordata/how-to-cache-all-pages-in-next-js-at-server-side-1850aace87dc
 * @see https://github.com/zeit/now-examples/issues/196#issuecomment-451210803
 * @see https://zeit.co/guides/custom-next-js-server-to-routes
 */
import * as express from 'express'
import * as next from 'next'
import * as LRUCache from 'lru-cache'
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'

const port = +process.env.PORT! || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100 * 1024 * 1024,
  /**
   * cache size will be 100 MB using `return n.length` as length() function
   */
  length(n: string | any[], key: unknown) {
    return n.length
  },
  maxAge: 1000 * 60 * 60 * 24 * 30,
})

const preparing = app.prepare()

/**
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req: ExpressRequest) {
  return `${req.path}`
}

async function renderAndCache(req: ExpressRequest, res: ExpressResponse) {
  const key = getCacheKey(req)

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    console.info(`[server] serving from cache ${key}`)
    res.setHeader('x-cache', 'HIT')
    res.send(ssrCache.get(key))
    return
  }

  try {
    console.info(`[server] key ${key} not found, rendering`)
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, req.path, req.query)

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html)
      return
    }

    // Let's cache this page
    ssrCache.set(key, html)

    res.setHeader('x-cache', 'MISS')
    res.send(html)
  } catch (err) {
    app.renderError(err, req, res, req.path, req.query)
  }
}

const server = express()

server.get('/_next/*', (req, res) => {
  handle(req, res)
})

server.get('*', (req, res) => {
  // would use this but we'll need to tweak paths
  // since we build server separately: ${fromReqToUrl(req).href}
  console.info(`[server] loading page`)
  return renderAndCache(req, res)
})

/**
 * to support now
 * @see https://zeit.co/blog/serverless-express-js-lambdas-with-now-2
 */
export default server

if (process.env.IS_NOW === undefined) {
  preparing.then(() => {
    console.log('[next] not on serverless')

    server.listen(port, (serverStartupError?: Error) => {
      if (serverStartupError) {
        throw serverStartupError
      }

      console.info(`[server] > Ready on http://localhost:${port}`)
    })
  })
}
