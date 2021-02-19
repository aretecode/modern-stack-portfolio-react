import styled from 'styled-components'

/**
 * for better perf, this doesn't need to be a styled component
 */
export const StyledVector = styled.svg.attrs({
  role: 'img' as string,
  viewBox: '0 0 24 24' as string,
  xmlns: 'https://www.w3.org/2000/svg' as string,
})`
  user-select: none;
`
