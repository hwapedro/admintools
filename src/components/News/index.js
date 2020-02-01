import React, { Component } from "react";
import PropTypes from "prop-types";

import NewsList from "./NewsList";
import NewsConstructor from "./NewsConstructor";

import Spinner from "../Spinner";
import Error from "../Error";

const name = "news";

export default class News extends Component {
  state = {
    search: "",
    activeLanguage: { label: "Russian", value: "ru" }
  };

  componentDidMount() {
    const { getAllNews } = this.props;
    getAllNews();
  }

  handleLangChange = activeLanguage => {
    this.setState({ activeLanguage });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      loading,
      error,
      news,
      delArticle,
      addNews,
      changeArticle
    } = this.props;
    const { search, activeLanguage } = this.state;

    return (
      <>
        {error && (
          <>
            <Error name={name} />
          </>
        )}

        {loading ? (
          <>
            <Spinner />
          </>
        ) : null}

        {!error && !loading && (
          <>
            <NewsConstructor
              addNews={(title, description) =>
                addNews(title, description)
              }
              handleLangChange={activeLanguage =>
                this.handleLangChange(activeLanguage)
              }
              onChange={this.onChange}
              value={search}
              activeLanguage={activeLanguage}
            />
            <NewsList
              changeArticle={(articleIndex, title, description) =>
                changeArticle(articleIndex, title, description)
              }
              delArticle={(index) => delArticle(index)}
              handleLangChange={activeLanguage =>
                this.handleLangChange(activeLanguage)
              }
              news={news}
              activeLanguage={activeLanguage}
              search={search}
            />
          </>
        )}
      </>
    );
  }
}

News.defaultProps = {
  news: [],
  loading: false,
  error: false,

  addNews() {},
  delArticle() {},
  getAllNews() {},
  changeArticle() {}
};

News.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,

  addNews: PropTypes.func,
  delArticle: PropTypes.func,
  getAllNews: PropTypes.func,
  changeArticle: PropTypes.func
};
