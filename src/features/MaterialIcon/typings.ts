/**
 * @todo split pdf, could abstract
 */
export type IconNameType =
  | 'facebook'
  | 'linkedin'
  | 'github'
  | 'twitter'
  | 'pdf'
  | 'up_arrow'
  | 'down_arrow'

export interface AnimatedArrowIconProps {
  icon: 'up' | 'down'
}

export type AnimationRefType = React.MutableRefObject<
  SVGAnimateElement & { beginElement: () => void; endElement: () => void }
>

export interface AnimatedIconRenderPropArgs {
  hasRenderedAndAnimated: boolean
  direction: 'up' | 'down'
}
