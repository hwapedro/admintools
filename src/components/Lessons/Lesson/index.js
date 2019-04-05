import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'

import { getLesson, changeElement, addPage, deletePage } from "../../../store/actions";
import {
  ButtonWrapper,
  TitleInput,
  DescriptionTextArea,
  LessonButton,
  Wrapper,
  ElementWrapper,
  TitleSpan,
  DescriptionSpan,
  LabelElement,
  ImgMark,
  ImgCross
} from "../style";

import Menu from "../../Menu";
import Spinner from "../../Spinner";
import Pages from "../PageList";

import checkMark from "../../../img/good.png";
import redCross from "../../../img/bad.png";

const token = localStorage.getItem("userId");
const name = "lesson";

class Lesson extends Component {
  state = {
    title: "",
    description: "",
    changeFlag: false,
    _id: null,
    exam: null
  };

  componentDidMount() {
    const { getLesson  } = this.props;
    let token = localStorage.getItem("userId");
    getLesson(token, this.props.itemId);
  }

  changeExamMark = exam => {
    this.setState({ exam: !exam });
  };

  getParams = (_id, title, description, exam) => {
    this.setState({
      changeFlag: true,
      _id: _id,
      title: title,
      description: description,
      exam: exam
    });
  };

  setParams = event => {
    event.preventDefault();
    const { changeLesson } = this.props;
    const { title, description } = this.state;

    if (title && description)
      changeLesson(
        this.state._id,
        this.state.title,
        this.state.description,
        this.state.exam,
        token,
        name
      );
    this.setState({ changeFlag: false, _id: null });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  addPage =( ) => {
    this.props.addPage(token, this.props.lesson._id, "blah text", [], 0)
  }
  render() {
    const { lesson, loading, deletePage } = this.props;
    if (loading) {
      return (
        <>
          <Menu />
          <Spinner />
        </>
      );
    }

    if (this.state.changeFlag) {
      return (
        <>
          <Menu />
          <Wrapper>
            <ElementWrapper>
              <form onSubmit={this.setParams}>
                <LabelElement>Name of Lesson :</LabelElement>
                <TitleInput
                  name="title"
                  onChange={this.onChange}
                  value={this.state.title}
                />
                <LabelElement>Description of Lesson : </LabelElement>
                <DescriptionTextArea
                  name="description"
                  onChange={this.onChange}
                  value={this.state.description}
                />
                <LabelElement>EXAM :</LabelElement>
                {this.state.exam ? (
                  <ImgMark
                    src={checkMark}
                    onClick={() => this.changeExamMark(this.state.exam)}
                  />
                ) : (
                  <ImgCross
                    src={redCross}
                    onClick={() => this.changeExamMark(this.state.exam)}
                  />
                )}
                <ButtonWrapper>
                  <LessonButton type="submit">CONFIRM</LessonButton>
                </ButtonWrapper>
              </form>
            </ElementWrapper>
          </Wrapper>
        </>
      );
    } else {
      return (
        <>
          <Menu />

          <Wrapper>
            <ElementWrapper
              key={lesson._id}
              onClick={() =>
                this.getParams(
                  lesson._id,
                  lesson.title,
                  lesson.description,
                  lesson.exam
                )
              }
            >
              <LabelElement>Name of Lessons :</LabelElement>
              <TitleSpan> {lesson.title}</TitleSpan>
              <LabelElement>Description of Lessons : </LabelElement>
              <DescriptionSpan>{lesson.description}</DescriptionSpan>

              <LabelElement>EXAM :</LabelElement>
              {lesson.exam ? (
                <ImgMark src={checkMark} />
              ) : (
                <ImgCross src={redCross} />
              )}
              <br />

              {/* <LabelElement>courseIndex :</LabelElement>
              <TitleSpan> {lesson.courseIndex}</TitleSpan> */}
            </ElementWrapper>
          </Wrapper>
          <ButtonWrapper>
            <LessonButton onClick={this.addPage}>Add Page</LessonButton>
          </ButtonWrapper>
          <Pages pages={lesson.pages} id={lesson._id} deletePage={deletePage}/>
        </>
      );
    }
  }
}

Lesson.defaultProps = {
  lesson: [],
  loading: false,
  error: false,

  getLesson() {},
  changeLesson() {}
}

Lesson.propTypes = {
  lesson:  PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,

  getLesson: PropTypes.func,
  changeLesson: PropTypes.func,
}

const mapStateToProps = state => ({
  lesson: state.lesson,
  loading: state.loading
});

const mapDispatchToProps = dispatch => ({
  getLesson: (token, id) => dispatch(getLesson(token, id)),
  changeLesson: (lessonsIndex, title, description, exam, token, name) =>
    dispatch(
      changeElement(lessonsIndex, title, description, exam, token, name)
    ),
  addPage: (token, id, text, tasks, needToComplete) =>
    dispatch(addPage(token, id, text, tasks, needToComplete)),
  deletePage: (token, id) => dispatch(deletePage(token, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lesson);
