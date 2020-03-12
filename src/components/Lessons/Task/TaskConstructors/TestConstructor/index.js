import React, { Component } from "react";
import Select from "react-select";

import PropTypes from "prop-types";

import {
  OptionsWrapper,
  OptionElementWrapper,
  OptionInput,
  CheckboxInput,
  ConsturctorForm
} from "../../styleLocal";

import { ButtonWrapper } from "../../../../GlobalStyles/styleGlobal";
import Button from "../../../../Shared/Button";
import CustomInput from "../../../../Shared/Input";
import { i18nSelector, i18n } from "../../../../../store/utils";

const type = "test";

export default class TestConstructor extends Component {
  constructor(props) {
    super();
    this.state = {
      question: props.task ? props.task.info.question : i18n,
      points: props.task ? props.task.info.points : 0,
      choices: [],
      answer: []
    };
  }

  componentDidMount() {
    const { task } = this.props;
    if (task) {
      this.setState({
        ...this.state,
        question: task.info.question,
        choices: task.info.choices,
        points: task.info.points,
        answer: task.answer
      });
    } else {
      let i18nStart = {};
      i18nSelector.forEach(
        el => (i18nStart = { ...i18nStart, [el.value]: "" })
      );
      this.setState({
        name: i18nStart,
        question: i18nStart
      });
    }
  }

  addChoice = () => {
    const { choices } = this.state;
    const c = i18n;
    const i = choices.length;
    this.setState({
      choices: [...choices, { c, i }]
    });
  };

  deleteChoice = index => {
    const { choices } = this.state;
    let newOptions = choices.filter(option => option.i !== index);
    this.setState({
      choices: newOptions
    });
  };

  answerChange = (id, event) => {
    const { choices } = this.state;
    const { activeLanguage } = this.props;
    let newOptions = choices.map(el =>
      id === el.i
        ? {
            ...el,
            c: {
              ...el.c,
              [activeLanguage.value]: event.target.value
            }
          }
        : el
    );

    this.setState({
      choices: newOptions
    });
  };

  setRight = (id, event) => {
    const { answer } = this.state;
    if (event.target.checked) {
      const newAnswer = answer;
      newAnswer.push(id);
      this.setState({ answer: newAnswer });
    } else {
      const newAnswer = answer.filter(el => el !== id);
      this.setState({ answer: newAnswer });
    }
  };

  onChange = event => {
    const { question } = this.state;
    const { activeLanguage } = this.props;
    switch (event.target.name) {
      case "points":
        this.setState({
          points: event.target.value
        });
        break;
      case "question":
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

  onSubmit = event => {
    event.preventDefault();
    const { pageId, addTask, task, changeTask, changeEditFlag } = this.props;
    const { points, question, choices, answer } = this.state;

    const info = {
      points: points,
      question: question,
      choices: choices
    };

    if (task) {
      changeTask(task._id, type, info, answer);
      changeEditFlag();
    } else {
      addTask(pageId, type, info, answer);
    }
  };

  render() {
    const { choices, points, question, answer } = this.state;
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
            label="Amount of point"
            name="points"
            value={points}
            onChange={this.onChange}
            required={false}
          />
          <CustomInput
            label="Question"
            placeholder="Who are you?"
            name="question"
            value={question[activeLanguage.value]}
            onChange={this.onChange}
            required={false}
          />
          <ButtonWrapper>
            <Button buttonStyle={"outlined"} onClick={this.addChoice}>
              Add answer option
            </Button>
          </ButtonWrapper>

          <div>
            {choices.length !== 0 &&
              choices.map(el => {
                 
                return (
                  <OptionsWrapper className="form-check" key={el.i}>
                    <OptionElementWrapper>
                      <OptionInput
                        name="answer"
                        value={el.c[activeLanguage.value]}
                        onChange={e => this.answerChange(el.i, e)}
                        label="Answer"
                        placeholder="Answer"
                      />
                      <CheckboxInput
                        type="checkbox"
                        checked={answer.includes(el.i)}
                        onChange={e => this.setRight(el.i, e)}
                      />
                      <Button
                        buttonStyle={"outlined"}
                        onClick={() => this.deleteChoice(el.i)}
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

TestConstructor.defaultProps = {
  addTask() {},
  changeTask() {}
};

TestConstructor.propTypes = {
  addTask: PropTypes.func,
  changeTask: PropTypes.func
};
