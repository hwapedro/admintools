import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeCourse,
  getAllCourses,
  addCourses,
  delCourse
} from "../../store/actions";

import Menu from "../Menu";
import SetCourse from "../Courses/SetCourse";
import CoursesList from "../Courses/CoursesList";

class Courses extends Component {
  componentWillMount() {
    const { getAllCourses } = this.props;
    let token = localStorage.getItem("userId");
    getAllCourses(token);
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
      return <div>loading...</div>;
    }
    return (
      <>
      <Menu />
        <SetCourse
          addCourses={(title, description, token) =>
            addCourses(title, description, token)
          }
          getAllCourses={token => getAllCourses(token)}
        />
        <CoursesList
          changeCourse={(courseIndex,title, description, token) =>
            changeCourse(courseIndex,title, description, token)
          }
          delCourse={(courseIndex,token) => delCourse(courseIndex,token)}
          courses={courses}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.courses,
  loading: state.loading,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  addCourses: (title, description, token) =>
    dispatch(addCourses(title, description, token)),

  delCourse: (courseIndex,token) => dispatch(delCourse(courseIndex,token)),

  getAllCourses: token => dispatch(getAllCourses(token)),

  changeCourse: (courseIndex,title, description, token) =>
    dispatch(changeCourse(courseIndex,title, description, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses);
