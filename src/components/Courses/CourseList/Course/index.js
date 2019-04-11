import React, { Component } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

import {
  ElementWrapper,
  TitleSpan,
  LabelElement,
  DescriptionSpan,
  ButtonWrapper,
  SignInButton
} from "../../style.js";

class Course extends Component {
  render() {
    const { course, getParams, deleteItem, index } = this.props;
    return (
      <Draggable
        key={course.courseIndex}
        draggableId={`draggableId-course-${course.courseIndex}`}
        index={index}
      >
        {provided => (
          <ElementWrapper
            ref={provided.innerRef}

            {...provided.draggableProps}
            {...provided.dragHandleProps}

            key={course.courseIndex}
          >
              <LabelElement>Name of course :</LabelElement>
              <TitleSpan> {course.title}</TitleSpan>
              <LabelElement>Description of course : </LabelElement>
              <DescriptionSpan>{course.description}</DescriptionSpan>
              <ButtonWrapper>
                <SignInButton
                  onClick={() =>
                    getParams(
                      course.courseIndex,
                      course.title,
                      course.description
                    )
                  }
                >
                  CHANGE COURSE
                </SignInButton>
                <SignInButton onClick={() => deleteItem(course.courseIndex)}>
                  DELETE COURSE
                </SignInButton>
              </ButtonWrapper>
            </ElementWrapper>
        )}
      </Draggable>
    );
  }
}

Course.defaultProps = {
  course: [],
  loading: false,
  error: false,

  getParams() {},
  deleteItem() {}
};

Course.propTypes = {
  course: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,

  getParams: PropTypes.func,
  deleteItem: PropTypes.func
};

export default Course;
