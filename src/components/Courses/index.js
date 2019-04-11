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

    return (
      <>
        {error && (
          <>
            <Error />
          </>
        )}

        {/* {loading ? (
          <>
            <Spinner />
          </>
        ) : null} */}

        {!error && !loading &&(
          <>
            <DragDropContext
              onDragEnd={result => {
                if (result.source.index !== result.destination.index) {
                  let token = localStorage.getItem("userId");
                  console.log(
                    courses[result.source.index].courseIndex,
                    courses[result.destination.index].courseIndex
                  );
                  changeDnD(
                    token,
                    courses[result.source.index].courseIndex,
                    courses[result.destination.index].courseIndex
                  )
                }
              }}
            >
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
  courses: state.reducerCourses.courses,
  loading: state.reducerCourses.loading,
  error: state.reducerCourses.error
});

const mapDispatchToProps = dispatch => ({
  addCourses: (title, description, token, name) =>
    dispatch(addElement(title, description, token, name)),

  delCourse: (courseIndex, token, name) =>
    dispatch(deletElement(courseIndex, token, name)),

  getAllCourses: (token, name) => dispatch(getAllElements(token, name)),

  changeCourse: (courseIndex, title, description, token, name) =>
    dispatch(changeElement(courseIndex, title, description, token, name)),

  changeDnD: (token, id1, id2) => dispatch(changeDnD(token, id1, id2))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses);
