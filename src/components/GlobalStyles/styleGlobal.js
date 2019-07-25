import styled from "styled-components";

export const Wrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TitleSpan = styled.span`
display: flex;
justify-content: flex-start;
align-items: center;
margin: 1rem 0;
font-size: 1.3rem;
`;

export const LabelElement = styled.span`
  margin-top: 2rem;
  font-weight: 900;
  font-size: 1.8rem;
`;

export const ElementWrapper = styled.li`
  background-color: ${props => props.theme.courses};
  margin-top: 2rem;
  padding: 1rem;
  box-shadow: 0px 2px 4px rgb(0,0,0,0.3)
`;

export const ButtonWrapper = styled.div`
display: flex;
justify-content: flex-end;
align-items: flex-end;
margin-top: 0.5rem;
`;

export const EmptyMessage = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 2.5rem;
  top: 50%;
  margin-top: 270px;
`;