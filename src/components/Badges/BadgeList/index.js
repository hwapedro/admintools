import React, { Component } from "react";
import PropTypes from "prop-types";

import ButtonMaterial from "@material-ui/core/Button";
import Button from "../../Shared/Button";
import CustomInput from "../../Shared/Input";

import {
  DescriptionSpan,
  DescriptionTextArea,
  ElementWrapper,
  ElementsWrapper,
  ButtonWrapper
} from "../styleLocal";
import {
  Wrapper,
  TitleSpan,
  LabelElement
} from "../../GlobalStyles/styleGlobal";
import { getBase64 } from "../../../store/utils";

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

  deleteItem = badgeIndex => {
    const { delBadge } = this.props;
    delBadge(badgeIndex, name);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { badges, search } = this.props;
    const { title, description } = this.state;
    let list = badges
      .filter(badge => {
        if (badge.title.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          return true;
        }
        return false;
      })
      .map(badge => {
        if (this.state.changeFlag && badge._id === this.state.badgeIndex) {
          return (
            <ElementWrapper key={badge._id}>
              <form onSubmit={this.setParams}>
                <CustomInput
                label="Title"
                  field={{
                    name: "title",
                    value: title,
                    onChange: this.onChange
                  }}
                />
                <LabelElement>Description of badge : </LabelElement>
                <DescriptionTextArea
                  name="description"
                  onChange={this.onChange}
                  value={description}
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
            </ElementWrapper>
          );
        } else {
          return (
            <ElementWrapper key={badge._id}>
              <img
                src={badge.icon}
                alt="icon"
                style={{ width: "70px", height: "70px" }}
              />
              <LabelElement>Name of badge :</LabelElement>
              <TitleSpan> {badge.title}</TitleSpan>
              <LabelElement>Description of badge : </LabelElement>
              <DescriptionSpan>{badge.description}</DescriptionSpan>
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
