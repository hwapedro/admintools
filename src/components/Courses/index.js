import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeCourse,
  deleteCourse,
  getAllCourses,
  addCourses
} from "../../actions";

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
      newCourse,
      addCourses,
      getAllCourses
    } = this.props;
    if (loading) {
      return <div>loading...</div>;
    }
    return (
      <>
        <SetCourse
          addCourses={(title, description, token) =>
            addCourses(title, description, token)
          }
          getAllCourses={token => getAllCourses(token)}
        />
        <CoursesList
          changeCourse={(id, title, description) =>
            changeCourse(id, title, description)
          }
          deleteCourse={id => this.props.deleteCourse(id)}
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

  deleteCourse: id => dispatch(deleteCourse(id)),

  changeCourse: (id, title, description) =>
    dispatch(changeCourse(id, title, description)),

  getAllCourses: token => dispatch(getAllCourses(token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses);
