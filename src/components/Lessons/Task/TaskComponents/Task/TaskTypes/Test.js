import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'

import { TaskElementWrapper, LabelElement, ButtonWrapper, ButtonsWrapper } from '../../../styleLocal'

import { OptionSpan, OptionsWrapper, TaskWrapper, TitleSpan, ElementWrapper } from '../styleLocal'

import Button from '../../../../../Shared/Button'
import TestConstructor from '../../../TaskConstructors/TestConstructor/'

class Test extends Component {
  render() {
    const { task, pageId, type, deleteTask, changeEditFlag, taskEditFlag, lessonId, changeTask, activeLanguage, handleLangChange } = this.props

    return (
      <TaskWrapper>
        <>
          {taskEditFlag ? (
            <TaskElementWrapper>
              <TestConstructor
                type={type}
                task={task}
                pageId={pageId}
                changeEditFlag={changeEditFlag}
                changeTask={changeTask}
                activeLanguage={activeLanguage}
                handleLangChange={handleLangChange}
              />
            </TaskElementWrapper>
          ) : (
            <TaskWrapper>
              <ElementWrapper>
                <LabelElement>type</LabelElement>
                <TitleSpan>{type}</TitleSpan>
              </ElementWrapper>
              <ElementWrapper>
                <LabelElement>question </LabelElement>
                <TitleSpan>{task.info.question[activeLanguage.value]}</TitleSpan>
              </ElementWrapper>
              <ElementWrapper>
                <LabelElement>hint </LabelElement>
                <TitleSpan>{task.info.hint[activeLanguage.value]}</TitleSpan>
              </ElementWrapper>
              <OptionsWrapper>
                {task.info.choices.map((option) => {
                  return <OptionSpan right={task.answer.find((answ) => answ === option.i) !== undefined}>{option.c[activeLanguage.value]} </OptionSpan>
                })}
              </OptionsWrapper>
              <div>
                <ButtonsWrapper>
                  <ButtonWrapper>
                    <Button startIcon={<CreateIcon />} buttonStyle={'outlined'} onClick={() => changeEditFlag()}>
                      Edit
                    </Button>
                  </ButtonWrapper>
                  <ButtonWrapper>
                    <Button
                      startIcon={<DeleteIcon />}
                      buttonColor="secondary"
                      buttonStyle={'outlined'}
                      onClick={() => {
                        if (window.confirm('ARE YOU SURE ?')) {
                          deleteTask(pageId, task._id, lessonId)
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </ButtonWrapper>
                </ButtonsWrapper>
              </div>
            </TaskWrapper>
          )}
        </>
      </TaskWrapper>
    )
  }
}
Test.defaultProps = {
  task: {},
  pageId: null,
  lessonId: null,
  taskEditFlag: false,
  changeEditFlag() {},
  deleteTask() {},
}

Test.propTypes = {
  task: PropTypes.object,
  pageId: PropTypes.string.isRequired,
  lessonId: PropTypes.string.isRequired,
  taskEditFlag: PropTypes.bool,
  changeEditFlag: PropTypes.func,
  deleteTask: PropTypes.func,
}

export default Test
