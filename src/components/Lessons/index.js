import React, { Component } from "react";
import PropTypes from "prop-types";

//import Search from "../Search";
import LessonConstructor from "./LessonConstructor";
import LessonList from "./LessonList/LessonList";
import Spinner from "../Spinner";
import Error from "../Error";

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
    const {
      error,
      loading,
      lessons,
      addLesson,
      delLesson,
      setLoading
    } = this.props;
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
            <LessonConstructor
              addLesson={(title, description, exam, courseIndex, flag) =>
                addLesson(title, description, exam, courseIndex, flag)
              }
              handleLangChange={activeLanguage =>
                this.handleLangChange(activeLanguage)
              }
              onChange={this.onChange}
              value={search}
              activeLanguage={activeLanguage}
            />
            <LessonList
              onChange={this.onChange}
              delLesson={(lessonsIndex, flag) => delLesson(lessonsIndex, flag)}
              setLoading={loading => setLoading(loading)}
              lessons={lessons}
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
