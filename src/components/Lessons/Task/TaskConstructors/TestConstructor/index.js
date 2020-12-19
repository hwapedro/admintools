import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { SmartConstructor } from '../../../../Shared/SmartConstructor'
import { i18n } from '../../../../../store/utils'

export default class TestConstructor extends Component {
  constructor(props) {
    super()
    this.state = {
      question: props.task ? props.task.info.question : i18n,
      hint: props.task ? props.task.info.hint : i18n,
      choices: props.task ? props.task.info.choices : [],
      answer: props.task ? props.task.answer : [],
    }
  }

  addChoice = () => {
    const { choices } = this.state
    const c = i18n
    const i = choices.length
    console.log(choices.length, [...choices, { c, i }])
    this.setState({
      choices: [...choices, { c, i }],
    })
  }

  deleteChoice = (index) => {
    const { choices } = this.state
    const newOptions = choices.filter((option) => option.i !== index)
    const options = newOptions.map((el, elementIndex) => {
      console.log(index, elementIndex)
      if (index <= elementIndex) {
        console.log(el)
        el.i = el.i - 1
      }
      return el
    })
    console.log(options)
    this.setState({
      choices: options,
    })
  }

  answerChange = (id, event) => {
    const { choices } = this.state
    const { activeLanguage } = this.props
    let newOptions = choices.map((el) =>
      id === el.i
        ? {
            ...el,
            c: {
              ...el.c,
              [activeLanguage.value]: event.target.value,
            },
          }
        : el
    )

    this.setState({
      choices: newOptions,
    })
  }

  setRight = (id, event) => {
    const { answer } = this.state
    if (event.target.checked) {
      const newAnswer = answer
      newAnswer.push(id)
      this.setState({ answer: newAnswer })
    } else {
      const newAnswer = answer.filter((el) => el !== id)
      this.setState({ answer: newAnswer })
    }
  }

  onChange = (event) => {
    const { question, hint } = this.state
    const { activeLanguage } = this.props

    switch (event.target.name) {
      case 'question':
        this.setState({
          [event.target.name]: {
            ...question,
            [activeLanguage.value]: event.target.value,
          },
        })
        break
      case 'hint':
        this.setState({
          [event.target.name]: {
            ...hint,
            [activeLanguage.value]: event.target.value,
          },
        })
        break
      default:
        this.setState({ [event.target.name]: event.target.value })
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { pageId, addTask, task, changeTask, changeEditFlag, type} = this.props
    const { question, choices, answer, hint } = this.state

    const info = {
      question: question,
      choices: choices,
      hint: hint,
    }

    if (task) {
      changeTask(task._id, type, info, answer)
      changeEditFlag()
    } else {
      addTask(pageId, type, info, answer)
    }
  }

  render() {
    const { choices, question, answer, hint } = this.state
    const { taskType, taskOptions, selectChange, activeLanguage, handleLangChange, showConstructor, task } = this.props

    return (
      <>
        <SmartConstructor
          showConstructor={showConstructor}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          modal={!task}
          activeLanguage={activeLanguage}
          taskSelect={{
            taskType: taskType,
            taskOptions: taskOptions,
            selectChange: selectChange,
          }}
          select={{
            handleLangChange: handleLangChange,
          }}
          question={question[activeLanguage.value]}
          hint={hint[activeLanguage.value]}
          options={{
            addChoice: this.addChoice,
            answerChange: this.answerChange,
            setRight: this.setRight,
            deleteChoice: this.deleteChoice,
            data: {
              answer: answer,
              choices: choices,
            },
          }}
        />
      </>
    )
  }
}

TestConstructor.defaultProps = {
  addTask() {},
  changeTask() {},
}

TestConstructor.propTypes = {
  addTask: PropTypes.func,
  changeTask: PropTypes.func,
}
