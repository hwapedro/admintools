import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types'
const token = localStorage.getItem("userId");
const name = "badge";

class badgeList extends Component {
  state = {
    title: "",
    description: "",
    changeFlag: false,
    badgeIndex: null
  };

  getParams = (badgeIndex, title, description) => {
    this.setState({
      changeFlag: true,
      badgeIndex: badgeIndex,
      title: title,
      description: description
    });
  };

  setParams = event => {
    event.preventDefault();
    const {changeBadge} = this.props
    const { title, description } = this.state;
    if (title && description)
      changeBadge(
        this.state.badgeIndex,
        this.state.title,
        this.state.description,
        
        name
      );
    this.setState({ changeFlag: false, badgeIndex: null });
  };

  deleteItem = badgeIndex => {
    const {delBadge} = this.props
    delBadge(badgeIndex,  name);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {badges} = this.props
    let list = badges.map(badge => {
      if (
        this.state.changeFlag &&
        badge._id === this.state.badgeIndex
      ) {
        return (
          <ElementWrapper key={badge._id}>
            <form onSubmit={this.setParams}>
              <LabelElement>Name of badge :</LabelElement>
              <TitleInput
                name="title"
                onChange={this.onChange}
                value={this.state.title}
              />
              <LabelElement>Description of badge : </LabelElement>
              <DescriptionTextArea
                name="description"
                onChange={this.onChange}
                value={this.state.description}
              />

              <ButtonWrapper>
                <SignInButton type="submit">CONFIRM</SignInButton>
              </ButtonWrapper>
            </form>
          </ElementWrapper>
        );
      } else {
        return (
          <ElementWrapper key={badge._id}>
            <LabelElement>Name of badge :</LabelElement>
            <TitleSpan> {badge.title}</TitleSpan>
            <LabelElement>Description of badge : </LabelElement>
            <DescriptionSpan>{badge.description}</DescriptionSpan>
            <ButtonWrapper>
              <SignInButton
                onClick={() =>
                  this.getParams(
                    badge._id,
                    badge.title,
                    badge.description
                  )
                }
              >
                CHANGE badge
              </SignInButton>
              <SignInButton onClick={() => this.deleteItem(badge._id)}>
                DELETE badge
              </SignInButton>
            </ButtonWrapper>
          </ElementWrapper>
        );
      }
    });
    return (
      <Wrapper>
        <ElementsWrapper>{list}</ElementsWrapper>
      </Wrapper>
    );
  }
}

export default badgeList;

badgeList.defaultProps = {
  badge: [],
  loading: false,
  error: false,
  delBadge() {},
  changeBadge() {}
}

badgeList.propTypes = {
  badge:  PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,

  delBadge: PropTypes.func,
  changeBadge: PropTypes.func,
}

const Wrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleSpan = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
`;

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

const DescriptionSpan = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
`;

const DescriptionTextArea = styled.textarea`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 400px;
  max-height: 100%;
  max-width: 100%;
  resize: none;
  align-items: center;
  margin-top: 2rem;
  font-size: 1.3rem;
  color: black;
`;

const ElementsWrapper = styled.ul`
  list-style-type: none;
  width: 1000px;
`;

const ElementWrapper = styled.li`
  background-color: ${props => props.theme.courses};
  margin-top: 2rem;
  border: 1px solid white;
  border-radius: 20px;
  padding: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 0.5rem;
`;
export const SignInButton = styled.button`
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
