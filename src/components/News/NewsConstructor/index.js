import React, { Component } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";

import EditorText from "../../EditorText";
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
import { i18nSelector } from "../../../store/utils";

const name = "news";

class SetArticle extends Component {
  state = {
    title: null,
    description: null,
    language: { label: "Russian", value: "ru" },
    constructor: false,
    editorState: EditorState.createEmpty()
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
    const { title, description } = this.state
    
    addNews(title, description, name);
    this.showConstructor();
    this.setState({
      constructor: !this.state.constructor
    });
  };

  onEditorStateChange = editorState => {
    const description = {
      ...this.state.description,
      [this.state.language.value]: stateToHTML(editorState.getCurrentContent())
    };

    this.setState({
      editorState: editorState,
      description: description
    });
  };

  //SELECTOR HANDLER
  handleChange = language => {
    const { description } = this.state;
    const contentState = stateFromHTML(description[language.value]);
    const editorState = EditorState.push(this.state.editorState, contentState);

    this.setState({ language: language, editorState: editorState });
  };

  onChange = event => {
    const { language, title } = this.state;

    switch (event.target.name) {
      case "title":
        this.setState({
          [event.target.name]: {
            ...title,
            [language.value]: event.target.value
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
    const { onChange,  value,  activeLanguage, handleLangChange } = this.props;
    const { title, constructor, editorState, language } = this.state;
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
                  value={language}
                  onChange={this.handleChange}
                  options={i18nSelector}
                  maxMenuHeight={100}
                />
                <CustomInput
                  placeholder="Title"
                  label="Title"
                  name="title"
                  value={title[language.value]}
                  onChange={this.onChange}
                  required={true}
                />
                <LabelElement>Text of article</LabelElement>
                <EditorText
                  editorState={editorState}
                  onEditorStateChange={this.onEditorStateChange}
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
