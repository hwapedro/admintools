import styled, { css } from 'styled-components'

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  :not(:first-child) {
    margin-top: 55px;
  }
`

export const Input = styled.input`
  width: 600px;
  font-size: 1.2rem;
  background-color: #e8e9ee;
  border: none;
  padding: 20px;
  border-radius: 5px;
  ${props =>
    props.invalid &&
    css`
      transition: border 0.3s;
      border: 2px solid ${props => props.theme.errorColor};
    `}
  &::placeholder {
    font-size: 1.2rem;
  }
  &:focus {
    outline-color: #3f75ff;
    outline-width: 4px;
  }
`

export const Label = styled.label`
  font-size: 1.5rem;
  color: black;
  margin-bottom: 10px;
`