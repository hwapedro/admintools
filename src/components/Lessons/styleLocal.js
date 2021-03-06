import styled from 'styled-components'

//LESSON STYLE
export const Wrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const EmptyMessage = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 2.5rem;
  top: 50%;
  margin-top: 270px;
`

export const ElementWrapper = styled.div`
  width: 960px;
  background-color: ${(props) => props.theme.courses};
  margin-top: 2rem;
  padding: 2rem;
  box-shadow: 0px 2px 4px rgb(0, 0, 0, 0.3);
`

export const ImgMark = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 1rem;
  margin-bottom: -0.4rem;
`

export const ImgCross = styled.img`
  width: 2rem;
  height: 2rem;
  margin-left: 1rem;
  margin-bottom: -0.4rem;
`

export const TitleSpan = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
`

export const TitleInput = styled.input`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
  color: black;
`

export const LabelElement = styled.label`
  margin-top: 2rem;
  font-weight: 900;
  font-size: 1.8rem;
`

export const DescriptionSpan = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
`

export const DescriptionTextArea = styled.textarea`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 250px;
  max-height: 100%;
  max-width: 100%;
  resize: none;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  color: black;
`

export const ElementsWrapper = styled.ul`
  margin: 0;
  list-style-type: none;
  width: 1000px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 0.5rem;
`

//SET LESSON CONSTRUCTION

export const DarkGround = styled.div`
  background: #000;
  height: 100%;
  opacity: 0.5;
  position: fixed;
  width: 100%;
  z-index: 100;
  top: 0;
  left: 0;
`

export const ConsturctorForm = styled.form``

export const ConsturctorWrapper = styled.div`
  background: ${(props) => props.theme.courses};
  padding: 1.5rem;
  position: absolute;
  width: 700px;
  height: auto;
  top: 35%;
  left: 50%;
  z-index: 101;
  margin-top: -200px;
  margin-left: -330px;
  box-shadow: 0px 2px 4px rgb(0, 0, 0, 0.3);
`

export const ConstructorButton = styled.button`
  width: 150px;
  height: 40px;
  border: 0;
  border-radius: 10px;
  background-color: ${(props) => props.theme.button};
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
    cursor: pointer;
  }
  margin-right: 1rem;
`

export const ButtonWrapperConstructor = styled.div`
  padding-left: 40px;
  width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  margin-top: 0.3rem;
`

// TASK STYLES

export const TaskElementWrapper = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${(props) => props.theme.courses};
  margin-top: 0.5rem;

  border-radius: 10px;
  padding: 0.3rem;
  list-style-type: none;
`

export const TaskTitleInput = styled.input`
  border: 1px solid #ddd;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5rem;
  font-size: 1rem;
  color: black;
  padding-left: 0.7rem;
`

export const QuestionInput = styled.input`
  border: 1px solid #ddd;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5rem;
  padding-bottom: 5rem;
  font-size: 1rem;
  color: black;
  padding-left: 0.7em;
`

export const OptionButton = styled.button`
  width: 200px;
  height: 20px;
  border: 0;
  border-radius: 10px;
  background-color: ${(props) => props.theme.button};
  font-size: 0.85rem;
  font-weight: 400;
  text-transform: uppercase;
  color: white;
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
    cursor: pointer;
  }
  margin-right: 1rem;
`

export const DeleteOptionButton = styled.button`
  width: 150px;
  height: 20px;
  border: 0;
  border-radius: 10px;
  background-color: ${(props) => props.theme.button};
  font-size: 0.85rem;
  font-weight: 400;
  text-transform: uppercase;
  color: white;

  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
    cursor: pointer;
  }
  margin-right: 1rem;
`

export const OptionButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0.5rem;
`

export const TaskOptionWrapper = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props) => props.theme.courses};
  margin-top: 0.5rem;

  border-radius: 1px;
  padding: 0.3rem;
  list-style-type: none;
`

export const SignInButton = styled.button`
  width: 150px;
  height: 40px;
  border: 0;
  border-radius: 10px;
  background-color: ${(props) => props.theme.button};
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
    cursor: pointer;
  }
  margin-right: 1rem;
`

export const ExamPropContainer = styled.div`
  margin-bottom: 20px;
`

export const MenuItemStyled = styled.div`
  color: black;
  font-size: 12px;
`

export const CurrentMenuButton = styled.button`
  background-color: white;
  border: 0.3px solid #3f51b5;
  margin: 0 21px;
  padding: 5px 13px;
  font-size: 20px;
`

export const PageNavWrapperStyled = styled.div``

export const PageTitle = styled.span`
  font-size: 1.2rem;
`
