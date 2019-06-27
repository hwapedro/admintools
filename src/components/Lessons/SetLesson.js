import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

import Search from "../Search";
import {
  ButtonWrapper,
  TitleInput,
  DescriptionTextArea,
  LessonButton as ConstructirButton,
  Wrapper,
  DarkGround,
  LabelElement,
  ConsturctorForm,
  ConsturctorWrapper,
  ButtonWrapperConstructor,
  ImgMark,
  ImgCross
} from "./style";

import Button from "../Button";
import AdminService from "../../service";

import checkMark from "../../img/good.png";
import redCross from "../../img/bad.png";

const name = "lesson";
const token = localStorage.getItem("token");
let options = [];

const adminService = new AdminService();

class SetLessons extends Component {
  state = {
    title: "",
    description: "",
    exam: false,
    courseIndex: 0,
    constructor: false
  };

  componentDidMount() {
    adminService
      .getAll(token, "course")
      .then(response => {
        options = response.courses.map((element, index) => {
          const option = index + 1;
          return { value: option, label: option };
        });
      })
      .catch(console.error());
  }

  onSubmit = event => {
    event.preventDefault();
    const { addLesson, course } = this.props;
    const { title, description, exam, courseIndex } = this.state;
    console.log(course);
    course
      ? addLesson(title, description, exam, name, course.courseIndex)
      : addLesson(title, description, exam, name, courseIndex.value);
  };

  onChange = event => {
    console.log(event.target.name);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChange = courseIndex => {
    this.setState({ courseIndex });
  };

  showConstructor = () => {
    this.setState({
      constructor: !this.state.constructor
    });
  };

  ChangeExamTrue = () => {
    this.setState({ exam: true });
  };

  ChangeExamFalse = () => {
    this.setState({ exam: false });
  };

  render() {
    const { constructor, exam, courseIndex } = this.state;
    const { onChange, value, course } = this.props;

    if (constructor) {
      return (
        <Wrapper>
          <DarkGround onClick={this.showConstructor} />
          <ConsturctorWrapper>
            <ConsturctorForm onSubmit={this.onSubmit}>
              <LabelElement>title</LabelElement>
              <TitleInput
                name="title"
                placeholder="title"
                type="text"
                value={this.state.title}
                onChange={this.onChange}
              />
              <LabelElement>description</LabelElement>
              <DescriptionTextArea
                name="description"
                placeholder="description"
                value={this.state.description}
                type="text"
                onChange={this.onChange}
              />
              <LabelElement>EXAM :</LabelElement>

              <ImgMark
                style={!exam ? { filter: "grayscale(100%)" } : {}}
                src={checkMark}
                onClick={this.ChangeExamTrue}
              />
              <ImgCross
                style={exam ? { filter: "grayscale(100%)" } : {}}
                src={redCross}
                onClick={this.ChangeExamFalse}
              />
              <br />
              {!course && (
                <>
                  <LabelElement>Course Index :</LabelElement>
                  <Select
                    value={courseIndex}
                    onChange={this.handleChange}
                    options={options}
                  />
                </>
              )}
              <ButtonWrapper>
                <Button type="submit">ADD NEW LESSON</Button>
              </ButtonWrapper>
            </ConsturctorForm>
          </ConsturctorWrapper>
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        <ButtonWrapperConstructor>
          <Search onChange={onChange} value={value} />
          <Button onClick={this.showConstructor}>ADD NEW LESSON</Button>
        </ButtonWrapperConstructor>
      </Wrapper>
    );
  }
}

export default SetLessons;

SetLessons.defaultProps = {
  addLesson() {},
  course: null
};

SetLessons.propTypes = {
  addLesson: PropTypes.func,
  course: PropTypes.object
};
