import React from "react";
import PropTypes from "prop-types";

import Button from "../../../Button";

import {
  ElementWrapper,
  TitleSpan,
  LabelElement,
  DescriptionSpan,
  ButtonWrapper,
  SignInButton
} from "../../style.js";

export default function Article({ news, getParams, deleteItem }) {
  return (
    <ElementWrapper>
      <LabelElement>Name of article :</LabelElement>
      <TitleSpan> {news.title}</TitleSpan>
      <LabelElement>Description of article : </LabelElement>
      <DescriptionSpan
        dangerouslySetInnerHTML={{
          __html: news.description
        }}
      />
      <LabelElement>Published : </LabelElement>
      <DescriptionSpan>
        <pre>{new Date(news.date).toLocaleString()}</pre>
      </DescriptionSpan>
      <ButtonWrapper>
        <Button
          style={"outlined"}
          onClick={() => getParams(news._id, news.title, news.description)}
        >
          CHANGE news
        </Button>

        <Button
          style={"outlined"}
          onClick={() => {
            if (window.confirm("ARE YOU SURE ?")) {
              deleteItem(news._id);
            }
          }}
        >
          DELETE news
        </Button>
      </ButtonWrapper>
    </ElementWrapper>
  );
}

Article.defaultProps = {
  news: [],
  loading: false,
  error: false,

  getParams() {},
  deleteItem() {}
};

Article.propTypes = {
  news: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,

  getParams: PropTypes.func,
  deleteItem: PropTypes.func
};
