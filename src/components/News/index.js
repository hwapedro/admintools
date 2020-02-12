import React, { Component } from "react";
import PropTypes from "prop-types";

import NewsListContainer from "../../containers/NewsContainer/NewsListContainer";
import NewsConstructorContainer from "../../containers/NewsContainer/NewsConstructorContainer";

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
    const { loading, error } = this.props;
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
            <NewsConstructorContainer
              handleLangChange={activeLanguage =>
                this.handleLangChange(activeLanguage)
              }
              onChange={this.onChange}
              value={search}
              activeLanguage={activeLanguage}
            />
            <NewsListContainer
              handleLangChange={activeLanguage =>
                this.handleLangChange(activeLanguage)
              }
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
