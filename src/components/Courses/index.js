import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import {
  changeElement,
  getAllElements,
  addElement,
  deletElement
} from "../../store/actions";

import Menu from "../Menu";
import SetCourse from "../Courses/SetCourse";
import CoursesList from "../Courses/CoursesList";
import Spinner from "../Spinner";

const name = 'course'

class Courses extends Component {
  componentDidMount() {
    const { getAllCourses } = this.props;
    let token = localStorage.getItem("userId");
    getAllCourses(token,name);
  }

  
  render() {
    const {
      loading,
      courses,
      changeCourse,
      addCourses,
      getAllCourses,
      delCourse
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
        <Menu />

        <SetCourse
          addCourses={(title, description, token, name) =>
            addCourses(title, description, token, name)
          }
          getAllCourses={(token, name) => getAllCourses(token, name)}
        />

        <CoursesList
          changeCourse={(courseIndex, title, description, token, name) =>
            changeCourse(courseIndex, title, description, token, name)
          }
          delCourse={(courseIndex, token, name) => delCourse(courseIndex, token, name)}
          courses={courses}
        />

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
}

Courses.propTypes = {
  courses:  PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,

  addCourses: PropTypes.func,
  delCourse: PropTypes.func,
  getAllCourses: PropTypes.func,
  changeCourse: PropTypes.func,
}

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
    dispatch(changeElement(courseIndex, title, description, token, name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses);
