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
    const { loading, lessons, changeLesson, addLesson, delLesson ,changeDndLesson} = this.props;
    // if (loading) {
    //   return (
    //     <>
    //       <Spinner />
    //     </>
    //   );
    // }
    return (
      <>
        <DragDropContext
          onDragEnd={result => {
            if (!result.destination) {
              return;
            }
            console.log(result);
            if (result.source.index !== result.destination.index) {
              let token = localStorage.getItem("userId");
              
              changeDndLesson(
                token,
                lessons[result.source.index].lessonIndex,
                lessons[result.destination.index].lessonIndex,
                lessons[result.source.index].courseIndex
              );
            }
          }}
        >
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
  addLesson: (title, description, exam, token, name) =>
    dispatch(addLesson(title, description, exam, token, name)),

  delLesson: (lessonsIndex, token, name) =>
    dispatch(deletElement(lessonsIndex, token, name)),

  getAllLessons: (token, name) => dispatch(getAllElements(token, name)),

  changeLesson: (lessonsIndex, title, description, token, name) =>
    dispatch(changeElement(lessonsIndex, title, description, token, name)),

  changeDndLesson: (token, id1, id2, courseIndex) =>
    dispatch(changeDndLesson(token, id1, id2, courseIndex))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lessons);
