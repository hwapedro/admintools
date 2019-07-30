import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import EditorText from "../../EditorText";
import Search from "../../Search";
import Button from "../../Shared/Button";
import CustomInput from "../../Shared/Input";

import {
  Wrapper,
  DarkGround,
  ConsturctorWrapper,
  ConsturctorForm,
  LabelElement,
  ButtonWrapper,
  ButtonWrapperConstructor
} from "../styleLocal";

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
    const { addNews, showConstructor } = this.props;
    const { title } = this.props;
    const description = stateToHTML(this.state.editorState.getCurrentContent());
    addNews(title, description, name);
    showConstructor();
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
    const { onChange, title, value, constructor, showConstructor } = this.props;
    const { editorState } = this.state;
    return (
      <Wrapper>
        <ButtonWrapperConstructor>
          <Search onChange={onChange} value={value} />
          <Button buttonStyle={"outlined"} onClick={showConstructor}>
            ADD NEW ARTICLE
          </Button>
        </ButtonWrapperConstructor>
        {constructor && (
          <>
            <DarkGround onClick={showConstructor} />
            <ConsturctorWrapper>
              <ConsturctorForm onSubmit={this.onSubmit}>
                <CustomInput
                  placeholder="title"
                  type="text"
                  field={{
                    name: "title",
                    value: title,
                    onChange: onChange
                  }}
                />
                <LabelElement>DESCRIPTION</LabelElement>
                <EditorText
                  editorState={editorState}
                  onEditorStateChange={this.onEditorStateChange}
                />
                <ButtonWrapper>
                  <Button buttonStyle={"outlined"} type="submit">
                    ADD NEW ARTICLE
                  </Button>
                </ButtonWrapper>
              </ConsturctorForm>
            </ConsturctorWrapper>
          </>
        )}
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
