import styled from "styled-components";

export const ButtonWrapper = styled.div`
  margin: 0.5rem 0
  text-align: center;
`;

export const Select = styled.select`
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  margin: 0.5rem;
  font-size: 1rem;
  color: black;
  padding-left: 0.7em;
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
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: absolute;
  width: 700px;
  height: auto;
  top: 35%;
  left: 50%;
  z-index: 101;
  margin-top: -300px;
  margin-left: -330px;
  border: 1px solid white;
  border-radius: 20px;
`;

export const LabelElement = styled.span`
  margin-top: 2rem;
  font-weight: 900;
  font-size: 1.8rem;
`;

export const TitleInput = styled.input`
  border: 1px solid #ddd;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
  color: black;
  padding-left: 0.7em;
  width: 100%;
`;
//needs another look at
export const QuestionInput = styled.input`
  border: 1px solid #ddd;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
  color: black;
  padding-left: 0.7em;
  width: 100%;
`;

export const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
`;

export const OptionInput = styled.input`
  border: 1px solid #ddd;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  font-size: 1rem;
  color: black;
  padding-left: 0.7em;
  width: 65%;
`;

export const CheckboxInput = styled.input`
  justify-content: flex-start;
  margin: auto;
  height: 18px;
  width: 18px;
`;
export const TextQuestion = styled.textarea`
  border: 1px solid #ddd;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
  color: black;
  padding-left: 0.7em;
  width: 100%;
  height: 10.4rem;
  resize: none;
  
`;

export const ConsturctorForm = styled.form``;
