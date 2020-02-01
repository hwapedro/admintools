import React, { Component } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

import Editor from "../../Shared/Editor";
import Search from "../../Search";
import Button from "../../Shared/Button";
import CustomInput from "../../Shared/Input";

import { ButtonWrapperConstructor } from "../styleLocal";
import {
  Wrapper,
  LabelElement,
  ButtonWrapper,
  DarkGround,
  ConsturctorWrapper,
  ConsturctorForm,
  SelectWrapper
} from "../../GlobalStyles/styleGlobal";
import { i18nSelector, i18n } from "../../../store/utils";

const name = "news";

class SetArticle extends Component {
  state = {
    title: i18n,
    description: i18n,
    constructor: false
  };

  componentDidMount() {
    let i18nStart = {};
    i18nSelector.forEach(el => (i18nStart = { ...i18nStart, [el.value]: "" }));
    this.setState({
      title: i18nStart,
      description: i18nStart
    });
  }

  onSubmit = event => {
    event.preventDefault();
    const { addNews } = this.props;
    const { title, description } = this.state;

    addNews(title, description);
    this.showConstructor();
    this.setState({
      constructor: !this.state.constructor
    });
  };

  onChange = event => {
    const {  title, description } = this.state;
    const { activeLanguage } = this.props;
    switch (event.target.name) {
      case "title":
        this.setState({
          [event.target.name]: {
            ...title,
            [activeLanguage.value]: event.target.value
          }
        });
        break;
      case "description":
        this.setState({
          [event.target.name]: {
            ...description,
            [activeLanguage.value]: event.target.value
          }
        });
        break;
      default:
        this.setState({ [event.target.name]: event.target.value });
    }
  };

  showConstructor = () => {
    const { constructor } = this.state;
    this.setState({
      constructor: !constructor
    });
  };

  render() {
    const { onChange, value, activeLanguage, handleLangChange } = this.props;
    const { title, constructor, description } = this.state;

    return (
      <Wrapper>
        <ButtonWrapperConstructor>
          <Search onChange={onChange} value={value} />
          <SelectWrapper>
            <Select
              value={activeLanguage}
              onChange={handleLangChange}
              options={i18nSelector}
            />
          </SelectWrapper>
          <Button buttonStyle={"outlined"} onClick={this.showConstructor}>
            ADD NEW ARTICLE
          </Button>
        </ButtonWrapperConstructor>
        {constructor && (
          <>
            <DarkGround onClick={this.showConstructor} />
            <ConsturctorWrapper>
              <ConsturctorForm onSubmit={this.onSubmit}>
                <LabelElement>Choose language</LabelElement>
                <Select
                  value={activeLanguage}
                  onChange={handleLangChange}
                  options={i18nSelector}
                  maxMenuHeight={100}
                />
                <CustomInput
                  placeholder="Title"
                  label="Title"
                  name="title"
                  value={title[activeLanguage.value]}
                  onChange={this.onChange}
                  required={true}
                />
                <LabelElement>Text of article</LabelElement>
                <Editor
                  onChange={this.onChange}
                  name="description"
                  value={description[activeLanguage.value]}
                  language={activeLanguage.value}
                />
                <ButtonWrapper>
                  <Button buttonStyle={"outlined"} type="submit">
                    ADD NEW ARTICLE
                  </Button>
                </ButtonWrapper>
              </ConsturctorForm>
            </ConsturctorWrapper>
          </>
        )}
      </Wrapper>
    );
  }
}

export default SetArticle;

SetArticle.defaultProps = {
  addNews() {}
};

SetArticle.propTypes = {
  addNews: PropTypes.func
};
