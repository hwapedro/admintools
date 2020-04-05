import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

import { SmartContainer } from "../../../Shared/SmartContainer";
import { HashTagsContainer } from "../../../Shared/SmartContainer/HashTagsContainer";
import Button from "../../../Shared/Button";

import {
  ButtonWrapper,
  ElementWrapper,
} from "../../../GlobalStyles/styleGlobal";

export default function Course({
  course,
  getParams,
  deleteItem,
  index,
  goTo,
  activeLanguage,
}) {
  return (
    <Draggable
      key={course.courseIndex}
      draggableId={`draggableId-course-${course.courseIndex}`}
      index={index}
    >
      {(provided) => (
        <ElementWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          key={course.courseIndex}
        >
          <div style={{ position: "relative" }}>
            <SmartContainer
              name="Course"
              title={course.title[activeLanguage.value]}
              annotation={course.annotation[activeLanguage.value]}
              description={course.description[activeLanguage.value]}
            />
            <HashTagsContainer course={course.courseIndex} />
            <ButtonWrapper>
              <Button buttonStyle={"outlined"} onClick={() => goTo(course._id)}>
                GO TO
              </Button>
              <Button
                buttonStyle={"outlined"}
                onClick={() =>
                  getParams(
                    course.courseIndex,
                    course.title,
                    course.annotation,
                    course.description
                  )
                }
              >
                CHANGE COURSE
              </Button>

              <Button
                buttonStyle={"outlined"}
                onClick={() => {
                  if (window.confirm("ARE YOU SURE ?")) {
                    deleteItem(course._id);
                  }
                }}
              >
                DELETE COURSE
              </Button>
            </ButtonWrapper>
          </div>
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
  deleteItem() {},
};

Course.propTypes = {
  course: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,

  getParams: PropTypes.func,
  deleteItem: PropTypes.func,
};
