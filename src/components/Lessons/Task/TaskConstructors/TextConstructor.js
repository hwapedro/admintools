import React, { Component } from "react";
import { connect } from "react-redux";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import {
  LabelElement,
  ConsturctorForm,
  ButtonWrapper,
  TextQuestion
} from "../styleLocal";
import Button from "../../../Shared/Button";
import CustomInput from "../../../Shared/Input";
import EditorText from "../../../EditorText";
import { addTask, changeTask } from "../../../../store/actions/actionLessons";

class TextConstructor extends Component {
  state = {
    name: "",
    question: "",
    options: [],
    editorState: EditorState.createEmpty()
  };

  componentDidMount() {
    const { task } = this.props;
    if (task) {
      if (task.info.description !== "") {
        const blocksFromHTML = convertFromHTML(task.info.description);
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        this.setState({
          name: task.info.name,
          question: task.info.question,
          options: task.info.options,
          editorState: EditorState.createWithContent(state)
        });
      } else {
        this.setState({
          name: task.info.name,
          question: task.info.question,
          options: task.info.options,
          editorState: EditorState.createEmpty()
        });
      }
    }
  }

  infoChange = event => {
    if (event.target.name === "question") {
      this.parseAnswer(event.target.value);
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  parseAnswer = string => {
    const rr = new RegExp(/\~([^~]*?)\~/gi);
    let options = [];
    let m;
    while ((m = rr.exec(string))) {
      options.push(m[1]);
    }
    this.setState({
      options: options
    });
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { pageId, addTask, task, changeTask, changeEditFlag } = this.props;
    const { name, question, options, editorState } = this.state;
    const type = "text";
    const description = stateToHTML(editorState.getCurrentContent());
    const info = {
      name: name,
      description: description,
      question: question,
      options: options
    };
    if (task) {
      changeTask(task._id, type, info, pageId);
      changeEditFlag();
    } else {
      addTask(pageId, type, info);
    }
  };

  render() {
    const { editorState } = this.state;
    const { name, question } = this.state;
    return (
      <>
        <ConsturctorForm onSubmit={this.onSubmit}>
          <CustomInput
            label="Title"
            placeholder="Title goes here"
            name="name"
            value={name}
            onChange={this.infoChange}
            required={true}
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
            value={question}
            onChange={this.infoChange}
          />

          <ButtonWrapper>
            <Button buttonStyle={"outlined"} type="submit">
              Save
            </Button>
          </ButtonWrapper>
        </ConsturctorForm>
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addTask: (pageid, type, info, answer) =>
    dispatch(addTask(pageid, type, info, answer)),
  changeTask: (taskId, type, info, pageId) =>
    dispatch(changeTask(taskId, type, info, pageId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextConstructor);
