import React, { Component } from "react";
import { connect } from "react-redux";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import {
  LabelElement,
  ConsturctorForm,
  TitleInput,
  ButtonWrapper,
  TextQuestion
} from "./style";
import Button from "../../../Button";
import EditorText from "../../../EditorText";
import { addTask } from "../../../../store/actions/actionLessons";

class TextConstructor extends Component {
  state = {
    info: {
      name: "",
      question: "",
      options: []
    },
    editorState: EditorState.createEmpty()
  };

  infoChange = event => {
    this.setState({
      info: { ...this.state.info, [event.target.name]: event.target.value }
    });
  };
  А;

  parseAnswer = async string => {
    const rr = new RegExp(/\~([^~]*?)\~/gi);
    let options = [];
    let m;
    while ((m = rr.exec(string))) {
      options.push(m[1]);
    }
    await this.setState({ options: options });
  };

  addTextTask = async () => {
    await this.parseAnswer(this.state.info.question);
    const { info, editorState } = this.state;
    const { pageId, addTask } = this.props;
    const type = "text";
    info.description = stateToHTML(editorState.getCurrentContent());
    await addTask(pageId, type, info);
  };

  setParams = event => {
    event.preventDefault();
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <>
        <ConsturctorForm>
          <LabelElement>Title</LabelElement>
          <TitleInput
            name="name"
            placeholder="Title"
            onChange={this.infoChange}
          />
          <LabelElement>Description</LabelElement>
          <EditorText
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
          />
          <LabelElement>Question</LabelElement>
          <br />
          <LabelElement>Put words in ~ ~ to mark as answer</LabelElement>
          <TextQuestion
            name="question"
            placeholder="Question"
            onChange={this.infoChange}
          />
        </ConsturctorForm>
        <ButtonWrapper>
          <Button buttonStyle={"outlined"} onClick={() => this.addTextTask()}>
            Save
          </Button>
        </ButtonWrapper>
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addTask: (pageid, type, info, answer) =>
    dispatch(addTask(pageid, type, info, answer))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextConstructor);
