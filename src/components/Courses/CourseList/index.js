import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Droppable } from "react-beautiful-dnd";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
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
import { i18nSelector } from "../../../store/utils";

const name = "course";

class CourseList extends Component {
  state = {
    title: null,
    description: null,
    language: { label: "Russian", value: "ru" },
    changeFlag: false,
    //editorState: EditorState.createEmpty(),
    courseIndex: null
  };

  getParams = (courseIndex, title, description) => {
    const { language } = this.state;
    const blocksFromHTML = convertFromHTML(description[language.value]);
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
    const { title, description, courseIndex } = this.state;
    const { changeCourse } = this.props;

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
    const { language, title } = this.state;

    switch (event.target.name) {
      case "title":
        this.setState({
          [event.target.name]: {
            ...title,
            [language.value]: event.target.value
          }
        });
        break;
      default:
        this.setState({ [event.target.name]: event.target.value });
    }
  };

  //EDITOR HANDLER
  onEditorStateChange = editorState => {
    const description = {
      ...this.state.description,
      [this.state.language.value]: stateToHTML(editorState.getCurrentContent())
    };

    this.setState({
      editorState: editorState,
      description: description
    });
  };

  //SELECTOR HANDLER
  handleChange = language => {
    const { description } = this.state;
    const contentState = stateFromHTML(description[language.value]);
    const editorState = EditorState.push(this.state.editorState, contentState);

    this.setState({ language: language, editorState: editorState });
  };

  goTo = id => {
    this.props.setLoading(true)
    this.props.history.push(`/course/${id}`);
  };

  render() {
    const { courses, search, activeLanguage } = this.props;
    const {
      editorState,
      changeFlag,
      courseIndex,
      title,
      language
    } = this.state;

    let list = courses
      .filter(course => {
        if (
          course.title[activeLanguage.value]
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1
        ) {
          return true;
        }
        return false;
      })
      .map((course, index) => {
        if (changeFlag && course.courseIndex === courseIndex) {
          return (
            <ElementWrapper key={course.courseIndex}>
              <form onSubmit={this.setParams}>
                <LabelElement>Choose language</LabelElement>
                <Select
                  value={language}
                  onChange={this.handleChange}
                  options={i18nSelector}
                  maxMenuHeight={100}
                />
                <CustomInput
                  label="Title"
                  placeholder="Title goes here"
                  name="title"
                  value={title[language.value]}
                  onChange={this.onChange}
                  required={true}
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
              activeLanguage={activeLanguage}
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
