import styled, { css } from 'styled-components'

export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`

export const ButtonWrapper = styled.div``

export const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
`

export const TitleSpan = styled.span`
  font-size: 1.4rem;
  color: black;
  padding-left: 0.2em;
  display: inline-block;
`

export const ElementWrapper = styled.span`
  margin: 0.5rem 0;
`

export const OptionsWrapper = styled.div`
  list-style-type: circle !important;
`

export const OptionElementWrapper = styled.span`
  margin: 0.5rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const OptionSpan = styled.span`
  font-size: 1.2rem;
  color: black;
  width: 100%;

  ${({ right }) =>
    right
      ? css`
          color: #5ecba1;
        `
      : css`
          color: #f45b69;
        `}
`
