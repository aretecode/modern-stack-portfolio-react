import styled from 'styled-components'
import { MaterialIcon } from '../MaterialIcon'

/* this default styled trigger is specific to resume page */
export const StyledLargeMaterialIcon = styled(MaterialIcon)`
  width: 42px;
  height: 42px;
`
export const StyledButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  transition: justify-content 500ms ease-in-out;
  margin-right: 1rem;

  @media (max-width: 1023px) {
    justify-content: center;
    flex-basis: 25%;
    order: 3;
    margin-right: 0;
    margin-top: -0.25rem;
  }
  @media (min-width: 1024px) {
    margin-top: -3.5rem;
  }
`
export const StyledButton = styled.button`
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0;
  appearance: none;
  user-select: none;

  @media (max-width: 1023px) {
    width: 42px;
    height: 42px;
  }
`
