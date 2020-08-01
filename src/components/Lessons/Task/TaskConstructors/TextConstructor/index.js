import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { i18n } from '../../../../../store/utils'
import { SmartConstructor } from '../../../../Shared/SmartConstructor'

const regex = /~((?:.|\n)*?)~/gi

export default class TextConstructor extends Component {
  constructor(props) {
    super()
    this.state = {
      question: props.task ? props.task.info.question : i18n,
      answer: props.task ? props.task.answer : i18n,
      hint: props.task ? props.task.info.hint : i18n,
    }
  }

  onChange = (event) => {
    const { question, hint } = this.state
    const { activeLanguage } = this.props
    switch (event.target.name) {
      case 'hint':
        this.setState({
          [event.target.name]: {
            ...hint,
            [activeLanguage.value]: event.target.value,
          },
        })
        break
      case 'question':
        this.parseAnswer(event.target.value)
        this.setState({
          [event.target.name]: {
            ...question,
            [activeLanguage.value]: event.target.value,
          },
        })
        break
      default:
        this.setState({ [event.target.name]: event.target.value })
    }
  }

  parseAnswer = (string) => {
    const { answer } = this.state
    const { activeLanguage } = this.props
    const answerRegex = string.match(regex) || []

    this.setState({
      answer: { ...answer, [activeLanguage.value]: [...answerRegex.map((el) => el.replace(/~/g, ''))] },
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { pageId, addTask, task, changeTask, changeEditFlag } = this.props
    const { question, answer, points, hint } = this.state
    const type = 'fill'
    for (let prop in question) {
      question[prop] = question[prop].replace(regex, '༼ つ ◕_◕ ༽つ')
    }

    const info = {
      points: points,
      question: question,
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
    const { question, hint } = this.state
    const { activeLanguage, handleLangChange, taskType, taskOptions, selectChange, showConstructor, task } = this.props

    return (
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
        additional={'put words in ~ ~ to mark as answer'}
      />
    )
  }
}

TextConstructor.defaultProps = {
  addTask() {},
  changeTask() {},
}

TextConstructor.propTypes = {
  addTask: PropTypes.func,
  changeTask: PropTypes.func,
}
