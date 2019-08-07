import React, { Component } from "react";
import { connect } from "react-redux";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import {
  LabelElement,
  ConsturctorForm,
  ButtonWrapper,
  OptionsWrapper,
  OptionElementWrapper,
  OptionInput,
  CheckboxInput
} from "../styleLocal";
import Button from "../../../Shared/Button";
import CustomInput from "../../../Shared/Input";
import EditorText from "../../../EditorText";
import { addTask, changeTask } from "../../../../store/actions/actionLessons";

let index = 2017;
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
    const { info } = this.state;
    const answer = "";
    const right = false;
    index++;
    this.setState({
      info: {
        info,
        options: [info.options, { answer, right, index }]
      }
    });
  };

  deleteOption = index => {
    const { info } = this.state;
    let newOptions = info.options.filter(option => option.index !== index);
    this.setState({
      info: {
        info,
        options: newOptions
      }
    });
  };

  answerChange = (id, event) => {
    const { info } = this.state;
    let newOptions = info.options.map(option =>
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
        info,
        options: newOptions
      }
    });
  };

  setRight = (id, event) => {
    const { info } = this.state;
    let newOptions = info.options.map(option =>
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
        info,
        options: newOptions
      }
    });
  };

  infoChange = event => {
    const { info } = this.state;
    this.setState({
      info: { info, [event.target.name]: event.target.value }
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { pageId, addTask, task, changeTask, changeEditFlag } = this.props;
    const { info, editorState } = this.state;
    info.description = stateToHTML(editorState.getCurrentContent());
    if (task) {
      changeTask(task._id, type, info, pageId);
      changeEditFlag();
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
          <CustomInput
            label="Title"
            placeholder="Title goes here"
            name="name"
            value={info.name}
            onChange={this.infoChange}
            required={true}
          />

          <LabelElement>Description</LabelElement>

          <EditorText
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
          />

          <CustomInput
            label="Question"
            placeholder="Who are you?"
            name="question"
            value={info.question}
            onChange={this.infoChange}
            required={false}
          />
          <ButtonWrapper>
            <Button buttonStyle={"outlined"} onClick={this.addOption}>
              Add answer option
            </Button>
          </ButtonWrapper>

          <div>
            {info.options.map(el => {
              return (
                <OptionsWrapper className="form-check" key={el.index}>
                  <OptionElementWrapper>
                    <OptionInput
                      name="answer"
                      value={el.answer}
                      onChange={e => this.answerChange(el.index, e)}
                      label="Answer"
                      placeholder="Answer"
                    />
                    <CheckboxInput
                      type="checkbox"
                      value={el.right}
                      checked={el.right}
                      onChange={e => this.setRight(el.index, e)}
                    />
                    <Button
                      buttonStyle={"outlined"}
                      onClick={() => this.deleteOption(el.index)}
                    >
                      Delete option
                    </Button>
                  </OptionElementWrapper>
                </OptionsWrapper>
              );
            })}
          </div>

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

const mapDispatchToProps = dispatch => ({
  addTask: (pageid, type, info, answer) =>
    dispatch(addTask(pageid, type, info, answer)),
  changeTask: (taskId, type, info, pageId) =>
    dispatch(changeTask(taskId, type, info, pageId))
});

export default connect(
  null,
  mapDispatchToProps
)(TestConstructor);
