import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState } from "draft-js";
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

const name = "news";

class SetArticle extends Component {
  state = {
    title: "",
    description: "",
    constructor: false,
    editorState: EditorState.createEmpty()
  };

  onSubmit = event => {
    event.preventDefault();
    const { addNews } = this.props;
    const { title } = this.state;
    const description = stateToHTML(this.state.editorState.getCurrentContent());
    addNews(title, description, name);

    this.setState({
      constructor: !this.state.constructor
    });
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
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

  render() {
    const { editorState, constructor, title } = this.state;
    if (constructor) {
      return (
        <Wrapper>
          <ButtonWrapper>
            <ConstructorButton onClick={this.showConstructor}>
              ADD NEW ARTICLE
            </ConstructorButton>
          </ButtonWrapper>
          <DarkGround onClick={this.showConstructor} />
          <ConsturctorWrapper>
            <ConsturctorForm onSubmit={this.onSubmit}>
              <LabelElement>TITLE</LabelElement>
              <TitleInput
                name="title"
                placeholder="title"
                type="text"
                value={title}
                onChange={this.onChange}
              />
              <LabelElement>DESCRIPTION</LabelElement>
              <EditorText
                editorState={editorState}
                onEditorStateChange={this.onEditorStateChange}
              />
              <ButtonWrapper>
                <ConstructorButton type="submit">
                  ADD NEW ARTICLE
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
            ADD NEW ARTICLE
          </ConstructorButton>
        </ButtonWrapper>
      </Wrapper>
    );
  }
}

export default SetArticle;

SetArticle.defaultProps = {
  addNews() {}
};

SetArticle.propTypes = {
  addNews: PropTypes.func
};
