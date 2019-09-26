import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";

import Article from "./Article";
import EditorText from "../../EditorText";
import Button from "../../Shared/Button";
import CustomInput from "../../Shared/Input";

import { ElementWrapper, ElementsWrapper, EmptyMessage } from "../styleLocal";

import {
  Wrapper,
  LabelElement,
  ButtonWrapper
} from "../../GlobalStyles/styleGlobal";
import { i18n } from "../../../store/utils";

const name = "news";

class NewsList extends Component {
  state = {
    title: null,
    description: null,
    language: { label: "Russian", value: "ru" },
    changeFlag: false,
    _id: null,
    editorState: EditorState.createEmpty()
  };

  getParams = (_id, title, description) => {
    const { language } = this.state;
    const blocksFromHTML = convertFromHTML(description[language.value]);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    this.setState({
      changeFlag: true,
      _id: _id,
      title: title,
      description: description,
      editorState: EditorState.createWithContent(state)
    });
  };

  setParams = event => {
    event.preventDefault();
    const { title, description, _id } = this.state;
    const { changeArticle } = this.props;

    if (title && description) changeArticle(_id, title, description, name);
    this.setState({ changeFlag: false, _id: null });
  };

  deleteItem = id => {
    const { delArticle } = this.props;
    delArticle(id, name);
  };

  //EDITOR HANDLER
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

  //TEXT HANDLER
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

  //SELECTOR HANDLER
  handleChange = language => {
    const { description } = this.state;
    const contentState = stateFromHTML(description[language.value]);
    const editorState = EditorState.push(this.state.editorState, contentState);
    console.log(description);
    this.setState({ language: language, editorState: editorState });
  };

  render() {
    const { news, search, activeLanguage } = this.props;
    const { editorState, _id, changeFlag, title, language } = this.state;

    let list = news
      .filter(article => {
        if (
          article.title[activeLanguage.value]
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1
        ) {
          return true;
        }
        return false;
      })
      .map((news, index) => {
        if (changeFlag && news._id === _id) {
          return (
            <ElementWrapper key={news._id}>
              <form onSubmit={this.setParams}>
                <LabelElement>Choose language</LabelElement>
                <Select
                  value={language}
                  onChange={this.handleChange}
                  options={i18n}
                  maxMenuHeight={100}
                />
                <CustomInput
                  onChange={this.onChange}
                  placeholder="Title"
                  label="Title"
                  name="title"
                  value={title[language.value]}
                  required={true}
                />
                <LabelElement>Description of article : </LabelElement>

                <EditorText
                  editorState={editorState}
                  onEditorStateChange={this.onEditorStateChange}
                />

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
            <Article
              key={news._id}
              news={news}
              index={index}
              getParams={this.getParams}
              deleteItem={this.deleteItem}
              activeLanguage={activeLanguage}
            />
          );
        }
      });
    return (
      <Wrapper>
        {news.length === 0 || list.length === 0 ? (
          <EmptyMessage>There is nothing here yet</EmptyMessage>
        ) : (
          <ElementsWrapper>{list}</ElementsWrapper>
        )}
      </Wrapper>
    );
  }
}

export default NewsList;

NewsList.defaultProps = {
  news: [],
  loading: false,
  error: false,

  delArticle() {},
  changeArticle() {}
};

NewsList.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,

  delArticle: PropTypes.func,
  changeArticle: PropTypes.func
};
