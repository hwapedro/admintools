import React, { Component } from "react";
import PropTypes from "prop-types";

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
import { getBase64 } from "../../../store/utils";

export default class BadgeConstructor extends Component {
  state = {
    title: "",
    description: "",
    constructor: false,
    icon: null
  };

  onSubmit = event => {
    event.preventDefault();
    const { createBadge } = this.props;
    const { title, description, icon } = this.state;
    console.log(icon);
    createBadge(title, description, icon);
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

  showConstructor = () => {
    const { constructor } = this.state;
    this.setState({
      constructor: !constructor
    });
  };

  render() {
    const { constructor, title, description } = this.state;
    const { onChange, value } = this.props;

    if (constructor) {
      return (
        <Wrapper>
          <ButtonWrapperConstructor>
            <Search onChange={onChange} value={value} />
            <Button buttonStyle={"outlined"} onClick={this.showConstructor}>
              ADD NEW badge
            </Button>
          </ButtonWrapperConstructor>
          <DarkGround onClick={this.showConstructor} />
          <ConsturctorWrapper>
            <ConsturctorForm onSubmit={this.onSubmit}>
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
                name="description"
                placeholder="description"
                value={description}
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
