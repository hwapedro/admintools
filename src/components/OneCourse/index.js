import React, { Component } from "react";
import PropTypes from "prop-types";
// import { DragDropContext } from "react-beautiful-dnd";


import LessonList from "../Lessons/LessonList/LessonList";
import LessonConstructor from "../Lessons/LessonConstructor";
import Spinner from "../Spinner";
import Error from "../Error";

import {OneCourseTitle,CourseTitle} from './styleLocal'
const name = "course";
export default class OneCourse extends Component {
  state = {
    search: ""
  };

  componentDidMount() {
    const { getCourse } = this.props;
    getCourse(this.props.itemId);
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      addLesson,
      course,
      delLesson,
      changeDndLesson,
      error,
      loading
    } = this.props;
    const { search } = this.state;

    return (
      <>
        {error && (
          <>
            <Error name={name} />
          </>
        )}

        {loading && (
          <>
            <Spinner />
          </>
        )}
        {!error && !loading && (
          <>
            <LessonConstructor
              addLesson={(title, description, exam, name, courseIndex, flag) =>
                addLesson(title, description, exam, name, courseIndex, flag)
              }
              onChange={this.onChange}
              value={search}
              course={course}
            />
            <CourseTitle>
            <OneCourseTitle>
              Name : {course.title}<br /> Number : {course.courseIndex}
              </OneCourseTitle></CourseTitle>
            <LessonList
              delLesson={(lessonsIndex, name, flag) =>
                delLesson(lessonsIndex, name, flag)
              }
              lessons={course.lessons}
              search={search}
              course={course}
              changeDndLesson={changeDndLesson}
            />
          </>
        )}
      </>
    );
  }
}

OneCourse.defaultProps = {
  course: {},
  loading: false,
  error: false,

  addLesson() {},
  delLesson() {},
  getAllLessons() {}
};

OneCourse.propTypes = {
  course: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,

  addCourses: PropTypes.func,
  delLesson: PropTypes.func,
  getAllLessons: PropTypes.func
};

