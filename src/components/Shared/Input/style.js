import styled from 'styled-components'

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  :not(:first-child) {
    margin-top: 35px;
  }
`

export const Label = styled.label`
  font-size: 1.5rem;
  color: black;
  margin-bottom: 10px;
`