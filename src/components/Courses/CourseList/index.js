import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Droppable } from "react-beautiful-dnd";
import { withRouter } from "react-router-dom";

import Course from "./Course";
import Button from "../../Shared/Button";
import CustomInput from "../../Shared/Input";
import Editor from "../../Shared/Editor";

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
    annotation: null,
    description: null,
    changeFlag: false,
    courseIndex: null
  };

  getParams = (courseIndex, title, annotation, description) => {
    this.setState({
      changeFlag: true,
      courseIndex: courseIndex,
      title: title,
      annotation: annotation,
      description: description
    });
  };

  setParams = event => {
    event.preventDefault();
    const { title, annotation, description, courseIndex } = this.state;
    const { changeCourse } = this.props;

    if (title && description)
      changeCourse(courseIndex, title, annotation, description, name);
    this.setState({ changeFlag: false, courseIndex: null });
  };

  showConstructor = () => {
    const { changeFlag } = this.state;
    if (changeFlag) {
      this.setState({
        changeFlag: !changeFlag
      });
    }
  };

  deleteItem = courseIndex => {
    const { delCourse } = this.props;
    delCourse(courseIndex, name);
  };

  //TEXT HANDLER
  onChange = event => {
    const { title, annotation, description } = this.state;
    const { activeLanguage } = this.props;
    switch (event.target.name) {
      case "title":
        this.setState({
          [event.target.name]: {
            ...title,
            [activeLanguage.value]: event.target.value
          }
        });
        break;
      case "annotation":
        this.setState({
          [event.target.name]: {
            ...annotation,
            [activeLanguage.value]: event.target.value
          }
        });
        break;
      case "description":
        this.setState({
          [event.target.name]: {
            ...description,
            [activeLanguage.value]: event.target.value
          }
        });
        break;
      default:
        this.setState({ [event.target.name]: event.target.value });
    }
  };

  goTo = id => {
    this.props.setLoading(true);
    this.props.history.push(`/course/${id}`);
  };

  render() {
    const { courses, search, activeLanguage, handleLangChange } = this.props;
    const {
      changeFlag,
      courseIndex,
      title,
      annotation,
      description
    } = this.state;
   
    let list = courses
      .filter(course => {
        console.log(course.title[activeLanguage.value])
        console.log(search)
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
                  value={activeLanguage}
                  onChange={handleLangChange}
                  options={i18nSelector}
                  maxMenuHeight={100}
                />
                <CustomInput
                  label="Title"
                  placeholder="Title goes here"
                  name="title"
                  value={title[activeLanguage.value]}
                  onChange={this.onChange}
                  required={true}
                />
                <CustomInput
                  label="Annotation"
                  placeholder="Title goes here"
                  name="annotation"
                  value={annotation[activeLanguage.value]}
                  onChange={this.onChange}
                  required={true}
                />
                <LabelElement>Description of course : </LabelElement>
                <Editor
                  onChange={this.onChange}
                  name="description"
                  value={description[activeLanguage.value]}
                  language={activeLanguage.value}
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
