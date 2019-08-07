import styled from "styled-components";

export const ElementWrapper = styled.div`
  background-color: ${props => props.theme.courses};
  width: 960px;
  margin-top: 2rem;
  padding: 1rem;
  box-shadow: 0px 2px 4px rgb(0, 0, 0, 0.3);
`;

export const PageMenu = styled.div`
  margin-top: 32px;
`;
export const PageNumber = styled.div`
  font-weight: 900;
  font-size: 1.8rem;
`;

export const PagesWrapper = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ButtonWrapper = styled.div`
  text-align: right;
  display: flex;
  flex-direction: row;
`;

export const PageHeader = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
