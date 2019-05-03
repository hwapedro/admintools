import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import {
  ElementWrapper,
  TitleSpan,
  LabelElement,
  DescriptionSpan,
  ButtonWrapper,
  SignInButton
} from "../../style.js";

class Article extends Component {
  render() {
    const { news, getParams, deleteItem} = this.props;
    return (
      <ElementWrapper>
        <LabelElement>Name of news :</LabelElement>
        <TitleSpan> {news.title}</TitleSpan>
        <LabelElement>Description of news : </LabelElement>
        <DescriptionSpan
          dangerouslySetInnerHTML={{
            __html: news.description
          }}
        />
        <LabelElement>Date of create : </LabelElement>
        <DescriptionSpan>
          <pre>{new Date(news.date).toLocaleString()}</pre>
        </DescriptionSpan>
        <ButtonWrapper>
          <SignInButton
            onClick={() => getParams(news._id, news.title, news.text)}
          >
            CHANGE news
          </SignInButton>

          <SignInButton
            onClick={() => {
              if (window.confirm("ARE YOU SURE ?")) {
                deleteItem(news._id);
              }
            }}
          >
            DELETE news
          </SignInButton>
        </ButtonWrapper>
      </ElementWrapper>
    );
  }
}

Article.defaultProps = {
  news: [],
  loading: false,
  error: false

  //   getParams() {},
  //   deleteItem() {}
};

Article.propTypes = {
  news: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool

  //   getParams: PropTypes.func,
  //   deleteItem: PropTypes.func
};

export default Article;
