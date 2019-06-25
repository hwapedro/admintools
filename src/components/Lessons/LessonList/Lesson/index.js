import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

import {
  ElementWrapper,
  TitleSpan,
  LabelElement,
  DescriptionSpan,
  ButtonWrapper,
  LessonButton,
  ImgMark,
  ImgCross
} from "../../style.js";

import checkMark from "../../../../img/good.png";
import redCross from "../../../../img/bad.png";

export default function Lesson({ lesson, deleteItem, index, goTo }) {
  return (
    <Draggable
      key={lesson._id}
      draggableId={`draggableId-lesson-${lesson._id}`}
      index={index}
    >
      {provided => (
        <ElementWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          key={lesson._id}
        >
          <LabelElement>Name of Lesson :</LabelElement>
          <TitleSpan> {lesson.title}</TitleSpan>
          <LabelElement>Description of Lesson : </LabelElement>
          <DescriptionSpan
            dangerouslySetInnerHTML={{
              __html: lesson.description
            }}
          />
          <LabelElement>EXAM :</LabelElement>
          {lesson.exam ? (
            <ImgMark src={checkMark} />
          ) : (
            <ImgCross src={redCross} />
          )}
          <br />
          <LabelElement>Course Index :</LabelElement>
          <TitleSpan> {lesson.courseIndex}</TitleSpan>
          <ButtonWrapper>
            <LessonButton onClick={() => goTo(lesson._id)}>
              CHANGE Lesson
            </LessonButton>
            <LessonButton
              onClick={() => {
                if (window.confirm("Delete the item?")) {
                  deleteItem(lesson._id);
                }
              }}
            >
              DELETE Lesson
            </LessonButton>
          </ButtonWrapper>
        </ElementWrapper>
      )}
    </Draggable>
  );
}

Lesson.defaultProps = {
  lesson: [],
  loading: false,
  error: false,

  getParams() {},
  deleteItem() {}
};

Lesson.propTypes = {
  lesson: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,

  goTo: PropTypes.func,
  deleteItem: PropTypes.func
};
