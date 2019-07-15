import React, { Component } from "react";
import { connect } from "react-redux";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import {
  LabelElement,
  ConsturctorForm,
  TitleInput,
  QuestionInput,
  ButtonWrapper,
  OptionsWrapper,
  OptionInput,
  CheckboxInput
} from "./style";
import Button from "../../../Button";
import EditorText from "../../../EditorText";
import { addTask } from "../../../../store/actions/actionLessons";

let index = 100;
const type = "test";
class TestConstructor extends Component {
  state = {
    info: {
      name: "",
      question: "",
      options: []
    },
    editorState: EditorState.createEmpty()
  };

  addOption = () => {
    const answer = "";
    const right = false;
    index++;
    this.setState({
      info: {
        ...this.state.info,
        options: [...this.state.info.options, { answer, right, index }]
      }
    });
  };

  deleteOption = index => {
    let newOptions = this.state.info.options.filter(
      option => option.index !== index
    );
    this.setState({
      info: {
        ...this.state.info,
        options: newOptions
      }
    });
  };

  answerChange = (id, event) => {
    let newOptions = this.state.info.options.map(option =>
      id === option.index
        ? {
            answer: event.target.value,
            right: option.right,
            index: option.index
          }
        : option
    );
    this.setState({
      info: {
        ...this.state.info,
        options: newOptions
      }
    });
  };

  setRight = (id, event) => {
    let newOptions = this.state.info.options.map(option =>
      id === option.index
        ? {
            answer: option.answer,
            right: event.target.checked,
            index: option.index
          }
        : option
    );
    this.setState({
      info: {
        ...this.state.info,
        options: newOptions
      }
    });
  };

  infoChange = event => {
    this.setState({
      info: { ...this.state.info, [event.target.name]: event.target.value }
    });
  };

  setParams = event => {
    event.preventDefault();
  };

  onSubmit = event => {
    event.preventDefault();
    const { pageId, addTask } = this.props;
    const { info, editorState } = this.state;
    info.description = stateToHTML(editorState.getCurrentContent());
    addTask(pageId, type, info);

  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  render() {
    let token = localStorage.getItem("userId");
    const { editorState } = this.state;
    
    return (
      <>
        <ConsturctorForm onSubmit={this.onSubmit}>
          <LabelElement>Title</LabelElement>
          <TitleInput
            name="name"
            placeholder="Name"
            onChange={this.infoChange}
          />

          <LabelElement>Description</LabelElement>

          <EditorText
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
          />

          <LabelElement>Question</LabelElement>
          <QuestionInput
            name="question"
            placeholder="Question"
            onChange={this.infoChange}
          />
          <ButtonWrapper>
            <Button style={"outlined"} onClick={this.addOption}>
              Add answer option
            </Button>
          </ButtonWrapper>

          <div>
            {this.state.info.options.map(el => {
              return (
                <div className="form-check" key={el.index}>
                  <OptionsWrapper>
                    <OptionInput
                      name="answer"
                      placeholder="Answer"
                      onChange={e => this.answerChange(el.index, e)}
                    />
                    <CheckboxInput
                      type="checkbox"
                      onChange={e => this.setRight(el.index, e)}
                    />
                    <Button
                      style={"outlined"}
                      onClick={() => this.deleteOption(el.index)}
                    >
                      Delete option
                    </Button>
                  </OptionsWrapper>
                </div>
              );
            })}
          </div>

          <ButtonWrapper>
            <Button style={"outlined"} type="submit">
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
    dispatch(addTask(pageid, type, info, answer))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestConstructor);
