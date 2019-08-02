import React, { Component } from "react";
import PropTypes from "prop-types";

import ButtonMaterial from "@material-ui/core/Button";
import Button from "../../Shared/Button";
import CustomInput from "../../Shared/Input";
import Search from "../../Search";

import {
  DarkGround,
  ConsturctorForm,
  ConsturctorWrapper,
  ButtonWrapperConstructor,
  ButtonWrapper,
  DescriptionTextArea
} from "../styleLocal";
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
                placeholder="title"
                type="text"
                label="Title"
                field={{
                  name: "title",
                  value: title,
                  onChange: this.onChange
                }}
              />
              <LabelElement>description</LabelElement>
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

// const Wrapper = styled.div`
//   padding-top: 1rem;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

// const TitleInput = styled.input`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   margin: 1rem 0;
//   font-size: 1.3rem;
//   color: black;
// `;

// const LabelElement = styled.span`
//   margin-top: 2rem;
//   font-weight: 900;
//   font-size: 1.8rem;
// `;

// // const DescriptionSpan = styled.span`
// //   display: flex;
// //   justify-content: flex-start;
// //   align-items: center;
// //   margin: 1rem 0;
// //   font-size: 1.3rem;
// // `;

// const DescriptionTextArea = styled.textarea`
//   display: flex;
//   justify-content: flex-start;
//   width: 100%;
//   height: 250px;
//   max-height: 100%;
//   max-width: 100%;
//   resize: none;
//   align-items: center;
//   margin-top: 1rem;
//   font-size: 1.3rem;
//   color: black;
// `;

// const ButtonWrapper = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   align-items: flex-end;
//   margin-top: 0.5rem;
// `;
// export const ConstructorButton = styled.button`
//   width: 150px;
//   height: 40px;
//   border: 0;
//   border-radius: 10px;
//   background-color: ${props => props.theme.button};
//   font-size: 0.9rem;
//   font-weight: 700;
//   text-transform: uppercase;
//   color: white;
//   transition: all 0.1s ease-in-out;
//   &:hover {
//     transform: scale(1.05);
//     opacity: 0.9;
//     cursor: pointer;
//   }
//   margin-right: 1rem;
// `;
// export const ButtonWrapperConstructor = styled.div`
//   padding-left: 40px;
//   width: 1000px;
//   display: flex;
//   justify-content: space-between;
//   align-items: space-between;
//   margin-top: 0.3rem;
// `;
