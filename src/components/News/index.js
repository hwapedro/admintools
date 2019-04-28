import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";




import NewsList from "./NewsList";
import NewsConstructor from "./NewsConstructor";

import {
  changeElement,
  getAllElements,
  addElement,
  deletElement,
  changeDnD
} from "../../store/actions";

import Spinner from "../Spinner";
import Error from "../Error";

const name = "news";

class News extends Component {
  componentDidMount() {
    const { getAllNews } = this.props;
    let token = localStorage.getItem("userId");
    getAllNews(token, name);
  }

  render() {
    const { loading, error, news, changeDnD, delNews, addNews } = this.props;
    console.log(news);
    return (
      <>
        {error && (
          <>
            <Error />
          </>
        )}

        <NewsConstructor
          addNews={(title, description, token, name) =>
            addNews(title, description, token, name)
          }
        />

        <NewsList
          //   changeCourse={(courseIndex, title, description, token, name) =>
          //     changeCourse(courseIndex, title, description, token, name)
          //   }
          delNews={(index, token, name) => delNews(index, token, name)}
          news={news}
        />
      </>
    );
  }
}

News.defaultProps = {
  news: [],
  loading: false,
  error: false,

  addNews() {},
  //   delCourse() {},
  getAllNews() {}
  //   changeCourse() {}
};

News.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,

  addNews: PropTypes.func,
  //   delCourse: PropTypes.func,
  getAllNews: PropTypes.func
  //   changeCourse: PropTypes.func
};

const mapStateToProps = state => ({
  news: state.News.news,
  loading: state.News.loading,
  error: state.News.error
});

const mapDispatchToProps = dispatch => ({
  addNews: (title, description, token, name) =>
    dispatch(addElement(title, description, token, name)),

  delNews: (indexndex, token, name) =>
    dispatch(deletElement(indexndex, token, name)),

  getAllNews: (token, name) => dispatch(getAllElements(token, name))

  //   changeCourse: (courseIndex, title, description, token, name) =>
  //     dispatch(changeElement(courseIndex, title, description, token, name)),

  //   changeDnD: (token, id1, id2) => dispatch(changeDnD(token, id1, id2))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);
