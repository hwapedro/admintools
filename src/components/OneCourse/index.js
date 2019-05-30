import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";

import {
  changeElement,
  getAllElements,
  deletElement,
  getCourse
} from "../../store/actions";

import { changeDndLesson, addLesson } from "../../store/actions/actionLessons";

import LessonList from "../Lessons/LessonList";

class OneCourse extends Component {
  componentDidMount() {
    const { getCourse } = this.props;
    getCourse(this.props.itemId);
  }

  render() {
    const {
      changeLesson,
      course,
      delLesson,
      changeDndLesson
    } = this.props;

    return (
      <DragDropContext
        onDragEnd={result => {
          if (!result.destination) {
            return;
          }

          if (result.source.index !== result.destination.index) {
            changeDndLesson(
              course.lessons[result.source.index].lessonIndex,
              course.lessons[result.destination.index].lessonIndex,
              course.courseIndex
            );
          }
        }}
      >
        <LessonList
          changeLesson={(lessonsIndex, title, description, name) =>
            changeLesson(lessonsIndex, title, description, name)
          }
          delLesson={(lessonsIndex, name) => delLesson(lessonsIndex, name)}
          lessons={course.lessons}
          search= {""}
        />
      </DragDropContext>
    );
  }
}

OneCourse.defaultProps = {
  course: {},
  loading: false,
  error: false,

  addLesson() {},
  delLesson() {},
  getAllLessons() {},
  changeLesson() {}
};

OneCourse.propTypes = {
  course: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,

  addCourses: PropTypes.func,
  delLesson: PropTypes.func,
  getAllLessons: PropTypes.func,
  changeLesson: PropTypes.func
};

const mapStateToProps = state => ({
  course: state.Courses.course,
  loading: state.Courses.loading,
  error: state.Courses.error
});

const mapDispatchToProps = dispatch => ({
  addLesson: (title, description, exam, name) =>
    dispatch(addLesson(title, description, exam, name)),

  delLesson: (lessonsIndex, name) => dispatch(deletElement(lessonsIndex, name)),

  getAllLessons: name => dispatch(getAllElements(name)),

  changeLesson: (lessonsIndex, title, description, name) =>
    dispatch(changeElement(lessonsIndex, title, description, name)),

  changeDndLesson: (id1, id2, courseIndex) =>
    dispatch(changeDndLesson(id1, id2, courseIndex)),

  getCourse: id => dispatch(getCourse(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OneCourse);

export const Wrapper = styled.div``;

const SearchInput = styled.input`
  padding-left: 0.5rem;
  width: 48.7rem;
  height: 40px;
  border: 0.6px solid black;
  border-radius: 1rem;
  outline: none;
`;
