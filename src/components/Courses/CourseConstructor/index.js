import React, { Component } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import EditorText from "../../EditorText";
import Search from "../../Search";
import Button from "../../Shared/Button";
import CustomInput from "../../Shared/Input";

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
import { i18n } from "../../../store/utils";

const name = "course";

export default class CourseCounstructor extends Component {
  state = {
    language: { label: "Russian", value: "ru" },
    editorState: EditorState.createEmpty()
  };

  onSubmit = event => {
    event.preventDefault();
    const { addCourses, title, showConstructor } = this.props;
    const description = stateToHTML(this.state.editorState.getCurrentContent());
    showConstructor();
    addCourses(title, description, name);
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };
  
  //SELECTOR HANDLER
  handleChange = language => {
    this.setState({ language });
  };

  render() {
    const {
      onChange,
      title,
      value,
      constructor,
      showConstructor,
      activeLanguage,
      handleLangChange
    } = this.props;
    const { editorState, language } = this.state;
    return (
      <Wrapper>
        <ButtonWrapperConstructor>
          <Search onChange={onChange} value={value} />
          <SelectWrapper>
            <Select
              value={activeLanguage}
              onChange={handleLangChange}
              options={i18n}
            />
          </SelectWrapper>
          <Button buttonStyle={"outlined"} onClick={showConstructor}>
            ADD NEW COURSE
          </Button>
          {constructor && (
            <>
              <DarkGround onClick={showConstructor} />
              <ConsturctorWrapper>
                <ConsturctorForm onSubmit={this.onSubmit}>
                  <LabelElement>Choose language</LabelElement>
                  <Select
                    value={language}
                    onChange={this.handleChange}
                    options={i18n}
                    maxMenuHeight={100}
                  />
                  <CustomInput
                    label="Title"
                    placeholder="Title goes here"
                    name="title"
                    value={title}
                    onChange={onChange}
                    required={true}
                  />
                  <LabelElement>Description</LabelElement>
                  <EditorText
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
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
