import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getAllElements } from "../../store/actions";
import { changeDndLesson } from "../../store/actions/actionLessons";
import { addLesson, deleteLesson } from "../../store/actions/actionLessons";

//import Search from "../Search";
import LessonConstructor from "./LessonConstructor";
import LessonList from "./LessonList/LessonList";
import Spinner from "../Spinner";
import Error from "../Error";

const name = "lesson";

export default class Lessons extends Component {
  state = {
    search: ""
  };

  componentDidMount() {
    const { getAllLessons } = this.props;
    getAllLessons(name);
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { error, loading, lessons, addLesson, delLesson } = this.props;
    const { search } = this.state;
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
              onChange={this.onChange}
              value={search}
            />
            <LessonList
              onChange={this.onChange}
              delLesson={(lessonsIndex, name, flag) =>
                delLesson(lessonsIndex, name, flag)
              }
              lessons={lessons}
              search={search}
            />
          </>
        )}
      </>
    );
  }
}

Lessons.defaultProps = {
  lessons: [],
  loading: false,
  error: false,
  addLesson() {},
  delLesson() {},
  getAllLessons() {}
};

Lessons.propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,

  addCoursest: PropTypes.func,
  delLesson: PropTypes.func,
  getAllLessons: PropTypes.func
};
