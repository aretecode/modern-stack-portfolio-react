import * as React from 'react'
/**
 * since we are using next, this is not working
 * @example
 *     import { Link as BaseLink, LinkProps } from 'react-router-dom'
 *     import { LinkProps } from 'react-router-dom'
 */
/**
 * @see https://raw.githubusercontent.com/zeit/next.js/canary/packages/next/client/link.js
 * ^ does not accept className
 * @see https://github.com/zeit/next.js/issues/1942#issuecomment-313925454
 */
import BaseLink from 'next/link'
import { useAmp } from 'next/amp'
import styled from 'styled-components'

export type LinkProps = React.HTMLAttributes<HTMLAnchorElement> & {
  to?: string
  href?: string
  rel?: string
}

export const DynamicLink = React.memo((props: LinkProps & { theme?: any }) => {
  const isAmp = useAmp()
  const { to, href, theme, ...remainingProps } = props
  const toHref = (to || href || '') as string
  const toHrefAmp =
    toHref.startsWith('/') && toHref.endsWith('amp=1') && isAmp
      ? `${toHref}?amp=1`
      : toHref

  if (
    toHref.includes('http') ||
    toHref.startsWith('tel:') ||
    toHref.startsWith('mailto:')
  ) {
    // eslint-disable-next-line
    return <a {...remainingProps} href={toHref} />
  } else {
    const { children, ...remaining } = remainingProps
    return (
      <BaseLink href={toHrefAmp}>
        <a {...remaining} href={toHrefAmp}>
          {children}
        </a>
      </BaseLink>
    )
  }
})

/** @idea could use styled theme */
export const StyledLink = styled(DynamicLink)`
  text-decoration: none;
  position: relative;
  letter-spacing: 0.2em;
  color: var(--color-link);

  &:link,
  &:visited {
    color: var(--color-link);
  }
  &:focus {
    outline: thin dotted;
  }
  &:hover {
    color: var(--color-link-hover);
  }
  &:link {
    -webkit-tap-highlight-color: rgba(102, 102, 102, 0.5);
  }

  /* link effects */
  & {
    position: relative;
  }
  &::after {
    content: '';
    background-color: #fff;
    mix-blend-mode: exclusion;
    position: absolute;
    height: 0;
    width: calc(100% + 16px);
    left: -2px;
    bottom: -4px;
    transition: height 0.24s cubic-bezier(0.4, 0, 0.2, 1),
      background-color 0.24s cubic-bezier(0.4, 0, 0.2, 1),
      width 0.24s cubic-bezier(0.4, 0, 0.2, 1);
  }
  &:hover::after {
    height: calc(100% + 8px);
    width: calc(100%);
  }
`

export type StyledLinkProps = React.ComponentProps<typeof StyledLink>
