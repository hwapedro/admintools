import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../../Shared/Button'

import { ElementWrapper } from '../../../GlobalStyles/styleGlobal'
import { ButtonWrapper } from '../../../GlobalStyles/styleGlobal'

import LessonContainer from './LessonContainer'
import { SmartContainer } from '../../../Shared/SmartContainer'
import { HashTagsContainer } from '../../../Shared/SmartContainer/HashTagsContainer'

const LessonSwitcher = ({ lesson, deleteItem, goTo, activeLanguage }) => (
  <div style={{ position: 'relative' }}>
    <SmartContainer name="Lesson" title={lesson.title[activeLanguage.value]} description={lesson.description[activeLanguage.value]} />
    <HashTagsContainer course={lesson.courseIndex} exam={lesson.exam} difficulty={lesson.difficulty}/>
    <ButtonWrapper>
      <Button buttonStyle={'outlined'} onClick={() => goTo(lesson._id)}>
        CHANGE Lesson
      </Button>
      <Button
        buttonStyle={'outlined'}
        onClick={() => {
          if (window.confirm('Delete the item?')) {
            deleteItem(lesson._id)
          }
        }}
      >
        DELETE Lesson
      </Button>
    </ButtonWrapper>
  </div>
)

const Lesson = ({ lesson, deleteItem, index, goTo, course, activeLanguage }) => {
  if (course) {
    return (
      <LessonContainer lesson={lesson} index={index}>
        <LessonSwitcher lesson={lesson} deleteItem={deleteItem} goTo={goTo} activeLanguage={activeLanguage} />
      </LessonContainer>
    )
  } else {
    return (
      <ElementWrapper key={lesson._id}>
        <LessonSwitcher lesson={lesson} deleteItem={deleteItem} goTo={goTo} activeLanguage={activeLanguage} />
      </ElementWrapper>
    )
  }
}

Lesson.defaultProps = {
  lesson: {},
  activeLanguage: {},
  course: null,
  index: null,

  goTo() {},
  deleteItem() {},
}

Lesson.propTypes = {
  lesson: PropTypes.object,
  activeLanguage: PropTypes.object,
  course: PropTypes.object,
  index: PropTypes.number,

  goTo: PropTypes.func,
  deleteItem: PropTypes.func,
}

export default Lesson
