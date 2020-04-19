import React, { Component } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

import Search from '../../Search'
import Button from '../../Shared/Button'
import { SmartConstructor } from '../../Shared/SmartConstructor'

import { ButtonWrapperConstructor } from '../styleLocal'
import { Wrapper, SelectWrapper } from '../../GlobalStyles/styleGlobal'
import { i18nSelector, i18n } from '../../../store/utils'

class SetArticle extends Component {
  state = {
    title: i18n,
    description: i18n,
    constructor: false,
  }

  componentDidMount() {
    let i18nStart = {}
    i18nSelector.forEach((el) => (i18nStart = { ...i18nStart, [el.value]: '' }))
    this.setState({
      title: i18nStart,
      description: i18nStart,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { addNews } = this.props
    const { title, description } = this.state

    addNews(title, description)
    this.showConstructor()
    this.setState({
      constructor: !this.state.constructor,
    })
  }

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

  showConstructor = () => {
    const { constructor } = this.state
    this.setState({
      constructor: !constructor,
    })
  }

  render() {
    const { onChange, value, activeLanguage, handleLangChange } = this.props
    const { title, constructor, description } = this.state

    return (
      <Wrapper>
        <ButtonWrapperConstructor>
          <Search onChange={onChange} value={value} />
          <SelectWrapper>
            <Select value={activeLanguage} onChange={handleLangChange} options={i18nSelector} />
          </SelectWrapper>
          <Button buttonStyle={'outlined'} onClick={this.showConstructor}>
            ADD NEW ARTICLE
          </Button>
        </ButtonWrapperConstructor>
        {constructor && (
          <>
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
              description={description[activeLanguage.value]}
            />
          </>
        )}
      </Wrapper>
    )
  }
}

export default SetArticle

SetArticle.defaultProps = {
  addNews() {},
}

SetArticle.propTypes = {
  addNews: PropTypes.func,
}
