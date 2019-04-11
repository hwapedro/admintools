import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  changeElement,
  getAllElements,
  addLesson,
  deletElement
} from "../../store/actions";

import SetLesson from "../Lessons/SetLesson";
import LessonList from "../Lessons/LessonList";
import Spinner from "../Spinner";

const name = "lesson";

class Lessons extends Component {
  componentDidMount() {
    const { getAllLessons } = this.props;
    let token = localStorage.getItem("userId");
    getAllLessons(token, name);
  }

  render() {
    const { loading, lessons, changeLesson, addLesson, delLesson } = this.props;
    // if (loading) {
    //   return (
    //     <>
    //       <Spinner />
    //     </>
    //   );
    // }
    return (
      <>
        <SetLesson
          addLesson={(title, description, exam, token, name) =>
            addLesson(title, description, exam, token, name)
          }
        />
        <LessonList
          changeLesson={(lessonsIndex, title, description, token, name) =>
            changeLesson(lessonsIndex, title, description, token, name)
          }
          delLesson={(lessonsIndex, token, name) =>
            delLesson(lessonsIndex, token, name)
          }
          lessons={lessons}
        />
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
  getAllLessons() {},
  changeLesson() {}
};

Lessons.propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,

  addCoursest: PropTypes.func,
  delLesson: PropTypes.func,
  getAllLessons: PropTypes.func,
  changeLesson: PropTypes.func
};

const mapStateToProps = state => ({
  lessons: state.reducerLessons.lessons,
  loading: state.reducerLessons.loading,
  error: state.reducerLessons.error
});

const mapDispatchToProps = dispatch => ({
  addLesson: (title, description, exam, token, name) =>
    dispatch(addLesson(title, description, exam, token, name)),

  delLesson: (lessonsIndex, token, name) =>
    dispatch(deletElement(lessonsIndex, token, name)),

  getAllLessons: (token, name) => dispatch(getAllElements(token, name)),

  changeLesson: (lessonsIndex, title, description, token, name) =>
    dispatch(changeElement(lessonsIndex, title, description, token, name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lessons);
