import React, { Component } from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { withRouter } from "react-router-dom";

import EditorText from "../../EditorText";
import Course from "./Course";
import Button from "../../Shared/Button";
import CustomInput from "../../Shared/Input";

import { ElementsWrapper } from "../styleLocal";
import {
  Wrapper,
  EmptyMessage,
  LabelElement,
  ElementWrapper,
  ButtonWrapper
} from "../../GlobalStyles/styleGlobal";

const name = "course";

class CourseList extends Component {
  state = {
    title: "",
    description: "",
    changeFlag: false,
    courseIndex: null
  };

  getParams = (courseIndex, title, description) => {
    const blocksFromHTML = convertFromHTML(description);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    this.setState({
      changeFlag: true,
      courseIndex: courseIndex,
      title: title,
      description: description,
      editorState: EditorState.createWithContent(state)
    });
  };

  setParams = event => {
    event.preventDefault();
    const { title, courseIndex, editorState } = this.state;
    const { changeCourse } = this.props;
    const description = stateToHTML(editorState.getCurrentContent());

    if (title && description)
      changeCourse(courseIndex, title, description, name);
    this.setState({ changeFlag: false, courseIndex: null });
  };

  deleteItem = courseIndex => {
    const { delCourse } = this.props;
    delCourse(courseIndex, name);
  };

  //TEXT HANDLER
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //EDITOR HANDLER
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  goTo = id => {
    this.props.history.push(`/course/${id}`);
  };

  render() {
    const { courses, search } = this.props;
    const { editorState, changeFlag, courseIndex, title } = this.state;

    let list = courses
      .filter(course => {
        if (course.title.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          return true;
        }
        return false;
      })
      .map((course, index) => {
        if (changeFlag && course.courseIndex === courseIndex) {
          return (
            <ElementWrapper key={course.courseIndex}>
              <form onSubmit={this.setParams}>
                <CustomInput
                 label="Title"
                  field={{
                    name: "title",
                    value: title,
                    onChange: this.onChange
                  }}
                />
                <LabelElement>Description of course : </LabelElement>
                <EditorText
                  editorState={editorState}
                  onEditorStateChange={this.onEditorStateChange}
                />

                <ButtonWrapper>
                  <Button buttonStyle={"outlined"} type="submit">
                    CONFIRM
                  </Button>
                </ButtonWrapper>
              </form>
            </ElementWrapper>
          );
        } else {
          return (
            <Course
              key={course.courseIndex}
              course={course}
              index={index}
              getParams={this.getParams}
              deleteItem={this.deleteItem}
              goTo={this.goTo}
            />
          );
        }
      });
    return (
      <Wrapper>
        {courses.length === 0 || list.length === 0 ? (
          <EmptyMessage>There is nothing here yet</EmptyMessage>
        ) : (
          <Droppable droppableId="droppable">
            {provided => (
              <ElementsWrapper
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                {list}
                {provided.placeholder}
              </ElementsWrapper>
            )}
          </Droppable>
        )}
      </Wrapper>
    );
  }
}

export default withRouter(CourseList);

CourseList.defaultProps = {
  courses: [],
  error: false,

  changeCourse() {},
  delCourse() {}
};

CourseList.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.bool,
  delCourse: PropTypes.func,
  changeCourse: PropTypes.func
};
