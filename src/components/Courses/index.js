import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";

import {
  changeElement,
  getAllElements,
  addElement,
  deletElement,
  changeDnD
} from "../../store/actions";

import CourseConstructor from "./CourseConstructor";
import CoursesList from "./CourseList/";
import Spinner from "../Spinner";
import Error from "../Error";

const name = "course";

class Courses extends Component {
  componentDidMount() {
    const { getAllCourses } = this.props;
    getAllCourses(name);
  }

  render() {
    const {
      loading,
      error,
      courses,
      changeCourse,
      addCourses,
      getAllCourses,
      delCourse,
      changeDnD
    } = this.props;

    return (
      <>
        {error && (
          <>
            <Error name={name} />
          </>
        )}

        {loading ? (
          <>
            <Spinner />
          </>
        ) : null}

        {!error && !loading && (
          <>
            <DragDropContext
              onDragEnd={result => {
                if (!result.destination) {
                  return;
                }

                if (result.source.index !== result.destination.index) {
                  changeDnD(
                    courses[result.source.index].courseIndex,
                    courses[result.destination.index].courseIndex
                  );
                }
              }}
            >
              <CourseConstructor
                addCourses={(title, description, name) =>
                  addCourses(title, description, name)
                }
                getAllCourses={name => getAllCourses(name)}
              />

              <CoursesList
                changeCourse={(courseIndex, title, description, name) =>
                  changeCourse(courseIndex, title, description, name)
                }
                delCourse={(courseIndex, name) => delCourse(courseIndex, name)}
                courses={courses}
              />
            </DragDropContext>
          </>
        )}
      </>
    );
  }
}

Courses.defaultProps = {
  courses: [],
  loading: false,
  error: false,

  addCourses() {},
  delCourse() {},
  getAllCourses() {},
  changeCourse() {}
};

Courses.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,

  addCourses: PropTypes.func,
  delCourse: PropTypes.func,
  getAllCourses: PropTypes.func,
  changeCourse: PropTypes.func
};

const mapStateToProps = state => ({
  courses: state.Courses.courses,
  loading: state.Courses.loading,
  error: state.Courses.error
});

const mapDispatchToProps = dispatch => ({
  addCourses: (title, description, name) =>
    dispatch(addElement(title, description, name)),

  delCourse: (courseIndex, name) => dispatch(deletElement(courseIndex, name)),

  getAllCourses: name => dispatch(getAllElements(name)),

  changeCourse: (courseIndex, title, description, name) =>
    dispatch(changeElement(courseIndex, title, description, name)),

  changeDnD: (id1, id2) => dispatch(changeDnD(id1, id2))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses);
