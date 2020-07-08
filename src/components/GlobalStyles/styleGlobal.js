import styled from "styled-components";

export const Wrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ConsturctorWrapper = styled.div`
  background: ${props => props.theme.courses};
  padding: 1.5rem;
  position: absolute;
  width: 700px;
  height: auto;
  top: 35%;
  left: 50%;
  z-index: 101;
  margin-top: -200px;
  margin-left: -330px;
  box-shadow: 0px 2px 4px rgb(0,0,0,0.3);
`;

export const ConsturctorForm = styled.form``;

export const DarkGround = styled.div`
  background: #000;
  height: 100%;
  opacity: 0.5;
  position: fixed;
  width: 100%;
  z-index: 100;
  top: 0;
  left: 0;
`;

export const TitleSpan = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
`;

export const LabelElement = styled.label`
  display: inline-block;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 1.8rem;
`;

export const ElementWrapper = styled.li`
  background-color: ${props => props.theme.courses};
  margin-top: 2rem;
  padding: 2rem;
  box-shadow: 0px 2px 4px rgb(0, 0, 0, 0.3);
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
  margin-top: 5rem;
`;

export const SelectWrapper = styled.div`
  width: 10rem;
`
