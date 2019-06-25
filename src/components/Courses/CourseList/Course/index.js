import React from "react";
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



export default function Course({ course, getParams, deleteItem, index, goTo }) {
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
          <LabelElement>Course number :</LabelElement>
          <TitleSpan> {course.courseIndex}</TitleSpan>
          <LabelElement>Course name :</LabelElement>
          <TitleSpan> {course.title}</TitleSpan>
          <LabelElement>Course description : </LabelElement>
          <DescriptionSpan
            dangerouslySetInnerHTML={{
              __html: course.description
            }}
          />
          <ButtonWrapper>
            <SignInButton onClick={() => goTo(course._id)}>GO TO</SignInButton>
            <SignInButton
              onClick={() =>
                getParams(course.courseIndex, course.title, course.description)
              }
            >
              CHANGE COURSE
            </SignInButton>

            <SignInButton
              onClick={() => {
                if (window.confirm("ARE YOU SURE ?")) {
                  deleteItem(course._id);
                }
              }}
            >
              DELETE COURSE
            </SignInButton>
          </ButtonWrapper>
        </ElementWrapper>
      )}
    </Draggable>
  );
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
