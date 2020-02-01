import React, { Component } from "react";
import Select from "react-select";
import PropTypes from "prop-types";


import { LabelElement, ButtonWrapper } from "../../../../GlobalStyles/styleGlobal";

import { TextQuestion, ConsturctorForm } from "../../styleLocal";
import Button from "../../../../Shared/Button";
import { i18nSelector, i18n } from "../../../../../store/utils";

export default class TextConstructor extends Component {
  constructor(props) {
    super();
    this.state = {
      text: props.task ? props.task.info.text : i18n,
      points: props.task ? props.task.info.points : 0,
      answer: []
    };
  }

  componentDidMount() {
    const { task } = this.props;
    if (task) {
      this.setState({
        ...this.state,
        text: task.info.text,
        answer: task.info.answer,
      });
    }
  }

  onChange = event => {
    const { text } = this.state;
    const { activeLanguage } = this.props;
    switch (event.target.name) {
      case "points":
        this.setState({
          points: event.target.value
        });
        break;
      case "text":
        this.parseAnswer(event.target.value);
        this.setState({
          [event.target.name]: {
            ...text,
            [activeLanguage.value]: event.target.value
          }
        });
        break;
      default:
        this.setState({ [event.target.name]: event.target.value });
    }
  };

  parseAnswer = string => {
    const { activeLanguage } = this.props;
    const regular = new RegExp(/\~([^~]*?)\~/gi);
    let newAnswer = [];
    let answer = i18n;
    while ((answer[activeLanguage] = regular.exec(string))) {
      newAnswer.push(answer[activeLanguage][1]);
    }
    this.setState({
      answer: newAnswer
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { pageId, addTask, task, changeTask, changeEditFlag } = this.props;
    const { text, answer, points } = this.state;
    const type = "text";
    const info = {
      points: points,
      text: text,
    };
    if (task) {
      changeTask(task._id, type, info, pageId, answer);
      changeEditFlag();
    } else {
      addTask(pageId, type, info, answer);
    }
  };

  render() {
    const { text } = this.state;
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
          <LabelElement>Text</LabelElement>
          <br />
          <LabelElement>Put words in ~ ~ to mark as answer</LabelElement>
          <TextQuestion
            name="text"
            placeholder="Question"
            value={text[activeLanguage.value]}
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
