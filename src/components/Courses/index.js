import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";

// import CourseConstructor from "./CourseConstructor";
// import CoursesList from "./CourseList/";
import CourseConstructorContainer from "../../containers/CoursesContainer/CourseConstructorContainer";
import CourseListContainer from "../../containers/CoursesContainer/CourseListContainer";
import Spinner from "../Spinner";
import Error from "../Error";

const name = "course";

export default class Courses extends Component {
  state = {
    search: "",
    activeLanguage: { label: "Russian", value: "ru" }
  };

  componentDidMount() {
    const { getAllCourses } = this.props;

    getAllCourses(name);
  }

  handleLangChange = activeLanguage => {
    this.setState({ activeLanguage });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      loading,
      error,
      courses,
      changeDnD
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
              <CourseConstructorContainer
                handleLangChange={activeLanguage =>
                  this.handleLangChange(activeLanguage)
                }
                onChange={this.onChange}
                value={search}
                activeLanguage={activeLanguage}
              />

              <CourseListContainer
                handleLangChange={activeLanguage =>
                  this.handleLangChange(activeLanguage)
                }
                search={search}
                activeLanguage={activeLanguage}
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
  changeCourse() {},
  changeDnD() {},
  setLoading() {}
};

Courses.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,

  addCourses: PropTypes.func,
  delCourse: PropTypes.func,
  getAllCourses: PropTypes.func,
  changeCourse: PropTypes.func,
  changeDnD: PropTypes.func,
  setLoading: PropTypes.func
};
