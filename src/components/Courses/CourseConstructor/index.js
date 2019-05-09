import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import EditorText from "../../EditorText";

import {
  Wrapper,
  DarkGround,
  ConsturctorWrapper,
  TitleInput,
  ConsturctorForm,
  LabelElement,
  ConstructorButton,
  ButtonWrapper
} from "../style";

const name = "course";


export default class CourseCounstructor extends Component {
  state = {
    title: "",
    description: "",
    constructor: false,
    editorState: EditorState.createEmpty()
  };

  onSubmit = event => {
    event.preventDefault();
    const { addCourses } = this.props;
    const { title, constructor } = this.state;
    const description = stateToHTML(this.state.editorState.getCurrentContent());
    addCourses(title, description, name);
    this.setState({
      constructor: !constructor
    });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  showConstructor = () => {
    const { constructor } = this.state;
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
    const { editorState, constructor, title } = this.state;
    if (constructor) {
      return (
        <Wrapper>
          <ButtonWrapper>
            <ConstructorButton onClick={this.showConstructor}>
              ADD NEW COURSE
            </ConstructorButton>
          </ButtonWrapper>
          <DarkGround onClick={this.showConstructor} />
          <ConsturctorWrapper>
            <ConsturctorForm onSubmit={this.onSubmit}>
              <LabelElement>title</LabelElement>
              <TitleInput
                name="title"
                placeholder="title"
                type="text"
                value={title}
                onChange={this.onChange}
              />
              <LabelElement>description</LabelElement>
              <EditorText
                editorState={editorState}
                onEditorStateChange={this.onEditorStateChange}
              />
              <ButtonWrapper>
                <ConstructorButton type="submit">
                  ADD NEW COURSE
                </ConstructorButton>
              </ButtonWrapper>
            </ConsturctorForm>
          </ConsturctorWrapper>
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        <ButtonWrapper>
          <ConstructorButton onClick={this.showConstructor}>
            ADD NEW COURSE
          </ConstructorButton>
        </ButtonWrapper>
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
