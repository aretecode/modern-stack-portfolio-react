interface NormalizedCacheObject {
  [key: string]: unknown
}

type RequestIdleCallbackFunctionType = (
  callbackNative: (deadline: {
    readonly didTimeout: boolean
    timeRemaining: () => number
  }) => void,
  opts?: { timeout: number }
) => any

/** @lint typescript var usage, not `var` as a variable */
/* eslint-disable no-var */
declare var dataLayer: any[]

declare global {
  interface Window {
    readonly gtag: any
    readonly requestIdleCallback?: RequestIdleCallbackFunctionType
    readonly cancelIdleCallback?: (handle: any) => void
    readonly __LAST_PUBLISH_TIMESTAMP__: number
    readonly __APOLLO_STATE__: NormalizedCacheObject
    readonly dataLayer: any[]
  }
}

interface Window {
  readonly gtag: any
  readonly requestIdleCallback?: RequestIdleCallbackFunctionType
  readonly cancelIdleCallback?: (handle: any) => void
  readonly __LAST_PUBLISH_TIMESTAMP__: number
  readonly __APOLLO_STATE__: { [key: string]: unknown }
  readonly dataLayer: any[]
}

declare namespace NodeJS {
  interface Global {
    process: Process
  }
  interface ProcessEnv {
    NODE_ENV: 'test' | 'development' | 'production'
    READONLY: 'true' | 'false' | undefined
    IS_NOW: 'true' | 'false' | undefined

    CONTENTFUL_SPACE_ID: string
    CONTENTFUL_TOKEN: string
    GOOGLE_TAG_MANAGER_WEB_ID: string
    GOOGLE_TAG_MANAGER_AMP_ID: string
    GRAPHQL_API_URL: string

    /** @idea probably will remove this */
    WEBSITE_ORIGIN?: string
  }
  interface Process {
    browser: boolean
    env: ProcessEnv
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    'i-amphtml-sizer-intrinsic': any
    'amp-img': any
    'amp-google-document-embed': any
    'amp-analytics': any
    'amp-install-serviceworker': any
    'amp-accordion': any
  }
}
