import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import EditorText from "../../EditorText";
import Search from "../../Search";
import Button from "../../Shared/Button";
import CustomInput from "../../Shared/Input";

import {
  DarkGround,
  ConsturctorWrapper,
  ConsturctorForm,
  ButtonWrapperConstructor
} from "../styleLocal";
import {
  Wrapper,
  LabelElement,
  ButtonWrapper
} from "../../GlobalStyles/styleGlobal";
const name = "course";

export default class CourseCounstructor extends Component {
  state = {
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

  render() {
    const { onChange, title, value, constructor, showConstructor } = this.props;
    const { editorState } = this.state;
    return (
      <Wrapper>
        <ButtonWrapperConstructor>
          <Search onChange={onChange} value={value} />
          <Button buttonStyle={"outlined"} onClick={showConstructor}>
            ADD NEW COURSE
          </Button>
          {constructor && (
            <>
              <DarkGround onClick={showConstructor} />
              <ConsturctorWrapper>
                <ConsturctorForm onSubmit={this.onSubmit}>
                  <CustomInput
                    label="Title"
                    placeholder="title"
                    type="text"
                    field={{
                      name: "title",
                      value: title,
                      onChange: onChange
                    }}
                  />
                  <LabelElement>description</LabelElement>
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
