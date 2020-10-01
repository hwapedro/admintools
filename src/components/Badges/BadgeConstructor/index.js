import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import ButtonMaterial from '@material-ui/core/Button'
import Button from '../../Shared/Button'
import CustomInput from '../../Shared/Input'
import Search from '../../Search'

import { ButtonWrapperConstructor, DescriptionTextArea } from '../styleLocal'
import { DarkGround, ConsturctorForm, ConsturctorWrapper, ButtonWrapper, SelectWrapper } from '../../GlobalStyles/styleGlobal'
import { Wrapper, LabelElement } from '../../GlobalStyles/styleGlobal'
import { getBase64, i18nSelector } from '../../../store/utils'

export default class BadgeConstructor extends Component {
  state = {
    title: null,
    description: null,
    constructor: false,
    icon: null,
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
    const { addBadge } = this.props
    const { title, description, icon } = this.state
    const type = title.ru.toLowerCase().replace(/\s/g, '-')
    addBadge(title, description, icon, type)
  }

  onChange = (event) => {
    const { title, description } = this.state
    const { activeLanguage } = this.props

    switch (event.target.name) {
      case 'description':
        this.setState({
          [event.target.name]: {
            ...description,
            [activeLanguage.value]: event.target.value,
          },
        })
        break
      case 'title':
        this.setState({
          [event.target.name]: {
            ...title,
            [activeLanguage.value]: event.target.value,
          },
        })
        break
      default:
        this.setState({ [event.target.name]: event.target.value })
    }
  }

  setPicture = (event) => {
    getBase64(event.target.files[0]).then((icon) => {
      this.setState({ icon: icon })
    })
    // var formData = new FormData();
    // formData.append("image", event.target.files[0]);
  }

  showConstructor = () => {
    const { constructor } = this.state
    this.setState({
      constructor: !constructor,
    })
  }

  render() {
    const { constructor, title, description } = this.state
    const { onChange, value, activeLanguage, handleLangChange } = this.props

    if (constructor) {
      return (
        <Wrapper>
          <ButtonWrapperConstructor>
            <Button buttonStyle={'outlined'} onClick={this.showConstructor}>
              ADD NEW badge
            </Button>
          </ButtonWrapperConstructor>
          <DarkGround onClick={this.showConstructor} />
          <ConsturctorWrapper>
            <ConsturctorForm onSubmit={this.onSubmit}>
              <LabelElement>Choose language</LabelElement>
              <Select value={activeLanguage} onChange={handleLangChange} options={i18nSelector} maxMenuHeight={100} />
              <CustomInput label="Title" placeholder="Title goes here" name="title" value={title[activeLanguage.value]} onChange={this.onChange} required={true} />
              <LabelElement>Description</LabelElement>
              <DescriptionTextArea name="description" placeholder="description" value={description[activeLanguage.value]} type="text" onChange={this.onChange} />

              <input accept="image/*" id="text-button-file" multiple type="file" style={{ display: 'none' }} onChange={this.setPicture} />
              <label htmlFor="text-button-file">
                <ButtonMaterial component="span">Upload</ButtonMaterial>
              </label>
              <span>{this.state.picture && this.state.picture}</span>
              <ButtonWrapper>
                <Button buttonStyle={'outlined'} type="submit">
                  ADD NEW badge
                </Button>
              </ButtonWrapper>
            </ConsturctorForm>
          </ConsturctorWrapper>
        </Wrapper>
      )
    }
    return (
      <Wrapper>
        <ButtonWrapperConstructor>
          <Search onChange={onChange} value={value} />
          <SelectWrapper>
            <Select value={activeLanguage} onChange={handleLangChange} options={i18nSelector} />
          </SelectWrapper>
          <Button buttonStyle={'outlined'} onClick={this.showConstructor}>
            ADD NEW badge
          </Button>
        </ButtonWrapperConstructor>
      </Wrapper>
    )
  }
}

BadgeConstructor.defaultProps = {
  addBadges() {},
}

BadgeConstructor.propTypes = {
  addBadges: PropTypes.func,
}
