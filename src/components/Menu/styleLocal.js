import styled from "styled-components";


export const Wrapper = styled.div`
  padding-top: 0.2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #1c2023;
  box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.div`
  align-items: center;
  margin: 1rem 1rem 0 1rem;
  font-size: 2rem;
  color: white;
`;

export const ButtonWrapper = styled.div`
  margin-top: 1.2rem;
`;

export const ButtonSignOut = styled.div`
  margin-left: auto;
  margin-right: 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1.2rem;
`;


export const LinkStyle = {
  textDecoration: "none",
  color: "white"
};
