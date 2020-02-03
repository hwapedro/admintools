import React from "react";
import PropTypes from "prop-types";
import Button from "../../../Shared/Button";

import { ElementWrapper } from "../../styleLocal.js";

import { ButtonWrapper } from "../../../GlobalStyles/styleGlobal";

import LessonContainer from "./LessonContainer";
import { SmartContainer } from "../../../Shared/SmartContainer";

export default function Lesson({
  lesson,
  deleteItem,
  index,
  goTo,
  course,
  activeLanguage
}) {
  if (!course) {
    return (
      <ElementWrapper key={lesson._id}>
        <SmartContainer
          name="Lesson"
          title={lesson.title[activeLanguage.value]}
          description={lesson.description[activeLanguage.value]}
          exam={lesson.exam}
          courseIndex={lesson.courseIndex}
        />
        <ButtonWrapper>
          <Button buttonStyle={"outlined"} onClick={() => goTo(lesson._id)}>
            CHANGE Lesson
          </Button>
          <Button
            buttonStyle={"outlined"}
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
        <SmartContainer
          name="Lesson"
          title={lesson.title[activeLanguage.value]}
          description={lesson.description[activeLanguage.value]}
          exam={lesson.exam}
        />
        <ButtonWrapper>
          <Button buttonStyle={"outlined"} onClick={() => goTo(lesson._id)}>
            CHANGE Lesson
          </Button>
          <Button
            buttonStyle={"outlined"}
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
  lesson: {},
  course: null,
  index: null,

  goTo() {},
  deleteItem() {}
};

Lesson.propTypes = {
  lesson: PropTypes.object,
  course: PropTypes.object,
  index: PropTypes.number,

  goTo: PropTypes.func,
  deleteItem: PropTypes.func
};
