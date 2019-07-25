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

export const TitleInput = styled.input`
display: flex;
justify-content: flex-start;
align-items: center;
margin: 1rem 0;
font-size: 1.3rem;
color: black;
`;

export const LabelElement = styled.span`
margin-top: 2rem;
font-weight: 900;
font-size: 1.8rem;
`;

export const DescriptionSpan = styled.span`
display: flex;
justify-content: flex-start;
align-items: center;
margin: 1rem 0;
font-size: 1.3rem;
`;

export const DescriptionTextArea = styled.textarea`
display: flex;
justify-content: flex-start;
width: 100%;
height: 400px;
max-height: 100%;
max-width: 100%;
resize: none;
align-items: center;
margin-top: 2rem;
font-size: 1.3rem;
color: black;
`;

export const ElementsWrapper = styled.ul`
list-style-type: none;
width: 1000px;
`;

export const ElementWrapper = styled.li`
background-color: ${props => props.theme.courses};
margin-top: 2rem;
padding: 1rem;
box-shadow: 0px 2px 4px rgb(0, 0, 0, 0.3);
`;

export const ButtonWrapper = styled.div`
display: flex;
justify-content: flex-end;
align-items: flex-end;
margin-top: 0.5rem;
`;

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

export const ConsturctorWrapper = styled.div`
  background: ${props => props.theme.courses};
  padding: 1rem;
  position: fixed;
  width: 700px;
  height: 500px;
  top: 45%;
  left: 50%;
  z-index: 102;
  margin-top: -200px;
  margin-left: -330px;
  border: 1px solid white;
  border-radius: 20px;
`;

export const ConsturctorForm = styled.form``;

export const ButtonWrapperConstructor = styled.div`
  padding-left: 40px;
  width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  margin-top: 0.3rem;
`;