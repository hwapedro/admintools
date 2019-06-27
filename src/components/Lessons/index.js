import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";

import { getAllElements, deletElement } from "../../store/actions";

import { changeDndLesson } from "../../store/actions/actionLessons";

import { addLesson } from "../../store/actions/actionLessons";

//import Search from "../Search";
import SetLesson from "../Lessons/SetLesson";
import LessonList from "./LessonList/LessonList";

const name = "lesson";

class Lessons extends Component {
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
    const {
      loading,
      lessons,
      addLesson,
      delLesson,
      changeDndLesson
    } = this.props;
    const { search } = this.state;
    return (
      <>
        <SetLesson
          addLesson={(title, description, exam, name, courseIndex) =>
            addLesson(title, description, exam, name, courseIndex)
          }
          onChange={this.onChange}
          value={search}
        />
        <LessonList
          onChange={this.onChange}
          delLesson={(lessonsIndex, name) => delLesson(lessonsIndex, name)}
          lessons={lessons}
          search={search}
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

const mapStateToProps = state => ({
  lessons: state.Lessons.lessons,
  loading: state.Lessons.loading,
  error: state.Lessons.error
});

const mapDispatchToProps = dispatch => ({
  addLesson: (title, description, exam, name, courseIndex) =>
    dispatch(addLesson(title, description, exam, name, courseIndex)),

  delLesson: (lessonsIndex, name) => dispatch(deletElement(lessonsIndex, name)),

  getAllLessons: name => dispatch(getAllElements(name)),

  changeDndLesson: (id1, id2, courseIndex) =>
    dispatch(changeDndLesson(id1, id2, courseIndex))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lessons);
