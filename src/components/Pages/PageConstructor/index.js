import React, { Component } from 'react'
import PropTypes, { number } from 'prop-types'
import Select from 'react-select'

import { Wrapper, LabelElement, ButtonWrapper, EmptyMessage, SelectWrapper } from '../../GlobalStyles/styleGlobal'

import Button from '../../Shared/Button'
import CustomInput from '../../Shared/Input'
import Spinner from '../../Spinner'
import PageList from '../../Pages/PageList'
import { SmartContainer } from '../../Shared/SmartContainer'
import { HashTagsContainer } from '../../Shared/SmartContainer/HashTagsContainer'
import { SmartConstructor } from '../../Shared/SmartConstructor'
import Error from '../../Error'
import AdminService from '../../../service'
import Editor from '../../Shared/Editor'

import { i18nSelector } from '../../../store/utils'

const name = 'lesson'

export default class PageConstructor extends Component {
  state = {
    title: null,
    description: null,
    changeFlag: false,
    lessonId: null,
    exam: null,
    taskOnPage: 1,
    activeLanguage: { label: 'Russian', value: 'ru' },
  }

  componentDidMount() {
    let i18nStart = {}
    i18nSelector.forEach((el) => (i18nStart = { ...i18nStart, [el.value]: '' }))
    this.setState({
      title: i18nStart,
      annotation: i18nStart,
      description: i18nStart,
    })
  }

  //SELECTOR HANDLER
  handleLangChange = (activeLanguage) => {
    this.setState({ activeLanguage })
  }

  getParams = (lessonId, title, description, exam) => {
    this.setState({
      //   lessonId: lessonId,
      changeFlag: true,
      //   title: title,
      //   description: description,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { title, description } = this.state
    const { addPage, lessonId } = this.props
    addPage(lessonId, title, description, [], 0)
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

  addNewPage = () => {}

  render() {
    const { loading, error } = this.props
    const { title, description, activeLanguage, changeFlag, taskOnPage } = this.state
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
          <>
            {changeFlag ? (
              <Wrapper>
                <SmartConstructor
                  showConstructor={this.showConstructor}
                  onSubmit={this.onSubmit}
                  onChange={this.onChange}
                  modal={true}
                  activeLanguage={activeLanguage}
                  select={{
                    handleLangChange: this.handleLangChange,
                  }}
                  taskOnPage={{
                    value: taskOnPage,
                    type: 'number'
                  }}
                  title={title[activeLanguage.value]}
                  description={description[activeLanguage.value]}
                />
                <ButtonWrapper>
                  <Button buttonStyle={'outlined'} type="submit">
                    Add Page
                  </Button>
                </ButtonWrapper>
              </Wrapper>
            ) : (
              <ButtonWrapper>
                <Button buttonStyle={'outlined'} onClick={() => this.getParams()}>
                  Add Page
                </Button>
              </ButtonWrapper>
            )}
          </>
        )}
      </>
    )
  }
}

PageConstructor.defaultProps = {
  pages: [],
  lesson: {},
  loading: false,
  error: false,

  getLesson() {},
  changeLesson() {},
  setTask() {},
}

PageConstructor.propTypes = {
  pages: PropTypes.array,
  lesson: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,

  getLesson: PropTypes.func,
  changeLesson: PropTypes.func,
  setTask: PropTypes.func,
}
