import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Droppable } from 'react-beautiful-dnd'
import { withRouter } from 'react-router-dom'

import Course from './Course'
import { SmartConstructor } from '../../Shared/SmartConstructor'

import { ElementsWrapper } from '../styleLocal'
import { Wrapper, EmptyMessage, ElementWrapper } from '../../GlobalStyles/styleGlobal'

const name = 'course'

class CourseList extends Component {
  state = {
    title: null,
    annotation: null,
    description: null,
    changeFlag: false,
    courseIndex: null,
  }

  getParams = (courseIndex, title, annotation, description) => {
    this.setState({
      changeFlag: true,
      courseIndex: courseIndex,
      title: title,
      annotation: annotation,
      description: description,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { title, annotation, description, courseIndex } = this.state
    const { changeCourse } = this.props

    if (title && description) changeCourse(courseIndex, title, annotation, description, name)
    this.setState({ changeFlag: false, courseIndex: null })
  }

  showConstructor = () => {
    const { changeFlag } = this.state
    if (changeFlag) {
      this.setState({
        changeFlag: !changeFlag,
      })
    }
  }

  deleteItem = (courseIndex) => {
    const { delCourse } = this.props
    delCourse(courseIndex, name)
  }

  //TEXT HANDLER
  onChange = (event) => {
    const { title, annotation, description } = this.state
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
      case 'annotation':
        this.setState({
          [event.target.name]: {
            ...annotation,
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

  goTo = (id) => {
    this.props.setLoading(true)
    this.props.history.push(`/course/${id}`)
  }

  render() {
    const { courses, search, activeLanguage, handleLangChange } = this.props
    const { changeFlag, courseIndex, title, annotation, description } = this.state

    let list = courses
      .filter((course) => {
        if (course.title[activeLanguage.value].toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          return true
        }
        return false
      })
      .map((course, index) => {
        if (changeFlag && course.courseIndex === courseIndex) {
          return (
            <ElementWrapper key={course.courseIndex}>
              <SmartConstructor
                showConstructor={this.showConstructor}
                onSubmit={this.onSubmit}
                onChange={this.onChange}
                activeLanguage={activeLanguage}
                select={{
                  handleLangChange: handleLangChange,
                }}
                title={title[activeLanguage.value]}
                annotation={annotation[activeLanguage.value]}
                description={description[activeLanguage.value]}
              />
            </ElementWrapper>
          )
        } else {
          return (
            <Course
              key={course.courseIndex}
              course={course}
              index={index}
              getParams={this.getParams}
              deleteItem={this.deleteItem}
              goTo={this.goTo}
              activeLanguage={activeLanguage}
            />
          )
        }
      })
    return (
      <Wrapper>
        {courses.length === 0 || list.length === 0 ? (
          <EmptyMessage>There is nothing here yet</EmptyMessage>
        ) : (
          <Droppable droppableId="droppable">
            {(provided) => (
              <ElementsWrapper ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                {list}
                {provided.placeholder}
              </ElementsWrapper>
            )}
          </Droppable>
        )}
      </Wrapper>
    )
  }
}

export default withRouter(CourseList)

CourseList.defaultProps = {
  courses: [],

  changeCourse() {},
  delCourse() {},
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object),

  delCourse: PropTypes.func,
  changeCourse: PropTypes.func,
}
