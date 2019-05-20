import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";

import LessonList from "../Lessons/LessonList";

class OneCourse extends Component {
  state = {
    lessons: [
      {
        courseIndex: 1,
        description: "<p>1412312</p>",
        exam: false,
        lessonIndex: 1,
        title: "12",
        _id: "5cdccd3175f3a87fe23b9619"
      }
    ]
  };

  render() {
    console.log(this.props);
    return (
      <DragDropContext
        onDragEnd={result => {
          if (!result.destination) {
            return;
          }

          //   if (result.source.index !== result.destination.index) {
          //     changeDndLesson(
          //       lessons[result.source.index].lessonIndex,
          //       lessons[result.destination.index].lessonIndex,
          //       lessons[result.source.index].courseIndex
          //     );
          //   }
        }}
      >
        <LessonList lessons={this.state.lessons} />
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.Courses.courses,
  loading: state.Courses.loading,
  error: state.Courses.error
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OneCourse);

export const Wrapper = styled.div``;

const SearchInput = styled.input`
  padding-left: 0.5rem;
  width: 48.7rem;
  height: 40px;
  border: 0.6px solid black;
  border-radius: 1rem;
  outline: none;
`;
