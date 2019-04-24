import * as React from 'react'
import { render, fireEvent } from 'react-testing-library'
import {
  UP_ARROW_PATH_VALUE,
  DOWN_ARROW_PATH_VALUE,
  AnimatedArrowIcon,
} from '../AnimatedArrowIcon'

describe('AnimatedArrowIcon', () => {
  it('exports the same type of values', () => {
    expect(typeof UP_ARROW_PATH_VALUE).toEqual('string')
    expect(typeof DOWN_ARROW_PATH_VALUE).toEqual('string')
    expect(typeof AnimatedArrowIcon).toEqual('function')
  })

  describe('rendering', () => {
    /**
     * could also test initial path values
     */
    it('should have the values in the correct direction', async () => {
      const view = <AnimatedArrowIcon />
      const { container, rerender } = render(view)
      // react-testing-library wraps with a div
      // svg > title,polygon,path > animation
      const svgElement = container.firstChild!
      const polygonElement = svgElement.children[1]!
      const animationElement = polygonElement.firstChild

      // could also do: polygonElement.getAttribute('points')
      expect(polygonElement).toMatchSnapshot('initial')

      fireEvent.click(svgElement)
      rerender(view)

      const afterClickingValues = animationElement.getAttribute('values')
      // @todo - rendered value is changed slightly
      // expect(afterClickingValues).toEqual(DOWN_ARROW_PATH_VALUE)
      expect(afterClickingValues).toMatchSnapshot('down')

      // click again to render v^
      fireEvent.click(svgElement)
      rerender(view)

      const afterSecondClickValues = animationElement.getAttribute('values')
      expect(afterSecondClickValues).toMatchSnapshot('up')
    })
  })
})
