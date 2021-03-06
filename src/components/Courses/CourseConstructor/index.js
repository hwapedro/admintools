import React, { Component } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import AddIcon from '@material-ui/icons/Add'

import Search from '../../Search'
import Button from '../../Shared/Button'

import { ButtonWrapperConstructor } from '../styleLocal'
import { SmartConstructor } from '../../Shared/SmartConstructor'

import { Wrapper, SelectWrapper } from '../../GlobalStyles/styleGlobal'
import { i18nSelector } from '../../../store/utils'

export default class CourseCounstructor extends Component {
  state = {
    title: null,
    annotation: null,
    description: null,
    constructor: false,
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

  showConstructor = () => {
    const { constructor } = this.state
    this.setState({
      constructor: !constructor,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { addCourses } = this.props
    const { title, annotation, description } = this.state
    this.showConstructor()
    addCourses(title, annotation, description)
  }

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

  render() {
    const { onChange, value, activeLanguage, handleLangChange } = this.props
    const { title, constructor, annotation, description } = this.state
    return (
      <Wrapper>
        <ButtonWrapperConstructor>
          <Search onChange={onChange} value={value} />
          <SelectWrapper>
            <Select value={activeLanguage} onChange={handleLangChange} options={i18nSelector} />
          </SelectWrapper>
          <Button startIcon={<AddIcon />} buttonStyle={'outlined'} onClick={this.showConstructor}>
            COURSE
          </Button>
          {constructor && (
            <SmartConstructor
              showConstructor={this.showConstructor}
              onSubmit={this.onSubmit}
              onChange={this.onChange}
              modal={true}
              activeLanguage={activeLanguage}
              select={{
                handleLangChange: handleLangChange,
              }}
              title={title[activeLanguage.value]}
              annotation={annotation[activeLanguage.value]}
              description={description[activeLanguage.value]}
            />
          )}
        </ButtonWrapperConstructor>
      </Wrapper>
    )
  }
}

CourseCounstructor.defaultProps = {
  addCourses() {},
}

CourseCounstructor.propTypes = {
  addCourses: PropTypes.func,
}
