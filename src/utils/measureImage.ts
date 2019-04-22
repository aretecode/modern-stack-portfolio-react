// tslint:disable:no-var-requires
// @lint this file is dynamically including only on the server

/**
 * @example https://github.com/zeit/next-learn-demo/tree/master/E2-lazy-loading-modules/pages
 * @tutorial https://arunoda.me/blog/ssr-and-server-only-modules
 * @see https://github.com/zeit/next.js/issues/5354 for process.browser
 * @note when using process.browser, try to ensure it's in a separate file
 */
import { ServerResponse } from 'http'
import { logger } from '../log'
import { NO_OP } from './EMPTY'

/**
 * @see https://www.npmjs.com/package/image-size
 * @note this mis-identifies image types since it gets it from the url instead of response
 *       though this does not affect ours
 */
const sizeOf = process.browser ? NO_OP : require('image-size')

export interface ImageDimensionsType {
  width: number
  height: number
  type: string
  orientation?: number
}

export async function measureImage(
  src: string
): Promise<ImageDimensionsType | undefined> {
  if (!process.browser) {
    return new Promise((resolve, reject) => {
      const url = require('url')
      const http = require('https')

      try {
        const options = url.parse(src)
        http.get(options, (response: ServerResponse) => {
          const chunks = [] as Uint8Array[]

          response
            .on('data', async (chunk: Uint8Array) => {
              chunks.push(chunk)
            })
            .on('end', async () => {
              const buffer = Buffer.concat(chunks)

              try {
                const result = await sizeOf(buffer)
                resolve(result)
              } catch (sizeOfError) {
                logger.error(sizeOfError)
                reject(sizeOfError)
              }
            })
        })
      } catch (httpException) {
        logger.error({ httpException })
        throw httpException
      }
    })
  } else {
    return undefined
  }
}
