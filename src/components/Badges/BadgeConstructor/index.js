import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Search from "../../Search";
const name = "badge";

export default class BadgeConstructor extends Component {
  state = {
    title: "",
    description: "",
    constructor: false
  };

  onSubmit = event => {
    event.preventDefault();
    const { addBadge } = this.props;
    const { title, description, constructor } = this.state;
    addBadge(title, description, name);
    this.setState({
      constructor: !constructor
    });
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  showConstructor = () => {
    const { constructor } = this.state;
    this.setState({
      constructor: !constructor
    });
  };

  render() {
    const { constructor, title, description } = this.state;
    const {onChange, value} = this.props
    if (constructor) {
      return (
        <Wrapper>
          <ButtonWrapper>
            <Search onChange={onChange} value={value} />
            <ConstructirButton onClick={this.showConstructor}>
              ADD NEW badge
            </ConstructirButton>
          </ButtonWrapper>
          <DarkGround onClick={this.showConstructor} />
          <ConsturctorWrapper>
            <ConsturctorForm onSubmit={this.onSubmit}>
              <LabelElement>title</LabelElement>
              <TitleInput
                name="title"
                placeholder="title"
                type="text"
                value={title}
                onChange={this.onChange}
              />
              <LabelElement>description</LabelElement>
              <DescriptionTextArea
                name="description"
                placeholder="description"
                value={description}
                type="text"
                onChange={this.onChange}
              />
              <ButtonWrapper>
                <ConstructirButton type="submit">
                  ADD NEW badge
                </ConstructirButton>
              </ButtonWrapper>
            </ConsturctorForm>
          </ConsturctorWrapper>
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        <ButtonWrapper>
          <ConstructirButton onClick={this.showConstructor}>
            ADD NEW badge
          </ConstructirButton>
        </ButtonWrapper>
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

const Wrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DarkGround = styled.div`
  background: #000;
  height: 100%;
  opacity: 0.5;
  position: fixed;
  width: 100%;
  z-index: 100;
  top: 0;
  left: 0;
`;

const ConsturctorWrapper = styled.div`
  background: ${props => props.theme.courses};
  padding: 1rem;
  position: fixed;
  width: 700px;
  height: 500px;
  top: 45%;
  left: 50%;
  z-index: 102;
  margin-top: -200px;
  margin-left: -330px;
  border: 1px solid white;
  border-radius: 20px;
`;

const ConsturctorForm = styled.form``;

// const TitleSpan = styled.span`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   margin: 1rem 0;
//   font-size: 1.3rem;
// `;

const TitleInput = styled.input`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
  color: black;
`;

const LabelElement = styled.span`
  margin-top: 2rem;
  font-weight: 900;
  font-size: 1.8rem;
`;

// const DescriptionSpan = styled.span`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   margin: 1rem 0;
//   font-size: 1.3rem;
// `;

const DescriptionTextArea = styled.textarea`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 250px;
  max-height: 100%;
  max-width: 100%;
  resize: none;
  align-items: center;
  margin-top: 1rem;
  font-size: 1.3rem;
  color: black;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 0.5rem;
`;
export const ConstructirButton = styled.button`
  width: 150px;
  height: 40px;
  border: 0;
  border-radius: 10px;
  background-color: ${props => props.theme.button};
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
    cursor: pointer;
  }
  margin-right: 1rem;
`;
