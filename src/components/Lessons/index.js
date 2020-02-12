import React, { Component } from "react";
import PropTypes from "prop-types";

import LessonConstructorContainer from "../../containers/LessonsContainer/LessonConstructorContainer";
import Spinner from "../Spinner";
import Error from "../Error";
import LessonListContainer from "../../containers/LessonsContainer/LessonListContainer";

const name = "lesson";

export default class Lessons extends Component {
  state = {
    search: "",
    activeLanguage: { label: "Russian", value: "ru" }
  };

  componentDidMount() {
    const { getAllLessons } = this.props;
    getAllLessons();
  }

  handleLangChange = activeLanguage => {
    this.setState({ activeLanguage });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { error, loading } = this.props;
    const { search, activeLanguage } = this.state;
    return (
      <>
        {error && (
          <>
            <Error name={name} />
          </>
        )}

        {loading && (
          <>
            <Spinner />
          </>
        )}
        {!error && !loading && (
          <>
            <LessonConstructorContainer
              handleLangChange={activeLanguage =>
                this.handleLangChange(activeLanguage)
              }
              onChange={this.onChange}
              value={search}
              activeLanguage={activeLanguage}
            />
            <LessonListContainer
              onChange={this.onChange}
              search={search}
              activeLanguage={activeLanguage}
            />
          </>
        )}
      </>
    );
  }
}

Lessons.defaultProps = {
  lessons: [],
  loading: false,
  error: false,
  addLesson() {},
  delLesson() {},
  getAllLessons() {},
  setLoading() {}
};

Lessons.propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,

  addCoursest: PropTypes.func,
  delLesson: PropTypes.func,
  getAllLessons: PropTypes.func,
  setLoading: PropTypes.func
};
