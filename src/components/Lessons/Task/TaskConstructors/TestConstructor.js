import React, { Component } from "react";
import { connect } from "react-redux";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
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
import { addTask, changeTask } from "../../../../store/actions/actionLessons";
import TaskList from "../TaskList";

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
          ...this.state,
          info: {
            ...this.state.info,
            name: task.info.name,
            question: task.info.question,
            options: task.info.options
          },
          editorState: EditorState.createWithContent(state)
        });
      } else {
        this.setState({
          ...this.state,
          info: {
            ...this.state.info,
            name: task.info.name,
            question: task.info.question,
            options: task.info.options
          },
          editorState: EditorState.createEmpty()
        });
      }
    }
  }

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

  onSubmit = event => {
    event.preventDefault();
    const { pageId, addTask, task, changeTask } = this.props;
    const { info, editorState } = this.state;
    info.description = stateToHTML(editorState.getCurrentContent());
    if (task) {
      changeTask(task._id, type, info, pageId);
    } else {
      addTask(pageId, type, info);
    }
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  render() {
    const { editorState, info } = this.state;

    return (
      <>
        <ConsturctorForm onSubmit={this.onSubmit}>
          <LabelElement>Title</LabelElement>
          <TitleInput
            name="name"
            placeholder="Name"
            value={info.name}
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
            value={info.question}
            placeholder="Question"
            onChange={this.infoChange}
          />
          <ButtonWrapper>
            <Button style={"outlined"} onClick={this.addOption}>
              Add answer option
            </Button>
          </ButtonWrapper>

          <div>
            {info.options.map(el => {
              return (
                <div className="form-check" key={el.index}>
                  <OptionsWrapper>
                    <OptionInput
                      name="answer"
                      placeholder="Answer"
                      value={el.answer}
                      onChange={e => this.answerChange(el.index, e)}
                    />
                    <CheckboxInput
                      type="checkbox"
                      value={el.right}
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
    dispatch(addTask(pageid, type, info, answer)),
  changeTask: (taskId, type, info, pageId) =>
    dispatch(changeTask(taskId, type, info, pageId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestConstructor);
