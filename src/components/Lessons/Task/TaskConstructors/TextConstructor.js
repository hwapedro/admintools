import React, { Component } from "react";
import { connect } from "react-redux";
import { EditorState } from "draft-js";

import {
  LabelElement,
  ConsturctorForm,
  TitleInput,
  QuestionInput,
  ButtonWrapper,
  TextQuestion
} from "./style";
import Button from "../../../Button";
import EditorText from "../../../EditorText";
import { addTask } from "../../../../store/actions/actionLessons";

class TextConstructor extends Component {
  state = {
    name: "",
    description: "",
    text: "",
    options: [],
    editorState: EditorState.createEmpty()
  };

  infoChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

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
    await this.parseAnswer(this.state.text);
    const info = this.state;
    const { pageId, addTask } = this.props;
    const type = "text";
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
        <div>
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
              name="text"
              placeholder="Question"
              onChange={this.infoChange}
            />
          </ConsturctorForm>
          <ButtonWrapper>
            <Button style={"outlined"} onClick={() => this.addTextTask()}>
              Save
            </Button>
          </ButtonWrapper>
        </div>
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
