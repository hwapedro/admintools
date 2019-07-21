import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import NewsList from "./NewsList";
import NewsConstructor from "./NewsConstructor";

import {
  changeElement,
  getAllElements,
  addElement,
  deletElement
} from "../../store/actions";

import Spinner from "../Spinner";
import Error from "../Error";

const name = "news";

class News extends Component {

  state = {
    title: "",
    search: "",
    constructor: false
  };

  componentDidMount() {
    const { getAllNews } = this.props;
    getAllNews(name);
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  showConstructor = () => {
    const { constructor } = this.state;

    this.setState({
      constructor: !constructor,
      title: ""
    });
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
    const { title, search, constructor } = this.state;
    console.log(search)
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
              addNews={(title, description, name) =>
                addNews(title, description, name)
              }
              onChange={this.onChange}
               value={search}
               title={title}
               constructor={constructor}
               showConstructor={() => this.showConstructor()}
            />
            <NewsList
              changeArticle={(articleIndex, title, description, name) =>
                changeArticle(articleIndex, title, description, name)
              }
              delArticle={(index, name) => delArticle(index, name)}
              news={news}
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

const mapStateToProps = state => ({
  news: state.News.news,
  loading: state.reducer.loading,
  error: state.reducer.error
});

const mapDispatchToProps = dispatch => ({
  addNews: (title, description, name) =>
    dispatch(addElement(title, description, name)),

  delArticle: (index, name) => dispatch(deletElement(index, name)),

  getAllNews: name => dispatch(getAllElements(name)),

  changeArticle: (articleIndex, title, description, name) =>
    dispatch(changeElement(articleIndex, title, description, name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);
