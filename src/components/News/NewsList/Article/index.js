import React from "react";
import PropTypes from "prop-types";

import Button from "../../../Shared/Button";
import { SmartContainer } from "../../../Shared/SmartContainer";

import { ElementWrapper, ButtonWrapper } from "../../styleLocal.js";

export default function Article({
  news,
  getParams,
  deleteItem,
  activeLanguage
}) {
  return (
    <ElementWrapper>
      <SmartContainer
        name="Article"
        title={news.title[activeLanguage.value]}
        description={news.description[activeLanguage.value]}
        publish={new Date(news.date).toLocaleString()}
      />
      <ButtonWrapper>
        <Button
          buttonStyle={"outlined"}
          onClick={() => getParams(news._id, news.title, news.description)}
        >
          CHANGE Article
        </Button>

        <Button
          buttonStyle={"outlined"}
          onClick={() => {
            if (window.confirm("ARE YOU SURE ?")) {
              deleteItem(news._id);
            }
          }}
        >
          DELETE Article
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
