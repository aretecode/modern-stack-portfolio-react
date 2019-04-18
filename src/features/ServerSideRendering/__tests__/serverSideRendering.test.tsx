/**
 * @todo @file split this out and merge with `_app` (_also cleanup_)
 * ^ this file is more... **without** next.js
 */
import 'jest'
import * as React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import {
  getDataFromTree as getDataFromTreeApollo,
  ApolloProvider,
} from 'react-apollo'
import {
  Request as OriginalExpressRequest,
  Response as OriginalExpressResponse,
} from 'express'
import { StaticRouter } from 'react-router-dom'
import Helmet, { HelmetData } from 'react-helmet'
import { ServerStyleSheet } from 'styled-components'
import { initApolloClient } from '../../../apolloClient'
import { logger } from '../../../log'
import {
  DataLoading,
  DataLoadingContext,
  DataLoadingProvider,
  DataLoadingContextType,
  DEFAULT_DATA_LOADING_CONTEXT,
} from '../index'

export interface GetMarkupFromTreeOptions {
  tree: React.ReactNode
  context?: { [key: string]: any }
  contextValue?: DataLoading
  renderFunction?: (tree: React.ReactElement<any>) => string
}

export async function getDataFromTreeDataLoading(
  namedArgs: GetMarkupFromTreeOptions
) {
  const { contextValue } = namedArgs
  const data = await contextValue!.all()
  return data
}

export interface ReactRouterContext {
  url?: string
  status?: number
}
export interface ParamsType {
  [key: string]: any
  nossr?: boolean
  nocache?: boolean
}
export type ExpressRequest = OriginalExpressRequest & {
  SHOULD_USE_SSR?: boolean
  SHOULD_USE_CACHE?: boolean

  params?: ParamsType
  query?: ParamsType
}
export type ExpressResponse = OriginalExpressResponse

export const cache = new Map()

/**
 * @see https://github.com/styled-components/styled-components/issues/378
 * @todo https://github.com/nfl/react-helmet/issues/216
 */
function renderHelmet(helmetObj: HelmetData) {
  return (
    <>
      {helmetObj.title.toComponent()}
      {helmetObj.base.toComponent()}
      {helmetObj.meta.toComponent()}
      {helmetObj.link.toComponent()}
      {helmetObj.style.toComponent()}
    </>
  )
}

export function fromRequestToHash(req: ExpressRequest): string {
  const query = req.query || req.params || req.body
  const url = req.url
  const queryAsString = JSON.stringify(query)
  return url + queryAsString
}

class Component extends React.PureComponent {
  static contextType = DataLoadingContext
  readonly context: DataLoadingContextType

  constructor(props: any, state: any) {
    super(props, state)
    this.fetchData()
  }
  async fetchData() {
    this.context.set('canada', Promise.resolve('yay! canada'))
  }
  render() {
    return (
      <>
        <ins>{JSON.stringify(this.context.get('canada'), undefined, 2)}</ins>
        <h1>eh</h1>
      </>
    )
  }
}

export async function serverSideRenderMiddleware(
  req: ExpressRequest,
  res: ExpressResponse
) {
  const shouldServerSideRender = req.SHOULD_USE_SSR
  const shouldCache = req.SHOULD_USE_CACHE

  if (shouldServerSideRender === false) {
    logger.info('[ssr] skipping ssr')
    res.send('nossr!')
  } else {
    if (shouldCache === true) {
      logger.info('[ssr] using cache')
      const hash = fromRequestToHash(req)

      if (cache.has(hash) === true) {
        const cached = cache.get(hash)
        // res.setHeader('cached', true as any)
        res.send(cached)
        return
      }
    }

    logger.info('[ssr] full render')

    try {
      /**
       * Create a context for <StaticRouter>,
       * which will allow us to query for the results of the render.
       */
      const reactRouterContext: ReactRouterContext = {}

      const apolloClient = initApolloClient()
      const dataLoadingContextValue = new DataLoading()

      /**
       * @todo here we would add ApolloClient etc, but those are all in `_app` atm
       */
      const view = (
        <StaticRouter location={req.url} context={reactRouterContext}>
          <ApolloProvider client={apolloClient}>
            <DataLoadingProvider contextValue={dataLoadingContextValue}>
              <Component />
            </DataLoadingProvider>
          </ApolloProvider>
        </StaticRouter>
      )

      /**
       * @todo can move this out
       */
      async function fromViewToObj(viewArg: JSX.Element) {
        const sheet = new ServerStyleSheet()

        logger.debug('[ssr] getting data from data loading')
        const dataLoadingResponse = await getDataFromTreeDataLoading({
          tree: view,
          contextValue: dataLoadingContextValue,
        })

        logger.debug('[ssr] getting apollo data')
        try {
          await getDataFromTreeApollo(viewArg)
        } catch (apolloGetFromTreeError) {
          console.error(apolloGetFromTreeError)
        }

        logger.debug('[ssr] collecting styles')
        const viewWithStyles = sheet.collectStyles(viewArg)
        const styledTags = sheet.getStyleElement() as JSX.Element[]

        logger.debug('[ssr] rendering with styles')
        const htmlWithStyles = renderToString(viewWithStyles)
        logger.debug('[ssr] rendering style tags')
        const styleTagHtml = renderToString(<>{styledTags}</>)
        logger.debug('[ssr] rewinding helmet')
        // currently unused
        // const helmetObj = Helmet.rewind()
        // logger.debug('[ssr] rewinding helmet obj')
        // const headView = renderHelmet(helmetObj)
        const helmetObj = {
          htmlAttributes: {
            toString() {
              return 'unused'
            },
          },
        }

        logger.debug('[ssr] final render to string')
        const html = renderToStaticMarkup(viewArg)

        logger.debug('[ssr] extract apolloClientState')
        const apolloClientState = apolloClient.extract()

        logger.debug('[ssr] serializing')
        // @todo @@security not secure
        const fetchResponseString =
          JSON.stringify({ dataLoadingResponse, apolloClientState }) || ''

        return {
          html,
          styleTagHtml,
          helmetObj,
          apolloClientState,
          htmlWithStyles,
          fetchResponseString,
        }
      }

      logger.debug('[ssr] about to get obj from view')
      const {
        html,
        fetchResponseString,
        styleTagHtml,
        helmetObj,
      } = await fromViewToObj(view)

      logger.debug('[ssr] rendering obj to html template')
      const htmlWithData = `
        ${helmetObj.htmlAttributes.toString()}

        ${styleTagHtml}
        ${html}
        <script>window.__INITIAL_DATA__=${fetchResponseString}</script>
      `

      logger.debug('[ssr] sending html response')
      res.send(htmlWithData)
    } catch (exception) {
      console.error(exception)
    }
  }
}

const DEFAULT_REQUEST = Object.freeze({
  SHOULD_USE_CACHE: true,
  SHOULD_USE_SSR: true,
})

function createExpressMocks(mockRequest = { ...DEFAULT_REQUEST }) {
  const responses = new Set()
  const mockResponse = {
    send(response: string) {
      responses.add(response)
    },
  }

  return { req: mockRequest, res: mockResponse, responses }
}

/**
 * @todo ensure other parts
 */
describe('ssr', () => {
  it('should server side render  - with data', async () => {
    const { req, res, responses } = createExpressMocks()
    expect(responses.size).toEqual(0)
    await serverSideRenderMiddleware(req as any, res as any)
    expect(responses.size).toEqual(1)
    expect(Array.from(responses).pop()).toContain('yay')

    // expect(Array.from(responses).pop()).toMatchSnapshot()
  })
})
