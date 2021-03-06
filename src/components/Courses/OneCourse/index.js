import React, { Component } from "react";
import PropTypes from "prop-types";
// import { DragDropContext } from "react-beautiful-dnd";

import LessonList from "../../Lessons/LessonList/LessonList";
import LessonConstructor from "../../Lessons/LessonConstructor";
import Spinner from "../../Spinner";
import Error from "../../Error";

import { OneCourseTitle, CourseTitle } from "./styleLocal";
const name = "course";

export default class OneCourse extends Component {
  state = {
    search: "",
    activeLanguage: { label: "Russian", value: "ru" },
  };

  componentDidMount() {
    const { getCourse } = this.props;
    getCourse(this.props.itemId);
  }

  //language selector handler
  handleLangChange = (activeLanguage) => {
    this.setState({ activeLanguage });
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      addLesson,
      course,
      lessons,
      delLesson,
      changeDndLesson,
      error,
      loading,
      setLoading,
    } = this.props;

    const { search, activeLanguage } = this.state;
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
              handleLangChange={(activeLanguage) =>
                this.handleLangChange(activeLanguage)
              }
              onChange={this.onChange}
              value={search}
              activeLanguage={activeLanguage}
              course={course}
            />
            <CourseTitle>
              <OneCourseTitle>
                {course.title[activeLanguage.value]}
              </OneCourseTitle>
              <div>course index {course.courseIndex}</div>
            </CourseTitle>
            <LessonList
              delLesson={(lessonsIndex, name, flag) =>
                delLesson(lessonsIndex, name, flag)
              }
              setLoading={(loading) => setLoading(loading)}
              lessons={lessons}
              search={search}
              course={course}
              changeDndLesson={changeDndLesson}
              activeLanguage={activeLanguage}
            />
          </>
        )}
      </>
    );
  }
}

OneCourse.defaultProps = {
  course: {},
  lessons: [],
  loading: false,
  error: false,

  addLesson() {},
  delLesson() {},
  getAllLessons() {},
};

OneCourse.propTypes = {
  course: PropTypes.object,
  lessons: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.bool,

  addCourses: PropTypes.func,
  delLesson: PropTypes.func,
  getAllLessons: PropTypes.func,
};
