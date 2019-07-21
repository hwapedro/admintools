import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import Button from "../../../Button";

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

import LessonContainer from "./LessonContainer";

import checkMark from "../../../../img/good.png";
import redCross from "../../../../img/bad.png";

export default function Lesson({ lesson, deleteItem, index, goTo, course }) {
  if (!course) {
    return (
      <ElementWrapper key={lesson._id}>
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
          <Button style={"outlined"} onClick={() => goTo(lesson._id)}>
            CHANGE Lesson
          </Button>
          <Button
            style={"outlined"}
            onClick={() => {
              if (window.confirm("Delete the item?")) {
                deleteItem(lesson._id);
              }
            }}
          >
            DELETE Lesson
          </Button>
        </ButtonWrapper>
      </ElementWrapper>
    );
  } else {
    return (
      <LessonContainer lesson={lesson} index={index}>
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
        <ButtonWrapper>
          <Button style={"outlined"} onClick={() => goTo(lesson._id)}>
            CHANGE Lesson
          </Button>
          <Button
            style={"outlined"}
            onClick={() => {
              if (window.confirm("Delete the item?")) {
                deleteItem(lesson._id);
              }
            }}
          >
            DELETE Lesson
          </Button>
        </ButtonWrapper>
      </LessonContainer>
    );
  }
}

Lesson.defaultProps = {
  lesson: [],
  loading: false,
  error: false,
  course: null,

  getParams() {},
  deleteItem() {}
};

Lesson.propTypes = {
  lesson: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  course: PropTypes.object,

  goTo: PropTypes.func,
  deleteItem: PropTypes.func
};
