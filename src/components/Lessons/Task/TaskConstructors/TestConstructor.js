import React, { Component } from "react";
import Select from "react-select";

import PropTypes from "prop-types";

import {
  OptionsWrapper,
  OptionElementWrapper,
  OptionInput,
  CheckboxInput
} from "../styleLocal";

import Editor from "../../../Shared/Editor";
import {
  LabelElement,
  ConsturctorForm,
  ButtonWrapper
} from "../../../GlobalStyles/styleGlobal";
import Button from "../../../Shared/Button";
import CustomInput from "../../../Shared/Input";
import { i18nSelector, i18n } from "../../../../store/utils";

const type = "test";

export default class TestConstructor extends Component {
  constructor() {
    super();
    this.state = {
      name: i18n,
      question: i18n,
      description: i18n,
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
    } else {
      let i18nStart = {};
      i18nSelector.forEach(
        el => (i18nStart = { ...i18nStart, [el.value]: "" })
      );
      this.setState({
        name: i18nStart,
        description: i18nStart,
        question: i18nStart
      });
    }
  }

  addOption = () => {
    const { options } = this.state;
    const answer = i18n;
    const right = false;
    const index = options.length;
    this.setState({
      options: [...options, { answer, right, index }]
    });
  };

  deleteOption = index => {
    const { options } = this.state;
    let newOptions = options.filter(option => option.index !== index);
    this.setState({
      options: newOptions
    });
  };

  answerChange = (id, event) => {
    const { options, language } = this.state;
    let newOptions = options.map(option =>
      id === option.index
        ? {
            ...option,
            answer: { ...option.answer, [language.value]: event.target.value }
          }
        : option
    );

    this.setState({
      options: newOptions
    });
  };

  setRight = (id, event) => {
    const { options } = this.state;
    let newOptions = options.map(option =>
      id === option.index
        ? {
            answer: option.answer,
            right: event.target.checked,
            index: option.index
          }
        : option
    );

    this.setState({
      options: newOptions
    });
  };

  onChange = event => {
    const { name, question, description } = this.state;
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
      case "description":
        this.setState({
          [event.target.name]: {
            ...description,
            [activeLanguage.value]: event.target.value
          }
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
    const { options, name, description, question } = this.state;

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
    const { options, name, description, question} = this.state;
    const { activeLanguage, handleLangChange } = this.props;
    console.log(description, activeLanguage)
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
          <CustomInput
            label="Question"
            placeholder="Who are you?"
            name="question"
            value={question[activeLanguage.value]}
            onChange={this.onChange}
            required={false}
          />
          <ButtonWrapper>
            <Button buttonStyle={"outlined"} onClick={this.addOption}>
              Add answer option
            </Button>
          </ButtonWrapper>

          <div>
            {options.length !== 0 &&
              options.map((el, index) => {
                return (
                  <OptionsWrapper className="form-check" key={el.index}>
                    <OptionElementWrapper>
                      <OptionInput
                        name="answer"
                        value={el.answer[activeLanguage.value]}
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

TestConstructor.defaultProps = {
  addTask() {},
  changeTask() {}
};

TestConstructor.propTypes = {
  addTask: PropTypes.func,
  changeTask: PropTypes.func
};
