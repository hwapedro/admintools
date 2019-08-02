import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.courses};
  padding: 1rem;
  margin-top: 20rem;
  position: absolute;
  width: auto;
  height: auto;
  border: 1px solid white;
  border-radius: 1px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Error = styled.span`
  margin-top: 5px;
  font-size: 1rem;
  font-weight: 700;
  text-align: left;
  color: #eb5757;
`;
