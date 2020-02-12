import React, { Component } from "react";
import PropTypes from "prop-types";

import Article from "./Article";

import { SmartConstructor } from "../../Shared/SmartConstructor";

import { ElementWrapper, ElementsWrapper, EmptyMessage } from "../styleLocal";

import { Wrapper } from "../../GlobalStyles/styleGlobal";

const name = "news";

class NewsList extends Component {
  state = {
    title: null,
    description: null,
    changeFlag: false,
    _id: null
  };

  getParams = (_id, title, description) => {
    this.setState({
      changeFlag: true,
      _id: _id,
      title: title,
      description: description
    });
  };

  onSubmit = event => {
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

  //TEXT HANDLER
  onChange = event => {
    const { title, description } = this.state;
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
    const { changeFlag } = this.state;
    if (changeFlag) {
      this.setState({
        changeFlag: !changeFlag
      });
    }
  };

  render() {
    const { news, search, activeLanguage, handleLangChange } = this.props;
    const { _id, changeFlag, title, description } = this.state;

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
              <SmartConstructor
                showConstructor={this.showConstructor}
                onSubmit={this.onSubmit}
                onChange={this.onChange}
                activeLanguage={activeLanguage}
                select={{
                  handleLangChange: handleLangChange
                }}
                title={title[activeLanguage.value]}
                description={description[activeLanguage.value]}
              />
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
