import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import Article from "./Article";
import EditorText from "../../EditorText";
import Button from "../../Shared/Button";
import CustomInput from "../../Shared/Input";

import {
  Wrapper,
  LabelElement,
  ButtonWrapper,
  ElementWrapper,
  ElementsWrapper,
  EmptyMessage
} from "../styleLocal";

const name = "news";

class NewsList extends Component {
  state = {
    title: "",
    description: "",
    changeFlag: false,
    _id: null,
    editorState: EditorState.createEmpty()
  };

  getParams = (_id, title, description) => {
    const blocksFromHTML = convertFromHTML(description);
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

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  setParams = event => {
    event.preventDefault();
    const { title, _id, editorState } = this.state;
    const { changeArticle } = this.props;
    const description = stateToHTML(editorState.getCurrentContent());
    if (title && description) changeArticle(_id, title, description, name);
    this.setState({ changeFlag: false, _id: null });
  };

  deleteItem = id => {
    const { delArticle } = this.props;
    delArticle(id, name);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { news, search } = this.props;
    const { editorState, _id, changeFlag, title } = this.state;

    let list = news
      .filter(article => {
        if (article.title.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          return true;
        }
        return false;
      })
      .map((news, index) => {
        if (changeFlag && news._id === _id) {
          return (
            <ElementWrapper key={news._id}>
              <form onSubmit={this.setParams}>
                <CustomInput
                  onChange={this.onChange}
                  field={{
                    name: "title",
                    value: title,
                    onChange: this.onChange
                  }}
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
            />
          );
        }
      });
    console.log(news);
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
