import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";

import { changeDndLesson } from "../../../store/actions/actionLessons";

import Lesson from "./Lesson";

const name = "lesson";

class LessonsList extends Component {
  state = {
    title: "",
    description: "",
    _id: null
  };

  deleteItem = _id => {
    const { delLesson } = this.props;
    delLesson(_id, name);
  };

  goTo = id => {
    this.props.history.push(`/lesson/${id}`);
  };

  render() {
    const { lessons, search, course } = this.props;
    let list = lessons
      .filter(lesson => {
        if (lesson.title.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
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
              lessons[result.source.index].courseIndex
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
`;

const DescriptionSpan = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
`;

// const DescriptionTextArea = styled.textarea`
//   display: flex;
//   justify-content: flex-start;
//   width: 100%;
//   height: 400px;
//   max-height: 100%;
//   max-width: 100%;
//   resize: none;
//   align-items: center;
//   margin-top: 2rem;
//   font-size: 1.3rem;
//   color: black;
// `;
const EmptyMessage = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 2.5rem;
  top: 50%;
  margin-top: 270px;
`;

const ElementsWrapper = styled.ul`
  list-style-type: none;
  width: 1000px;
  margin: 0;
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
`;

export const ImgMark = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 1rem;
  margin-bottom: -0.4rem;
`;

export const ImgCross = styled.img`
  width: 2rem;
  height: 2rem;
  margin-left: 1rem;
  margin-bottom: -0.4rem;
`;
