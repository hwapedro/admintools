import React, { Component } from 'react'
import Select from 'react-select'

import PropTypes from 'prop-types'

import { OptionsWrapper, OptionElementWrapper, OptionInput, CheckboxInput, ConsturctorForm } from '../../styleLocal'

import { ButtonWrapper } from '../../../../GlobalStyles/styleGlobal'
import Button from '../../../../Shared/Button'
import CustomInput from '../../../../Shared/Input'
import { i18nSelector, i18n } from '../../../../../store/utils'

const type = 'test'

export default class TestConstructor extends Component {
  constructor(props) {
    super()
    this.state = {
      question: props.task ? props.task.info.question : i18n,
      points: props.task ? props.task.info.points : 1,
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
      case 'points':
        this.setState({
          points: event.target.value,
        })
        break
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
    const { pageId, addTask, task, changeTask, changeEditFlag } = this.props
    const { points, question, choices, answer, hint } = this.state

    const info = {
      points: points,
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
    const { choices, points, question, answer, hint } = this.state
    const { activeLanguage, handleLangChange } = this.props

    return (
      <>
        <ConsturctorForm onSubmit={this.onSubmit}>
          <Select value={activeLanguage} onChange={handleLangChange} options={i18nSelector} maxMenuHeight={100} />

          <CustomInput label="Amount of point" name="points" value={points} onChange={this.onChange} required={false} />
          <CustomInput label="Question" placeholder="Who are you?" name="question" value={question[activeLanguage.value]} onChange={this.onChange} required={false} />
          <ButtonWrapper>
            <Button buttonStyle={'outlined'} onClick={this.addChoice}>
              Add answer option
            </Button>
          </ButtonWrapper>

          <div>
            {choices.length !== 0 &&
              choices.map((el) => {
                return (
                  <OptionsWrapper className="form-check" key={el.i}>
                    <OptionElementWrapper>
                      <OptionInput name="answer" value={el.c[activeLanguage.value]} onChange={(e) => this.answerChange(el.i, e)} label="Answer" placeholder="Answer" />
                      <CheckboxInput type="checkbox" checked={answer.includes(el.i)} onChange={(e) => this.setRight(el.i, e)} />
                      <Button buttonStyle={'outlined'} onClick={() => this.deleteChoice(el.i)}>
                        Delete option
                      </Button>
                    </OptionElementWrapper>
                  </OptionsWrapper>
                )
              })}
          </div>
          <CustomInput label="Hint" name="hint" value={hint[activeLanguage.value]} onChange={this.onChange} required={false} />
          <ButtonWrapper>
            <Button buttonStyle={'outlined'} type="submit">
              Save
            </Button>
          </ButtonWrapper>
        </ConsturctorForm>
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
