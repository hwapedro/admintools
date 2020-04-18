import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

import { DescriptionSpan, ImgMark, ImgCross, ExamPropContainer, ElementWrapper } from '../styleLocal'
import { Wrapper, LabelElement, ButtonWrapper, EmptyMessage, SelectWrapper } from '../../GlobalStyles/styleGlobal'

import Button from '../../Shared/Button'
import CustomInput from '../../Shared/Input'
import Spinner from '../../Spinner'
import PageList from '../../Pages/PageList'
import { SmartContainer } from '../../Shared/SmartContainer'
import { HashTagsContainer } from '../../Shared/SmartContainer/HashTagsContainer'
import { SmartConstructor } from '../../Shared/SmartConstructor'
import PageConstructor from '../../Pages/PageConstructor'
import Error from '../../Error'
import AdminService from '../../../service'
import Editor from '../../Shared/Editor'

import checkMark from '../../../img/good.png'
import redCross from '../../../img/bad.png'
import { i18nSelector } from '../../../store/utils'

const name = 'lesson'
let options = []

export default class Lesson extends Component {
  state = {
    title: null,
    description: null,
    changeFlag: false,
    courseIndex: { value: null, label: null },
    lessonId: null,
    exam: null,
    activeLanguage: { label: 'Russian', value: 'ru' },
  }

  componentDidMount() {
    const { getLesson, itemId } = this.props
    const token = localStorage.getItem('token')

    getLesson(itemId)

    AdminService.getAll(token, 'course')
      .then((response) => {
        options = response.courses.map((element, index) => {
          const option = index + 1
          return { value: option, label: option }
        })
      })
      .catch(console.error())
  }

  //SELECTOR HANDLER

  handleChange = (value, selectorType) => {
    switch (selectorType) {
      case 'course':
        this.setState({ courseIndex: value })
        break
      case 'language':
        this.setState({ activeLanguage: value })
        break
      default:
        return
    }
  }

  changeExamProp = (exam) => {
    this.setState({ exam: !exam })
  }

  getParams = (lessonId, title, description, exam, courseIndex) => {
    this.setState({
      lessonId: lessonId,
      changeFlag: true,
      courseIndex: courseIndex,
      exam: exam,
      title: title,
      description: description,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { changeLesson } = this.props
    const { title, description, lessonId, exam, courseIndex } = this.state
    if (title && description) changeLesson(lessonId, title, description, exam, courseIndex.value)
    this.setState({ changeFlag: false, lessonId: null })
  }

  showConstructor = () => {
    const { changeFlag } = this.state
    if (changeFlag) {
      this.setState({
        changeFlag: !changeFlag,
      })
    }
  }

  //TEXT HANDLER
  onChange = (event) => {
    const { title, description, activeLanguage } = this.state
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

  render() {
    const { lesson, pages, loading, deletePage, error, addPage } = this.props
    const { changeFlag, courseIndex, title, description, exam, activeLanguage } = this.state
    return (
      <>
        {error && (
          <>
            <Error name={name} />
          </>
        )}

        {loading && (
          <>
            <Spinner />
          </>
        )}
        {!error && !loading && (
          <Wrapper>
            {changeFlag ? (
              <>
                {/* <SmartConstructor
                  showConstructor={this.showConstructor}
                  onSubmit={this.onSubmit}
                  onChange={this.onChange}
                  modal={true}
                  activeLanguage={activeLanguage}
                  select={{
                    handleChange: this.handleChange,
                  }}
                  title={title[activeLanguage.value]}
                  description={description[activeLanguage.value]}
                /> */}
                <ElementWrapper>
                  <form onSubmit={this.onSubmit}>
                    <Select
                      value={activeLanguage}
                      onChange={(value, {}, selectorType = 'language') => this.handleChange(value, selectorType)}
                      options={i18nSelector}
                      maxMenuHeight={100}
                    />
                    <CustomInput label="Title" placeholder="Title goes here" name="title" value={title[activeLanguage.value]} onChange={this.onChange} required={true} />
                    <LabelElement>Description of Lesson : </LabelElement>
                    <Editor onChange={this.onChange} name="description" value={description[activeLanguage.value]} language={activeLanguage.value} />
                    <ExamPropContainer>
                      <LabelElement>EXAM :</LabelElement>
                      <ImgMark src={exam ? checkMark : redCross} onClick={() => this.changeExamProp(exam)} />
                    </ExamPropContainer>
                    <LabelElement>Course Index :</LabelElement>
                    <Select value={courseIndex} onChange={(value, {}, selectorType = 'course') => this.handleChange(value, selectorType)} options={options} />

                    <ButtonWrapper>
                      <Button buttonStyle={'outlined'} type="submit">
                        CONFIRM
                      </Button>
                    </ButtonWrapper>
                  </form>
                </ElementWrapper>
              </>
            ) : (
              <>
                <SelectWrapper>
                  <Select value={activeLanguage} onChange={(value, {}, selectorType = 'language') => this.handleChange(value, selectorType)} options={i18nSelector} />
                </SelectWrapper>
                <ElementWrapper key={lesson._id}>
                  <div style={{ position: 'relative' }}>
                    <SmartContainer
                      name="Lesson"
                      title={lesson.title[activeLanguage.value]}
                      description={lesson.description[activeLanguage.value]}
                      exam={lesson.exam}
                      courseIndex={lesson.courseIndex}
                    />
                    <HashTagsContainer course={lesson.courseIndex} exam={lesson.exam} />
                    <ButtonWrapper>
                      <Button
                        buttonStyle={'outlined'}
                        onClick={() => this.getParams(lesson._id, lesson.title, lesson.description, lesson.exam, { value: lesson.courseIndex, label: lesson.courseIndex })}
                      >
                        CHANGE Lesson
                      </Button>
                    </ButtonWrapper>
                  </div>
                </ElementWrapper>

                <PageConstructor lessonId={lesson._id} addPage={addPage} />
              </>
            )}
            {pages.length === 0 ? (
              <EmptyMessage>There is nothing here yet</EmptyMessage>
            ) : (
              <PageList lessonId={lesson._id} pages={pages} id={lesson._id} deletePage={deletePage} activeLanguage={activeLanguage} />
            )}
          </Wrapper>
        )}
      </>
    )
  }
}

Lesson.defaultProps = {
  pages: [],
  lesson: {},
  loading: false,
  error: false,

  getLesson() {},
  changeLesson() {},
  setTask() {},
}

Lesson.propTypes = {
  pages: PropTypes.array,
  lesson: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,

  getLesson: PropTypes.func,
  changeLesson: PropTypes.func,
  setTask: PropTypes.func,
}
