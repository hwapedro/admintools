import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

import Search from '../../Search'
import { ButtonWrapperConstructor } from '../styleLocal'
import { Wrapper, SelectWrapper } from '../../GlobalStyles/styleGlobal'

import Button from '../../Shared/Button'
import { SmartConstructor } from '../../Shared/SmartConstructor'
import AdminService from '../../../service'

import { i18nSelector } from '../../../store/utils'

const name = 'lesson'
let options = []

class LessonConstructor extends Component {
  state = {
    title: null,
    description: null,
    exam: false,
    courseIndex: { value: 1, label: 'course' },
    difficulty: { value: 1, label: 'Junior' },
    constructor: false,
  }

  componentDidMount() {
    let i18nStart = {}
    i18nSelector.forEach((el) => (i18nStart = { ...i18nStart, [el.value]: '' }))
    this.setState({
      title: i18nStart,
      description: i18nStart,
    })
    const token = localStorage.getItem('token')
    AdminService.getAll(token, 'course')
      .then((response) => {
        options = response.courses.map((element, index) => {
          const option = index + 1
          return { value: option, label: option }
        })
      })
      .catch(console.error())
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { addLesson, course } = this.props
    const { title, description, exam, courseIndex, difficulty } = this.state

    const index = course ? course.courseIndex : courseIndex.value
    const flag = course ? 'course' : name
    console.log(difficulty)
    addLesson(title, description, difficulty.value, exam, index, flag)

    this.setState({
      constructor: !constructor,
      title: null,
      description: null,
      exam: false,
      courseIndex: 0,
      difficulty: { value: 1, label: 'Junior' },
    })
  }

  //TEXT HANDLER
  onChange = (event) => {
    const { title, description } = this.state
    const { activeLanguage } = this.props
    switch (event.target.name) {
      case 'title':
        this.setState({
          [event.target.name]: {
            ...title,
            [activeLanguage.value]: event.target.value,
          },
        })
        break
      case 'description':
        this.setState({
          [event.target.name]: {
            ...description,
            [activeLanguage.value]: event.target.value,
          },
        })
        break
      default:
        this.setState({ [event.target.name]: event.target.value })
    }
  }

  //SELECTOR HANDLER
  handleChange = (value) => {
    this.setState({ courseIndex: value })
  }

  handleDifficultiesChange = (difficulty) => {
    this.setState({ difficulty })
  }

  showConstructor = () => {
    this.setState({
      constructor: !this.state.constructor,
    })
  }

  changeExamProp = (flag) => {
    this.setState({ exam: flag })
  }

  render() {
    const { constructor, exam, difficulty, courseIndex, description, title } = this.state
    const { onChange, value, activeLanguage, handleLangChange } = this.props
    return (
      <Wrapper>
        <ButtonWrapperConstructor>
          <Search onChange={onChange} value={value} />
          <SelectWrapper>
            <Select value={activeLanguage} onChange={handleLangChange} options={i18nSelector} />
          </SelectWrapper>
          <Button buttonStyle={'outlined'} onClick={this.showConstructor}>
            ADD NEW LESSON
          </Button>
          {constructor && (
            <>
              <SmartConstructor
                showConstructor={this.showConstructor}
                onSubmit={this.onSubmit}
                onChange={this.onChange}
                modal={true}
                activeLanguage={activeLanguage}
                difficulty={difficulty}
                courseIndex={courseIndex}
                allCourseIndex={options}
                changeExamProp={this.changeExamProp}
                select={{
                  handleLangChange: handleLangChange,
                }}
                difficulties={{
                  handleDifficultiesChange: this.handleDifficultiesChange,
                }}
                courseindex={{
                  handleChange: this.handleChange,
                }}
                title={title[activeLanguage.value]}
                description={description[activeLanguage.value]}
                exam={exam}
              />
            </>
          )}
        </ButtonWrapperConstructor>
      </Wrapper>
    )
  }
}

export default LessonConstructor

LessonConstructor.defaultProps = {
  value: '',
  course: null,
  addLesson() {},
}

LessonConstructor.propTypes = {
  value: PropTypes.string,
  course: PropTypes.object,
  addLesson: PropTypes.func,
}
