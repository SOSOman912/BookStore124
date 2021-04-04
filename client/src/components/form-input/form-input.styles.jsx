import styled, {css} from 'styled-components'

const MainColor = 'black';
const SubColor = 'grey';

const ShrinkLabel = css`
  top: -14px;
  font-size: 12px;
  color: ${MainColor};
`
export const Group = styled.div`
  position: relative;
  margin: 45px 0;

  input[type='password'] {
    letter-spacing: 0.3em;
  }
`

export const FormInputWrap = styled.input`
  background: none;
  background-color: white;
  color: ${SubColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${SubColor};
  margin: 25px 0;

  &:focus {
    outline: none;
    }

  &:focus ~ .form-input-label {
      ${ShrinkLabel}
    }
`

export const FormInputLabel = styled.label`
  color: $sub-color;
  font-size: 14px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  &.shrink {
    ${ShrinkLabel}
  }
`
