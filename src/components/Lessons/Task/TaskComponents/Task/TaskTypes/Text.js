import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'

import { TaskElementWrapper, LabelElement, ButtonsWrapper } from '../../../styleLocal'

import { TaskWrapper, TitleSpan, ElementWrapper } from '../styleLocal'

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
          <TaskWrapper>
            <ElementWrapper>
              <LabelElement>type </LabelElement>
              <TitleSpan>fill</TitleSpan>
            </ElementWrapper>
            <ElementWrapper>
              <LabelElement>question </LabelElement>
              <TitleSpan>{task.info.question[activeLanguage.value]}</TitleSpan>
            </ElementWrapper>
            <ElementWrapper>
              <LabelElement>Answers:</LabelElement>
              <TitleSpan>{task.answer[activeLanguage.value].join(' , ')}</TitleSpan>
            </ElementWrapper>
            <ButtonsWrapper>
              <Button startIcon={<CreateIcon />} buttonStyle={'outlined'} onClick={() => changeEditFlag()}>
                Edit
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                buttonColor="secondary"
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
          </TaskWrapper>
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
