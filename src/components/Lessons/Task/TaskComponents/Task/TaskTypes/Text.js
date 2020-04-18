import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { TaskElementWrapper, LabelElement, TitleSpan, ButtonsWrapper, TaskWrapper } from '../../../styleLocal'

import Button from '../../../../../Shared/Button'
import TextConstructor from '../../../TaskConstructors/TextConstructor/'

class Text extends Component {
  render() {
    const { task, page, deleteTask, changeEditFlag, taskEditFlag, lessonId, changeTask, activeLanguage, handleLangChange } = this.props

    for (let language in task.info.question) {
      const string = task.info.question[language].split('༼ つ ◕_◕ ༽つ')
      task.info.question[language] = string.map((el, index) => (string.length - 1 !== index ? el + ` ~${task.answer[language][index]}~` : el)).join('')
    }

    return (
      <TaskWrapper>
        {taskEditFlag ? (
          <TaskElementWrapper>
            <TextConstructor
              task={task}
              pageId={page._id}
              changeEditFlag={changeEditFlag}
              changeTask={changeTask}
              activeLanguage={activeLanguage}
              handleLangChange={handleLangChange}
            />
          </TaskElementWrapper>
        ) : (
          <TaskElementWrapper key={task._id}>
            <LabelElement>Question:</LabelElement>
            <TitleSpan>{task.info.question[activeLanguage.value]}</TitleSpan>

            <LabelElement>Answers:</LabelElement>
            <TitleSpan>{task.answer[activeLanguage.value].join(' , ')}</TitleSpan>

            <ButtonsWrapper>
              <Button buttonStyle={'outlined'} onClick={() => changeEditFlag()}>
                Edit
              </Button>
              <Button
                buttonStyle={'outlined'}
                onClick={() => {
                  if (window.confirm('ARE YOU SURE ?')) {
                    deleteTask(page._id, task._id, lessonId)
                  }
                }}
              >
                Delete
              </Button>
            </ButtonsWrapper>
          </TaskElementWrapper>
        )}
      </TaskWrapper>
    )
  }
}

Text.defaultProps = {
  task: {},
  page: {},
  lessonId: null,
  taskEditFlag: false,
  changeEditFlag() {},
  deleteTask() {},
}

Text.propTypes = {
  task: PropTypes.object,
  page: PropTypes.object,
  lessonId: PropTypes.string.isRequired,
  taskEditFlag: PropTypes.bool,
  changeEditFlag: PropTypes.func,
  deleteTask: PropTypes.func,
}

export default Text
