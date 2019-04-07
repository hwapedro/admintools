import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import update from "immutability-helper";

import Course from "./Course";
import Card from "./Card.jsx";
import { from } from "rxjs";

const token = localStorage.getItem("userId");
const name = "course";

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
    const { changeCourse } = this.props;
    if (title && description)
      changeCourse(
        this.state.courseIndex,
        this.state.title,
        this.state.description,
        token,
        name
      );
    this.setState({ changeFlag: false, courseIndex: null });
  };

  deleteItem = courseIndex => {
    const { delCourse } = this.props;
    delCourse(courseIndex, token, name);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  moveCard = (dragIndex, hoverIndex) => {
    const { courses } = this.props;

    this.props.changeDnD(dragIndex, hoverIndex);
  };

  render() {
    const { courses } = this.props;

    let list = courses.map((course, index) => {
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
          
            <Course
              course={course}
              index = {index}
              getParams={this.getParams}
              deleteItem={this.deleteItem}
            />

          // <Card
          //   key={course.courseIndex}
          //   index={index}
          //   id={course.courseIndex}
          //   text={course.title}
          //   moveCard={this.moveCard}

          //   Wrap={
          //     <Course
          //       course={course}
          //       getParams={this.getParams}
          //       deleteItem={this.deleteItem}
          //     />
          //   }
          // />
        );
      }
    });

    return (
      <Wrapper>
        <Droppable droppableId="droppable">
          {provided => (
            <ElementsWrapper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            >
              {list}
              {provided.placeholder}
            </ElementsWrapper>
          )}
        </Droppable>
      </Wrapper>
    );
  }
}

export default CourseList;

CourseList.defaultProps = {
  courses: [],
  loading: false,
  error: false,
  delCourse() {},
  changeLesson() {}
};

CourseList.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,

  delCourse: PropTypes.func,
  changeLesson: PropTypes.func
};

const Wrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// const TitleSpan = styled.span`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   margin: 1rem 0;
//   font-size: 1.3rem;
// `;

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
`;

// const DescriptionSpan = styled.span`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   margin: 1rem 0;
//   font-size: 1.3rem;
// `;

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
  margin: 0;
  list-style-type: none;
  width: 1000px;
`;

const ElementWrapper = styled.li`
  background-color: ${props => props.theme.courses};
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
  border: 0;
  border-radius: 10px;
  background-color: ${props => props.theme.button};
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
  //
`;
