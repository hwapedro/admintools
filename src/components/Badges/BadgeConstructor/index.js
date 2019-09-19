import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import ButtonMaterial from "@material-ui/core/Button";
import Button from "../../Shared/Button";
import CustomInput from "../../Shared/Input";
import Search from "../../Search";

import { ButtonWrapperConstructor, DescriptionTextArea } from "../styleLocal";
import {
  DarkGround,
  ConsturctorForm,
  ConsturctorWrapper,
  ButtonWrapper
} from "../../GlobalStyles/styleGlobal";
import { Wrapper, LabelElement } from "../../GlobalStyles/styleGlobal";
import { getBase64, i18n } from "../../../store/utils";

const selectStyles = {
  valueContainer: base => ({
    width: 100
  }),
  group: base => ({
    width: 100
  }),
  container: base => ({
    width: 100
  }),
  control: base => ({
    width: 100
  }),
  singleValue: base => ({
    width: 100
  })
};

export default class BadgeConstructor extends Component {
  state = {
    title: "",
    descriptionText: "",
    language: { label: "Russian", value: "ru" },
    constructor: false,
    icon: null
  };

  onSubmit = event => {
    event.preventDefault();
    const { createBadge } = this.props;
    const { title, descriptionText, language, icon } = this.state;
    const description = {
      [language.value]: descriptionText
    };
    const theTitle = { [language.value]: title };
    console.log(icon);
    createBadge(theTitle, description, icon);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  setPicture = event => {
    getBase64(event.target.files[0]).then(icon => {
      this.setState({ icon: icon });
    });
    // var formData = new FormData();
    // formData.append("image", event.target.files[0]);
  };

  //SELECTOR HANDLER
  handleChange = language => {
    this.setState({ language });
  };

  showConstructor = () => {
    const { constructor } = this.state;
    this.setState({
      constructor: !constructor
    });
  };

  render() {
    const { constructor, title, descriptionText, language } = this.state;
    const { onChange, value, activeLanguage, handleLangChange } = this.props;

    if (constructor) {
      return (
        <Wrapper>
          <ButtonWrapperConstructor>
            <Button buttonStyle={"outlined"} onClick={this.showConstructor}>
              ADD NEW badge
            </Button>
          </ButtonWrapperConstructor>
          <DarkGround onClick={this.showConstructor} />
          <ConsturctorWrapper>
            <ConsturctorForm onSubmit={this.onSubmit}>
              <LabelElement>Choose language</LabelElement>
              <Select
                value={language}
                onChange={this.handleChange}
                options={i18n}
                maxMenuHeight={100}
              />
              <CustomInput
                label="Title"
                placeholder="Title goes here"
                name="title"
                value={title}
                onChange={this.onChange}
                required={true}
              />
              <LabelElement>Description</LabelElement>
              <DescriptionTextArea
                name="descriptionText"
                placeholder="description"
                value={descriptionText}
                type="text"
                onChange={this.onChange}
              />

              <input
                accept="image/*"
                id="text-button-file"
                multiple
                type="file"
                style={{ display: "none" }}
                onChange={this.setPicture}
              />
              <label htmlFor="text-button-file">
                <ButtonMaterial component="span">Upload</ButtonMaterial>
              </label>
              <span>{this.state.picture && this.state.picture}</span>
              <ButtonWrapper>
                <Button buttonStyle={"outlined"} type="submit">
                  ADD NEW badge
                </Button>
              </ButtonWrapper>
            </ConsturctorForm>
          </ConsturctorWrapper>
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        <ButtonWrapperConstructor>
          <Search onChange={onChange} value={value} />
          <div style={{width: '150px'}}>
          <Select
            value={activeLanguage}
            onChange={handleLangChange}
            options={i18n}
           
          />
          </div>
          <Button buttonStyle={"outlined"} onClick={this.showConstructor}>
            ADD NEW badge
          </Button>
        </ButtonWrapperConstructor>
      </Wrapper>
    );
  }
}

BadgeConstructor.defaultProps = {
  addBadges() {}
};

BadgeConstructor.propTypes = {
  addBadges: PropTypes.func
};
