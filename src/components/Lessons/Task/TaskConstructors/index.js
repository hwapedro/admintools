import React, { Component } from 'react'
import Select from 'react-select'
import AddIcon from '@material-ui/icons/Add'

import { ConsturctorWrapper, DarkGround } from '../../../GlobalStyles/styleGlobal'

import Button from '../../../Shared/Button'
import TestConstructor from './TestConstructor/'
import TextConstructor from './TextConstructor/'

const options = [
  { value: 'test', label: 'Test' },
  { value: 'fill', label: 'Fill' },
  { value: 'drag', label: 'Drag' },
]

export default class TaskConstructor extends Component {
  state = {
    displayConstructor: false,
    displayTaskConstructor: { value: 'test', label: 'Test' },
    activeLanguage: { label: 'Russian', value: 'ru' },
    taskEditFlag: false,
  }

  displayConstructor = () => {
    const displayConstructor = this.state.displayConstructor
    this.setState({ displayConstructor: !displayConstructor })
  }

  selectChange = (displayTaskConstructor) => {
    this.setState({
      displayTaskConstructor,
    })
  }

  handleLangChange = (activeLanguage) => {
    this.setState({ activeLanguage })
  }

  constSwitch = (displayTaskConstructor) => {
    const { addTask, changeTask } = this.props
    const { activeLanguage } = this.state
    switch (displayTaskConstructor.value) {
      case 'test':
        return (
          <TestConstructor
            oldInfo={this.state.info}
            edited={false}
            pageId={this.props.pageId}
            activeLanguage={activeLanguage}
            handleLangChange={(activeLanguage) => this.handleLangChange(activeLanguage)}
            addTask={(pageid, type, info, answer) => addTask(pageid, type, info, answer)}
            changeTask={(taskId, type, info, answer) => changeTask(taskId, type, info, answer)}
          />
        )
      case 'fill':
        return (
          <TextConstructor
            pageId={this.props.pageId}
            activeLanguage={activeLanguage}
            handleLangChange={(activeLanguage) => this.handleLangChange(activeLanguage)}
            addTask={(pageid, type, info, answer) => addTask(pageid, type, info, answer)}
            changeTask={(taskId, type, info, answer) => changeTask(taskId, type, info, answer)}
          />
        )
      case 'drag':
        return (
          <TestConstructor
            oldInfo={this.state.info}
            edited={false}
            pageId={this.props.pageId}
            activeLanguage={activeLanguage}
            handleLangChange={(activeLanguage) => this.handleLangChange(activeLanguage)}
            addTask={(pageid, type, info, answer) => addTask(pageid, type, info, answer)}
            changeTask={(taskId, type, info, answer) => changeTask(taskId, type, info, answer)}
          />
        )
      default:
        return <div />
    }
  }

  getParams = (name, description, question, id) => {
    this.setState({
      taskEditFlag: true,
      info: { name, description, question, id },
    })
  }

  render() {
    const { displayConstructor, displayTaskConstructor } = this.state

    return (
      <>
        {displayConstructor ? (
          <>
            <DarkGround onClick={this.displayConstructor} />
            <ConsturctorWrapper style={{ textAlign: 'left' }}>
              <Select value={displayTaskConstructor} options={options} maxMenuHeight={100} onChange={this.selectChange} />

              {this.constSwitch(displayTaskConstructor)}
            </ConsturctorWrapper>
          </>
        ) : (
          <Button startIcon={<AddIcon />} buttonStyle={'outlined'} onClick={this.displayConstructor}>
             Task
          </Button>
        )}
      </>
    )
  }
}
