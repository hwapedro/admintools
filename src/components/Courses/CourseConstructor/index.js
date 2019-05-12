import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import EditorText from "../../EditorText";
import Search from "../../Search";

import {
  Wrapper,
  DarkGround,
  ConsturctorWrapper,
  TitleInput,
  ConsturctorForm,
  LabelElement,
  ConstructorButton,
  ButtonWrapperConstructor,
  ButtonWrapper
} from "../style";

const name = "course";

export default class CourseCounstructor extends Component {
  state = {
    editorState: EditorState.createEmpty()
  };

  onSubmit = event => {
    event.preventDefault();
    const { addCourses, title, showConstructor } = this.props;
    const { constructor } = this.state;
    const description = stateToHTML(this.state.editorState.getCurrentContent());
    showConstructor()
    addCourses(title, description, name);
    this.setState({
      constructor: !constructor
    });
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
          <ConstructorButton onClick={showConstructor}>
            ADD NEW COURSE
          </ConstructorButton>
          {constructor && (
            <>
              <DarkGround onClick={showConstructor} />
              <ConsturctorWrapper>
                <ConsturctorForm onSubmit={this.onSubmit}>
                  <LabelElement>title</LabelElement>
                  <TitleInput
                    name="title"
                    placeholder="title"
                    type="text"
                    value={title}
                    onChange={onChange}
                  />
                  <LabelElement>description</LabelElement>
                  <EditorText
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                  />
                  <ButtonWrapper>
                    <ConstructorButton type="submit" >
                      ADD NEW COURSE
                    </ConstructorButton>
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
