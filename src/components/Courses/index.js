import React, { Component } from "react";
import { connect } from "react-redux";
import { newCourse, changeCourse, deleteCourse } from "../../actions";

import SetCourse from "../Courses/SetCourse";
import CoursesList from "../Courses/CoursesList";

class Courses extends Component {
  render() {
    return (
      <>
        <SetCourse
          newCourse={(title, description) =>
            this.props.newCourse(title, description)
          }
        />
        <CoursesList
          changeCourse={(id, title, description) =>
            this.props.changeCourse(id, title, description)
          }
          deleteCourse={id => this.props.deleteCourse(id)}
          courses={this.props.courses}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.courses
});

const mapDispatchToProps = dispatch => ({
  newCourse: (title, description) => dispatch(newCourse(title, description)),
  deleteCourse: id => dispatch(deleteCourse(id)),
  changeCourse: (id, title, description) =>
    dispatch(changeCourse(id, title, description))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses);
