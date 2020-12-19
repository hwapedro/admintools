import React, { Component } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import AddIcon from '@material-ui/icons/Add'

import Search from '../../Search'
import Button from '../../Shared/Button'
import { SmartConstructor } from '../../Shared/SmartConstructor'

import { ButtonWrapperConstructor } from '../styleLocal'
import { Wrapper, SelectWrapper } from '../../GlobalStyles/styleGlobal'
import { getBase64, i18nSelector, i18n } from '../../../store/utils'

class SetArticle extends Component {
  state = {
    title: i18n,
    description: i18n,
    icon: null,
    constructor: false,
  }

  onChangeIcon = (photo) => {
    if (photo[0]) {
      getBase64(photo[0]).then((icon) => {
        this.setState({ icon: icon })
      })
    }
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
    const { title, description, icon } = this.state

    addNews(title, description, icon)
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
    const { title, constructor, description, icon } = this.state

    return (
      <Wrapper>
        <ButtonWrapperConstructor>
          <Search onChange={onChange} value={value} />
          <SelectWrapper>
            <Select value={activeLanguage} onChange={handleLangChange} options={i18nSelector} />
          </SelectWrapper>
          <Button startIcon={<AddIcon />} buttonStyle={'outlined'} onClick={this.showConstructor}>
            ARTICLE
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
              image={{
                value: icon,
                onChangeIcon: this.onChangeIcon,
              }}
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
