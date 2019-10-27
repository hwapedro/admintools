import styled from "styled-components";

export const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TaskWrapper = styled.div`
  width: 960px;
  height: auto;
`;

export const TaskElementWrapper = styled.div`
  background-color: ${props => props.theme.courses};
  background-color: #e9e9e9;
  margin: 1.5rem 0;
  padding: 1rem;
  box-shadow: 0px 2px 4px rgb(0, 0, 0, 0.3);
`;

export const TaskListWrapper = styled.ul`
  padding: 0;
  list-style-type: none;
`;

export const TitleSpan = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.4rem;
  color: black;
  padding-left: 0.7em;
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  margin: 0.5rem 0;
  text-align: end;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
export const LabelElement = styled.span`
  text-align: left;
  margin-top: 1 rem;
  font-weight: 900;
  font-size: 1.4rem;
`;

export const OptionsWrapper = styled.ul`
  list-style-type: circle !important;
  padding: 0 4rem;
`;

export const OptionElementWrapper = styled.li`
  margin: 0.5rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const OptionSpan = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.25rem;
  color: black;
  padding-left: 0.7em;
  width: 100%;
`;

export const ImgMark = styled.img`
  width: 2rem;
  height: 2rem;
  margin-left: 1rem;
  margin-bottom: -0.4rem;
`;

export const ImgCross = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  margin-left: 1rem;
  margin-bottom: -0.4rem;
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
export const Edit = styled.div`
  background-color: ${props => props.theme.courses};
  background-color: #e9e9e9;
  margin: 1.5rem 0;
  width: 960px;
  height: auto;
  padding: 1rem;
  box-shadow: 0px 2px 4px rgb(0, 0, 0, 0.3);
  z-index: 52;
  position: absolute;
`;

export const ConsturctorForm = styled.form`
  text-align: left;
`;
