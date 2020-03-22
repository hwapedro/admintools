import React, { Component } from "react";

import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";

import { ElementsWrapper } from "../styleLocal";
import { Wrapper, EmptyMessage } from "../../GlobalStyles/styleGlobal";

import Lesson from "./Lesson";

const name = "lesson";

class LessonsList extends Component {
  state = {
    title: "",
    description: "",
    _id: null
  };

  deleteItem = _id => {
    const { delLesson, course } = this.props;
    const flag = course ? "course" : name;
    delLesson(_id, flag);
  };

  goTo = id => {
    this.props.setLoading(true);
    this.props.history.push(`/lesson/${id}`);
  };

  render() {
    const {
      lessons,
      search,
      course,
      changeDndLesson,
      activeLanguage
    } = this.props;

    let list = lessons
      .filter(lesson => {
        if (
          lesson.title[activeLanguage.value]
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1
        ) {
          return true;
        }
        return false;
      })
      .map((lesson, index) => {
        return (
          <Lesson
            key={lesson._id}
            lesson={lesson}
            index={index}
            deleteItem={this.deleteItem}
            goTo={this.goTo}
            course={course}
            activeLanguage={activeLanguage}
          />
        );
      });

    return (
      <DragDropContext
        onDragEnd={result => {
          if (!result.destination) {
            return;
          }
          if (result.source.index !== result.destination.index) {
            changeDndLesson(
              lessons[result.source.index].lessonIndex,
              lessons[result.destination.index].lessonIndex,
              course.courseIndex
            );
          }
        }}
      >
        <Wrapper>
          {lessons.length === 0 || list.length === 0 ? (
            <EmptyMessage>There is nothing here yet</EmptyMessage>
          ) : (
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
          )}
        </Wrapper>
      </DragDropContext>
    );
  }
}

export default withRouter(LessonsList);

LessonsList.defaultProps = {
  lessons: [],
  loading: false,
  error: false,
  course: null,

  delLesson() {}
};

LessonsList.propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  course: PropTypes.object,

  delLesson: PropTypes.func
};
