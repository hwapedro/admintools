import React, { Component } from "react";
import styled from "styled-components";


const token = localStorage.getItem("userId");

class CourseList extends Component {
  state = {
    title: "",
    description: "",
    changeFlag: false,
    courseIndex: null
  };

  getParams = (courseIndex, title, description) => {
    this.setState({
      changeFlag: true,
      courseIndex: courseIndex,
      title: title,
      description: description
    });
  };

  setParams = event => {
    event.preventDefault();
    const { title, description } = this.state;
    if (title && description)
      this.props.changeCourse(
        this.state.courseIndex,
        this.state.title,
        this.state.description,
        token
      );
    this.setState({ changeFlag: false, courseIndex: null });
  };

  deleteItem = courseIndex => {
    this.props.delCourse(courseIndex, token);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    let list = this.props.courses.map(course => {
      if (
        this.state.changeFlag &&
        course.courseIndex === this.state.courseIndex
      ) {
        return (
          <ElementWrapper key={course.courseIndex}>
            <form onSubmit={this.setParams}>
              <LabelElement>Name of course :</LabelElement>
              <TitleInput
                name="title"
                onChange={this.onChange}
                value={this.state.title}
              />
              <LabelElement>Description of course : </LabelElement>
              <DescriptionTextArea
                name="description"
                onChange={this.onChange}
                value={this.state.description}
              />

              <ButtonWrapper>
                <SignInButton type="submit">CONFIRM</SignInButton>
              </ButtonWrapper>
            </form>
          </ElementWrapper>
        );
      } else {
        return (
          <ElementWrapper key={course.courseIndex}>
            <LabelElement>Name of course :</LabelElement>
            <TitleSpan> {course.title}</TitleSpan>
            <LabelElement>Description of course : </LabelElement>
            <DescriptionSpan>{course.description}</DescriptionSpan>
            <ButtonWrapper>
              <SignInButton
                onClick={() =>
                  this.getParams(
                    course.courseIndex,
                    course.title,
                    course.description
                  )
                }
              >
                CHANGE COURSE
              </SignInButton>
              <SignInButton onClick={() => this.deleteItem(course.courseIndex)}>
                DELETE COURSE
              </SignInButton>
            </ButtonWrapper>
          </ElementWrapper>
        );
      }
    });
    return (
      <Wrapper>
        <ElementsWrapper>{list}</ElementsWrapper>
      </Wrapper>
    );
  }
}

export default CourseList;

const Wrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleSpan = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
  color: white;
`;

const TitleInput = styled.input`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
  color: black;
`;

const LabelElement = styled.span`
  margin-top: 2rem;
  font-weight: 900;
  font-size: 1.8rem;
  color: white;
`;

const DescriptionSpan = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 2rem;
  font-size: 1.3rem;
  color: white;
`;

const DescriptionTextArea = styled.textarea`
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

const ElementsWrapper = styled.ul`
  list-style-type: none;
  width: 1000px;
`;

const ElementWrapper = styled.li`
  margin-top: 2rem;
  border: 1px solid white;
  border-radius: 20px;
  padding: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 0.5rem;
`;
export const SignInButton = styled.button`
  width: 150px;
  height: 40px;
  border: 1px solid #ffffff;
  border-radius: 10px;
  background-color: #212121;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #ffffff;
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
    cursor: pointer;
  }
  margin-right: 1rem;
`;
