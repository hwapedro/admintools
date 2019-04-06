import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  CourseChange,
  getAllElements,
  addElement,
  deletElement,
  changeDnD
} from "../../store/actions";

import Menu from "../Menu";
import SetCourse from "../Courses/SetCourse";
import CoursesList from "./CourseList/";
import Spinner from "../Spinner";
import Error from "../Error";

const name = "course";

class Courses extends Component {
  componentDidMount() {
    const { getAllCourses } = this.props;
    let token = localStorage.getItem("userId");
    getAllCourses(token, name);
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

    if (loading) {
      return (
        <>
          <Menu />
          <Spinner />
        </>
      );
    }
    return (
      <>
        {error && (
          <>
            <Menu />
            <Error />
          </>
        )}

        {loading ? (
          <>
            <Menu />
            <Spinner />
          </>
        ) : null}
        
        {!error && (
          <>
            <Menu />

            <SetCourse
              addCourses={(title, description, token, name) =>
                addCourses(title, description, token, name)
              }
              getAllCourses={(token, name) => getAllCourses(token, name)}
            />

            <CoursesList
              changeDnD={(id1, id2) => changeDnD(id1, id2)}
              changeCourse={(courseIndex, title, description, token, name) =>
                changeCourse(courseIndex, title, description, token, name)
              }
              delCourse={(courseIndex, token, name) =>
                delCourse(courseIndex, token, name)
              }
              courses={courses}
            />
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
  courses: state.courses,
  loading: state.loading,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  addCourses: (title, description, token, name) =>
    dispatch(addElement(title, description, token, name)),

  delCourse: (courseIndex, token, name) =>
    dispatch(deletElement(courseIndex, token, name)),

  getAllCourses: (token, name) => dispatch(getAllElements(token, name)),

  changeCourse: (courseIndex, title, description, token, name) =>
    dispatch(CourseChange(courseIndex, title, description, token, name)),
   
    changeDnD: (id1, id2) => dispatch(changeDnD(id1, id2)) 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses);
