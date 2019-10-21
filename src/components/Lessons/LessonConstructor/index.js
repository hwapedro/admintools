import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

import Search from "../../Search";
import Editor from "../../Shared/Editor";
import { ImgMark, ImgCross, ButtonWrapperConstructor } from "../styleLocal";
import {
  Wrapper,
  LabelElement,
  ButtonWrapper,
  ConsturctorWrapper,
  ConsturctorForm,
  DarkGround,
  SelectWrapper
} from "../../GlobalStyles/styleGlobal";

import Button from "../../Shared/Button";
import CustomInput from "../../Shared/Input";
import AdminService from "../../../service";

import checkMark from "../../../img/good.png";
import redCross from "../../../img/bad.png";
import { i18nSelector } from "../../../store/utils";

const name = "lesson";
let options = [];

class LessonConstructor extends Component {
  state = {
    title: null,
    description: null,
    exam: false,
    courseIndex: { value: 1, label: "course" },
    constructor: false
  };

  componentDidMount() {
    let i18nStart = {};
    i18nSelector.forEach(el => (i18nStart = { ...i18nStart, [el.value]: "" }));
    this.setState({
      title: i18nStart,
      description: i18nStart
    });
    const token = localStorage.getItem("token");
    AdminService.getAll(token, "course")
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

    this.setState({
      constructor: !constructor,
      title: null,
      description: null,
      exam: false,
      courseIndex: 0
    });
    const index = course ? course.courseIndex : courseIndex.value;
    const flag = course ? "course" : name;
    addLesson(title, description, exam, name, index, flag);
  };

  //TEXT HANDLER
  onChange = event => {
    const { title, description } = this.state;
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

  //SELECTOR HANDLER
  handleChange = value => {
    this.setState({ courseIndex: value });
  };

  showConstructor = () => {
    this.setState({
      constructor: !this.state.constructor
    });
  };

  changeExamProp = flag => {
    this.setState({ exam: flag });
  };

  render() {
    const { constructor, exam, courseIndex, description, title } = this.state;
    const {
      onChange,
      value,
      course,
      activeLanguage,
      handleLangChange
    } = this.props;
    return (
      <Wrapper>
        <ButtonWrapperConstructor>
          <Search onChange={onChange} value={value} />
          <SelectWrapper>
            <Select
              value={activeLanguage}
              onChange={handleLangChange}
              options={i18nSelector}
            />
          </SelectWrapper>
          <Button buttonStyle={"outlined"} onClick={this.showConstructor}>
            ADD NEW LESSON
          </Button>
          {constructor && (
            <>
              <DarkGround onClick={this.showConstructor} />
              <ConsturctorWrapper>
                <ConsturctorForm onSubmit={this.onSubmit}>
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
                  <LabelElement>Description</LabelElement>
                  <Editor
                    onChange={this.onChange}
                    name="description"
                    value={description[activeLanguage.value]}
                    language={activeLanguage.value}
                  />
                  <LabelElement>EXAM :</LabelElement>

                  <ImgMark
                    style={!exam ? { filter: "grayscale(100%)" } : {}}
                    src={checkMark}
                    onClick={() => this.changeExamProp(true)}
                  />
                  <ImgCross
                    style={exam ? { filter: "grayscale(100%)" } : {}}
                    src={redCross}
                    onClick={() => this.changeExamProp(false)}
                  />
                  <br />
                  {!course && (
                    <>
                      <LabelElement>Course Index :</LabelElement>
                      <Select
                        value={courseIndex}
                        onChange={value => this.handleChange(value)}
                        options={options}
                        maxMenuHeight={100}
                      />
                    </>
                  )}

                  <ButtonWrapper>
                    <Button buttonStyle={"outlined"} type="submit">
                      ADD NEW LESSON
                    </Button>
                  </ButtonWrapper>
                </ConsturctorForm>
              </ConsturctorWrapper>
            </>
          )}
        </ButtonWrapperConstructor>
      </Wrapper>
    );
  }
}

export default LessonConstructor;

LessonConstructor.defaultProps = {
  value: "",
  course: null,
  addLesson() {}
};

LessonConstructor.propTypes = {
  value: PropTypes.string,
  course: PropTypes.object,
  addLesson: PropTypes.func
};
