import React, { Component } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

import { TextQuestion } from "../styleLocal";

import Editor from "../../../Shared/Editor";
import { LabelElement, ButtonWrapper } from "../../../GlobalStyles/styleGlobal";

import { ConsturctorForm } from "../styleLocal";
import Button from "../../../Shared/Button";
import CustomInput from "../../../Shared/Input";
import { i18nSelector, i18n } from "../../../../store/utils";

export default class TextConstructor extends Component {
  constructor(props) {
    super();
    this.state = {
      name: props.task ? props.task.info.name : i18n,
      question: props.task ? props.task.info.question : i18n,
      description: props.task ? props.task.info.description : i18n,
      options: []
    };
  }

  componentDidMount() {
    const { task } = this.props;
    if (task) {
      this.setState({
        ...this.state,
        name: task.info.name,
        question: task.info.question,
        options: task.info.options,
        description: task.info.description
      });
    }
  }

  onChange = event => {
    const { name, question } = this.state;
    const { activeLanguage } = this.props;
    switch (event.target.name) {
      case "name":
        this.setState({
          [event.target.name]: {
            ...name,
            [activeLanguage.value]: event.target.value
          }
        });
        break;
      case "question":
        this.parseAnswer(event.target.value);
        this.setState({
          [event.target.name]: {
            ...question,
            [activeLanguage.value]: event.target.value
          }
        });
        break;
      default:
        this.setState({ [event.target.name]: event.target.value });
    }
  };

  parseAnswer = string => {
    const { language } = this.props;
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
    const { name, question, description } = this.state;
    const { activeLanguage, handleLangChange } = this.props;

    return (
      <>
        <ConsturctorForm onSubmit={this.onSubmit}>
          <Select
            value={activeLanguage}
            onChange={handleLangChange}
            options={i18nSelector}
            maxMenuHeight={100}
          />
          <CustomInput
            label="Title"
            placeholder="Title goes here"
            name="name"
            value={name[activeLanguage.value]}
            onChange={this.onChange}
            required={true}
          />
          <LabelElement>Description</LabelElement>
          <Editor
            onChange={this.onChange}
            name="description"
            value={description[activeLanguage.value]}
            language={activeLanguage.value}
          />
          <LabelElement>Question</LabelElement>
          <br />
          <LabelElement>Put words in ~ ~ to mark as answer</LabelElement>
          <TextQuestion
            name="question"
            placeholder="Question"
            value={question[activeLanguage.value]}
            onChange={this.onChange}
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
