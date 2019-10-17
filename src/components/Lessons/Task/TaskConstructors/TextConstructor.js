import React, { Component } from "react";
import Select from "react-select";
import { EditorState } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import { stateToHTML } from "draft-js-export-html";
import PropTypes from "prop-types";

import { TextQuestion } from "../styleLocal";

import {
  LabelElement,
  ConsturctorForm,
  ButtonWrapper
} from "../../../GlobalStyles/styleGlobal";
import Button from "../../../Shared/Button";
import CustomInput from "../../../Shared/Input";
import EditorText from "../../../EditorText";
import { i18nSelector, i18n } from "../../../../store/utils";

export default class TextConstructor extends Component {
  constructor() {
    super();
    this.state = {
      name: i18n,
      question: i18n,
      description: i18n,
      options: [],
      language: { label: "Russian", value: "ru" },
      editorState: EditorState.createEmpty()
    };
  }

  componentDidMount() {
    const { task } = this.props;
    if (task) {
      const { language } = this.state;
      const state = stateFromHTML(task.info.description[language.value]);

      this.setState({
        ...this.state,
        name: task.info.name,
        question: task.info.question,
        options: task.info.options,
        editorState: EditorState.createWithContent(state)
      });
    }
  }

  onChange = event => {
    const { language, name, question } = this.state;
    switch (event.target.name) {
      case "name":
        this.setState({
          [event.target.name]: {
            ...name,
            [language.value]: event.target.value
          }
        });
        break;
      case "question":
        this.parseAnswer(event.target.value);
        this.setState({
          [event.target.name]: {
            ...question,
            [language.value]: event.target.value
          }
        });
        break;
      default:
        this.setState({ [event.target.name]: event.target.value });
    }
  };

  parseAnswer = string => {
    const { language } = this.props
    const regular = new RegExp(/\~([^~]*?)\~/gi);
    let options = [];
    let answer = i18n;
    while ((answer[language] = regular.exec(string))) {
      options.push(answer[1]);
    }
    this.setState({
      options: options
    });
  };

  //EDITOR HANDLER
  onEditorStateChange = editorState => {
    const description = {
      ...this.state.description,
      [this.state.language.value]: stateToHTML(editorState.getCurrentContent())
    };

    this.setState({
      editorState: editorState,
      description: description
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { pageId, addTask, task, changeTask, changeEditFlag } = this.props;
    const { name, question, options, description } = this.state;
    const type = "text";

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
    const { name, question, language, editorState } = this.state;

    return (
      <>
        <ConsturctorForm onSubmit={this.onSubmit}>
          <Select
            value={language}
            onChange={this.handleChange}
            options={i18nSelector}
            maxMenuHeight={100}
          />
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

TextConstructor.defaultProps = {
  addTask() {},
  changeTask() {}
};

TextConstructor.propTypes = {
  addTask: PropTypes.func,
  changeTask: PropTypes.func
};
