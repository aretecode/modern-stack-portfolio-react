import * as React from 'react'
import { isObj } from '../utils/is'

export type ScriptProps =
  | { src: string }
  | { type?: string; children: { [key: string]: unknown } | string }
export interface CombinedScriptProps {
  src: string
  type?: string
  children: { [key: string]: unknown } | string
}

function serializeScriptChildren(children: unknown): string {
  return isObj(children)
    ? process.env.NODE_ENV === 'development'
      ? JSON.stringify(children, undefined, 2)
      : JSON.stringify(children)
    : (children as string)
}

/** @todo https://nextjs.org/blog/next-11#script-optimization */
export default React.memo(function Script(props: ScriptProps) {
  const {
    type,
    src,
    children,
    ...remainingProps
  } = props as CombinedScriptProps

  const json = serializeScriptChildren(children)
  const scriptType =
    type === undefined && isObj(children) ? 'application/ld+json' : type

  if (src === undefined) {
    /* eslint-disable react/jsx-curly-spacing */
    /* eslint-disable react/no-danger */
    return (
      <script
        type={scriptType}
        {...remainingProps}
        dangerouslySetInnerHTML={{ __html: json }}
      />
    )
  } else {
    return <script src={src} {...remainingProps} />
  }
})
