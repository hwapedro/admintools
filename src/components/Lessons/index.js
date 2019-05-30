import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";

import {
  changeElement,
  getAllElements,
  deletElement
} from "../../store/actions";

import { changeDndLesson } from "../../store/actions/actionLessons";

import { addLesson } from "../../store/actions/actionLessons";

import Search from "../Search";
import SetLesson from "../Lessons/SetLesson";
import LessonList from "../Lessons/LessonList";

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
      changeLesson,
      addLesson,
      delLesson,
      changeDndLesson
    } = this.props;
    const { search } = this.state;
    return (
      <>
        <DragDropContext
          onDragEnd={result => {
            if (!result.destination) {
              return;
            }

            if (result.source.index !== result.destination.index) {
              changeDndLesson(
                lessons[result.source.index].lessonIndex,
                lessons[result.destination.index].lessonIndex,
                lessons[result.source.index].courseIndex
              );
            }
          }}
        >
         
          <SetLesson
            addLesson={(title, description, exam, name) =>
              addLesson(title, description, exam, name)
            }
            onChange={this.onChange}
            value={search}
          />
          <LessonList
            changeLesson={(lessonsIndex, title, description, name) =>
              changeLesson(lessonsIndex, title, description, name)
            }
            onChange={this.onChange}
            delLesson={(lessonsIndex, name) => delLesson(lessonsIndex, name)}
            lessons={lessons}
            search={this.state.search}
          />
        </DragDropContext>
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
  lessons: state.Lessons.lessons,
  loading: state.Lessons.loading,
  error: state.Lessons.error
});

const mapDispatchToProps = dispatch => ({
  addLesson: (title, description, exam, name) =>
    dispatch(addLesson(title, description, exam, name)),

  delLesson: (lessonsIndex, name) => dispatch(deletElement(lessonsIndex, name)),

  getAllLessons: name => dispatch(getAllElements(name)),

  changeLesson: (lessonsIndex, title, description, name) =>
    dispatch(changeElement(lessonsIndex, title, description, name)),

  changeDndLesson: (id1, id2, courseIndex) =>
    dispatch(changeDndLesson(id1, id2, courseIndex))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lessons);
