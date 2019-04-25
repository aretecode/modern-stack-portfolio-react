// if we import this, it fails
// import { NormalizedCacheObject } from 'apollo-boost'

interface NormalizedCacheObject {
  [key: string]: unknown
}

declare global {
  interface Window {
    readonly __LAST_PUBLISH_TIMESTAMP__: number
    readonly __APOLLO_STATE__: NormalizedCacheObject
    readonly __APP_STATE__: { [key: string]: unknown }
    readonly __ROUTER_STATE__: { [key: string]: unknown }
  }
}

interface Window {
  readonly __LAST_PUBLISH_TIMESTAMP__: number
  readonly __APOLLO_STATE__: { [key: string]: unknown }
  readonly __APP_STATE__: { [key: string]: unknown }
  readonly __ROUTER_STATE__: { [key: string]: unknown }
}

declare namespace NodeJS {
  interface Global {
    process: Process
  }
  interface ProcessEnv {
    NODE_ENV: 'test' | 'development' | 'production'
    READONLY: 'true' | 'false' | undefined
    IS_NOW: 'true' | 'false' | undefined

    GOOGLE_TAG_MANAGER_WEB_ID: string
    GOOGLE_TAG_MANAGER_AMP_ID: string
    GRAPHQL_API_URL: string

    /**
     * probably will remove this
     */
    WEBSITE_ORIGIN?: string
  }
  interface Process {
    browser: boolean
    env: ProcessEnv
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    'amp-img': any
    'amp-google-document-embed': any
    'amp-analytics': any
    'amp-install-serviceworker': any
    'amp-accordion': any
  }
}
