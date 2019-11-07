import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import ButtonMaterial from "@material-ui/core/Button";
import Button from "../../Shared/Button";
import CustomInput from "../../Shared/Input";

import {
  DescriptionSpan,
  DescriptionTextArea,
  ElementWrapper,
  ElementsWrapper,
  BadgeImg,
  BadgeWrapper,
  InfoWrapper,
  ElementWrapperConstructor
} from "../styleLocal";
import {
  Wrapper,
  TitleSpan,
  LabelElement,
  ButtonWrapper
} from "../../GlobalStyles/styleGlobal";
import { getBase64, i18nSelector } from "../../../store/utils";

const name = "badge";

class BadgeList extends Component {
  state = {
    title: null,
    description: null,
    changeFlag: false,
    badgeIndex: null
  };

  //
  getParams = (badgeIndex, title, description) => {
    this.setState({
      changeFlag: true,
      badgeIndex: badgeIndex,
      title: title,
      description: description,
    });
  };

  setParams = event => {
    event.preventDefault();
    const { changeBadge } = this.props;
    const { title, description, badgeIndex } = this.state;
    const icon = localStorage.getItem("icon");
    changeBadge(badgeIndex, title, description, icon);
    this.setState({ changeFlag: false, badgeIndex: null });
  };

  setPicture = event => {
    getBase64(event.target.files[0]).then(icon => {
      localStorage.setItem("icon", icon);
    });
  };

  showConstructor = () => {
    const { changeFlag } = this.state;
    if (changeFlag) {
      this.setState({
        changeFlag: !changeFlag
      });
    }
  };

  deleteItem = badgeIndex => {
    const { delBadge } = this.props;
    delBadge(badgeIndex, name);
  };


  onChange = event => {
    const { title, description } = this.state;
    const { activeLanguage } = this.props
    
    switch (event.target.name) {
      case "description":
        this.setState({
          [event.target.name]: {
            ...description,
            [activeLanguage.value]: event.target.value
          }
        });
        break;
      case "title":
        this.setState({
          [event.target.name]: {
            ...title,
            [activeLanguage.value]: event.target.value
          }
        });
        break;
      default:
        this.setState({ [event.target.name]: event.target.value });
      }
  };

  render() {
    const { badges, search, activeLanguage, handleLangChange } = this.props;
    const { title, description } = this.state;
    let list = badges
      .filter(badge => {
        if (
          badge.title[activeLanguage.value]
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1
        ) {
          return true;
        }
        return false;
      })
      .map(badge => {
        if (this.state.changeFlag && badge._id === this.state.badgeIndex) {
          return (
            <ElementWrapperConstructor key={badge._id}>
              <form onSubmit={this.setParams}>
                <LabelElement>Choose language</LabelElement>
                <Select
                  value={activeLanguage}
                  onChange={handleLangChange}
                  options={i18nSelector}
                  maxMenuHeight={100}
                />
                <CustomInput
                  label="Title"
                  placeholder="Title goes here"
                  name="title"
                  value={title[activeLanguage.value]}
                  onChange={this.onChange}
                  required={true}
                />
                <LabelElement>Description of badge : </LabelElement>
                <DescriptionTextArea
                  name="description"
                  onChange={this.onChange}
                  value={description[activeLanguage.value]}
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

                <ButtonWrapper>
                  <Button buttonStyle={"outlined"} type="submit">
                    CONFIRM
                  </Button>
                </ButtonWrapper>
              </form>
            </ElementWrapperConstructor>
          );
        } else {
          return (
            <ElementWrapper key={badge._id}>
              <BadgeWrapper>
                <BadgeImg src={badge.icon} alt="icon" />
              </BadgeWrapper>
              <InfoWrapper>
                <LabelElement>Name of badge :</LabelElement>
                <TitleSpan> {badge.title[activeLanguage.value]}</TitleSpan>
                <LabelElement>Description of badge : </LabelElement>
                <DescriptionSpan>{badge.description[activeLanguage.value]}</DescriptionSpan>
                <ButtonWrapper>
                  <Button
                    buttonStyle={"outlined"}
                    onClick={() =>
                      this.getParams(
                        badge._id,
                        badge.title,
                        badge.description,
                        badge.icon
                      )
                    }
                  >
                    CHANGE badge
                  </Button>
                  <Button
                    buttonStyle={"outlined"}
                    onClick={() => {
                      if (window.confirm("Delete the item?")) {
                        this.deleteItem(badge._id);
                      }
                    }}
                  >
                    DELETE badge
                  </Button>
                </ButtonWrapper>
              </InfoWrapper>
            </ElementWrapper>
          );
        }
      });
    return (
      <Wrapper onClick={this.showConstructor}>
        <ElementsWrapper>{list}</ElementsWrapper>
      </Wrapper>
    );
  }
}

export default BadgeList;

BadgeList.defaultProps = {
  badge: [],
  loading: false,
  error: false,
  delBadge() {},
  changeBadge() {}
};

BadgeList.propTypes = {
  badge: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,

  delBadge: PropTypes.func,
  changeBadge: PropTypes.func
};
