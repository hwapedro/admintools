import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";

import CourseConstructor from "./CourseConstructor";
import CoursesList from "./CourseList/";
import Spinner from "../Spinner";
import Error from "../Error";

const name = "course";

export default class Courses extends Component {
  state = {
    title: "",
    search: "",
    constructor: false
  };

  componentDidMount() {
    const { getAllCourses } = this.props;
    getAllCourses(name);
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  showConstructor = () => {
    const { constructor } = this.state;

    this.setState({
      constructor: !constructor,
      title: ""
    });
  };

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

    const { title, search, constructor } = this.state;

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
                onChange={this.onChange}
                value={search}
                title={title}
                constructor={constructor}
                showConstructor={() => this.showConstructor()}
              />

              <CoursesList
                changeCourse={(courseIndex, title, description, name) =>
                  changeCourse(courseIndex, title, description, name)
                }
                delCourse={(courseIndex, name) => delCourse(courseIndex, name)}
                courses={courses}
                search={this.state.search}
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

