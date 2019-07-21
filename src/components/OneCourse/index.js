import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { DragDropContext } from "react-beautiful-dnd";

import { getAllElements, deletElement, getCourse } from "../../store/actions";

import { changeDndLesson, addLesson } from "../../store/actions/actionLessons";

import LessonList from "../Lessons/LessonList/LessonList";
import SetLesson from "../Lessons/SetLesson";
import Spinner from "../Spinner";
import Error from "../Error";

const name = "course"
class OneCourse extends Component {
  state = {
    search: ""
  };

  componentDidMount() {
    const { getCourse } = this.props;
    getCourse(this.props.itemId);
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { addLesson, course, delLesson, changeDndLesson, error, loading } = this.props;
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
            <SetLesson
              addLesson={(title, description, exam, name, courseIndex) =>
                addLesson(title, description, exam, name, courseIndex)
              }
              onChange={this.onChange}
              value={search}
              course={course}
            />

            <LessonList
              delLesson={(lessonsIndex, name) => delLesson(lessonsIndex, name)}
              lessons={course.lessons}
              search={search}
              course={course}
              changeDndLesson={changeDndLesson}
            />
          </>
        )}
      </>
    );
  }
}

OneCourse.defaultProps = {
  course: {},
  loading: false,
  error: false,

  addLesson() {},
  delLesson() {},
  getAllLessons() {}
};

OneCourse.propTypes = {
  course: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,

  addCourses: PropTypes.func,
  delLesson: PropTypes.func,
  getAllLessons: PropTypes.func
};

const mapStateToProps = state => ({
  course: state.Courses.course,
  loading: state.reducer.loading,
  error: state.reducer.error
});

const mapDispatchToProps = dispatch => ({
  addLesson: (title, description, exam, name, courseIndex) =>
    dispatch(addLesson(title, description, exam, name, courseIndex)),

  delLesson: (lessonsIndex, name) => dispatch(deletElement(lessonsIndex, name)),

  getAllLessons: name => dispatch(getAllElements(name)),

  changeDndLesson: (id1, id2, courseIndex) =>
    dispatch(changeDndLesson(id1, id2, courseIndex)),

  getCourse: id => dispatch(getCourse(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OneCourse);

export const Wrapper = styled.div``;

// const SearchInput = styled.input`
//   padding-left: 0.5rem;
//   width: 48.7rem;
//   height: 40px;
//   border: 0.6px solid black;
//   border-radius: 1rem;
//   outline: none;
// `;
