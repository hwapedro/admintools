import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import CreateIcon from '@material-ui/icons/Create'

import { ElementWrapper } from '../styleLocal'
import { Wrapper, ButtonWrapper, EmptyMessage, SelectWrapper } from '../../GlobalStyles/styleGlobal'

import Button from '../../Shared/Button'
import Spinner from '../../Spinner'
import PageList from '../../Pages/PageList'
import { SmartContainer } from '../../Shared/SmartContainer'
import { HashTagsContainer } from '../../Shared/SmartContainer/HashTagsContainer'
import { SmartConstructor } from '../../Shared/SmartConstructor'
import PageConstructor from '../../Pages/PageConstructor'
import Error from '../../Error'
import AdminService from '../../../service'

import { i18nSelector, lessonDifficulties } from '../../../store/utils'

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

  handleChange = (value) => {
    this.setState({ courseIndex: value })
  }

  handleDifficultiesChange = (difficulty) => {
    this.setState({ difficulty })
  }

  handleLangChange = (activeLanguage) => {
    this.setState({ activeLanguage })
  }

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

  changeExamProp = (flag) => {
    this.setState({ exam: flag })
  }

  getParams = (lessonId, title, description, exam, difficulty, courseIndex) => {
    this.setState({
      lessonId: lessonId,
      changeFlag: true,
      courseIndex: courseIndex,
      exam: exam,
      title: title,
      description: description,
      difficulty: difficulty,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { changeLesson } = this.props
    const { title, description, lessonId, exam, difficulty, courseIndex } = this.state
    if (title && description) changeLesson(lessonId, title, description, exam, difficulty.value, courseIndex.value)
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
    const { lesson, pages, loading, deletePage, error, addPage, changePage } = this.props
    const { changeFlag, courseIndex, title, description, exam, activeLanguage, difficulty } = this.state
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
              <ElementWrapper>
                <SmartConstructor
                  showConstructor={this.showConstructor}
                  onSubmit={this.onSubmit}
                  onChange={this.onChange}
                  activeLanguage={activeLanguage}
                  difficulty={difficulty}
                  courseIndex={courseIndex}
                  allCourseIndex={options}
                  changeExamProp={this.changeExamProp}
                  select={{
                    handleLangChange: this.handleLangChange,
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
              </ElementWrapper>
            ) : (
              <>
                <SelectWrapper>
                  <Select value={activeLanguage} onChange={this.handleLangChange} options={i18nSelector} />
                </SelectWrapper>
                <ElementWrapper key={lesson._id}>
                  <div style={{ position: 'relative' }}>
                    <SmartContainer name="Lesson" title={lesson.title[activeLanguage.value]} description={lesson.description[activeLanguage.value]} />
                    <HashTagsContainer course={lesson.courseIndex} exam={lesson.exam} difficulty={lesson.difficulty} />
                    <ButtonWrapper>
                      <PageConstructor lessonId={lesson._id} addPage={addPage} />
                      <Button
                        buttonStyle={'outlined'}
                        startIcon={<CreateIcon />}
                        onClick={() =>
                          this.getParams(
                            lesson._id,
                            lesson.title,
                            lesson.description,
                            lesson.exam,
                            { value: lesson.difficulty, label: lessonDifficulties.find((el) => el.value === lesson.difficulty).label },
                            { value: lesson.courseIndex, label: lesson.courseIndex }
                          )
                        }
                      >
                        CHANGE
                      </Button>
                    </ButtonWrapper>
                  </div>
                </ElementWrapper>
              </>
            )}
            {pages.length === 0 ? (
              <EmptyMessage>There is nothing here yet</EmptyMessage>
            ) : (
              <PageList lessonId={lesson._id} pages={pages} id={lesson._id} changePage={changePage} deletePage={deletePage} activeLanguage={activeLanguage} />
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
