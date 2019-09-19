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
import { getBase64, i18n } from "../../../store/utils";

const name = "badge";

class badgeList extends Component {
  state = {
    title: "",
    descriptionText: "",
    language: { label: "Russian", value: "ru" },
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
    const { changeBadge } = this.props;
    const { title, descriptionText, language, badgeIndex } = this.state;
    const theTitle = { [language.value]: title };
    const description = {
      [language.value]: descriptionText
    };
    const icon = localStorage.getItem("icon");
    changeBadge(badgeIndex, theTitle, description, icon);
    this.setState({ changeFlag: false, badgeIndex: null });
  };

  setPicture = event => {
    getBase64(event.target.files[0]).then(icon => {
      localStorage.setItem("icon", icon);
    });
  };

  //SELECTOR HANDLER
  handleChange = language => {
    console.log(language);
    this.setState({ language });
  };

  deleteItem = badgeIndex => {
    const { delBadge } = this.props;
    delBadge(badgeIndex, name);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { badges, search, activeLanguage } = this.props;
    const { title, descriptionText, language } = this.state;

    let list = badges
      .filter(badge => {
        if (activeLanguage.value !== Object.keys(badge.title)[0]) {
          return false;
        }

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
                <LabelElement>Description of badge : </LabelElement>
                <DescriptionTextArea
                  name="descriptionText"
                  onChange={this.onChange}
                  value={descriptionText}
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
};

badgeList.propTypes = {
  badge: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,

  delBadge: PropTypes.func,
  changeBadge: PropTypes.func
};
