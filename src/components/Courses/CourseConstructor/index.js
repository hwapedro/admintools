import React, { Component } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

import Search from "../../Search";
import Button from "../../Shared/Button";
import CustomInput from "../../Shared/Input";
import Editor from "../../Shared/Editor";

import { ButtonWrapperConstructor } from "../styleLocal";
import {
  Wrapper,
  LabelElement,
  ButtonWrapper,
  DarkGround,
  ConsturctorWrapper,
  ConsturctorForm,
  SelectWrapper
} from "../../GlobalStyles/styleGlobal";
import { i18nSelector } from "../../../store/utils";

export default class CourseCounstructor extends Component {
  state = {
    title: null,
    annotation: null,
    description: null,
    constructor: false
  };

  componentDidMount() {
    let i18nStart = {};
    i18nSelector.forEach(el => (i18nStart = { ...i18nStart, [el.value]: "" }));
    this.setState({
      title: i18nStart,
      annotation: i18nStart,
      description: i18nStart
    });
  }

  showConstructor = () => {
    const { constructor } = this.state;
    this.setState({
      constructor: !constructor
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { addCourses } = this.props;
    const { title, annotation, description } = this.state;
    this.showConstructor();
    addCourses(title, annotation, description );
  };

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

  render() {
    const { onChange, value, activeLanguage, handleLangChange } = this.props;
    const { title, constructor, annotation, description } = this.state;
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
            ADD NEW COURSE
          </Button>
          {constructor && (
            <>
              <DarkGround onClick={this.showConstructor} />
              <ConsturctorWrapper>
                <ConsturctorForm onSubmit={this.onSubmit}>
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
                    maxLenght="100"
                  />
                  <CustomInput
                    label="Annotation"
                    placeholder="Title goes here"
                    name="annotation"
                    value={annotation[activeLanguage.value]}
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

                  <ButtonWrapper>
                    <Button buttonStyle={"outlined"} type="submit">
                      ADD NEW COURSE
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

CourseCounstructor.defaultProps = {
  addCourses() {}
};

CourseCounstructor.propTypes = {
  addCourses: PropTypes.func
};
