import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  EditorState,
  ContentState,
  convertFromHTML
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import EditorText from "../../EditorText";

import {
  getLesson,
  changeLesson,
  addPage,
  deletePage,
  deleteTask
} from "../../../store/actions/actionLessons";

import {
  ButtonWrapper,
  TitleInput,
  LessonButton,
  Wrapper,
  ElementWrapper,
  TitleSpan,
  DescriptionSpan,
  LabelElement,
  ImgMark,
  ImgCross
} from "../style";

import Spinner from "../../Spinner";
import PageList from "../PageList";

import checkMark from "../../../img/good.png";
import redCross from "../../../img/bad.png";

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
    const { getLesson } = this.props;
    getLesson( this.props.itemId);
  }

  changeExamMark = exam => {
    this.setState({ exam: !exam });
  };

  getParams = (_id, title, description, exam) => {
    const blocksFromHTML = convertFromHTML(description);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    this.setState({
      changeFlag: true,
      _id: _id,
      title: title,
      description: description,
      exam: exam,
      editorState: EditorState.createWithContent(state)
    });
  };

  setParams = event => {
    event.preventDefault();
    const { changeLesson } = this.props;
    const { title, _id, exam } = this.state;

    const description = stateToHTML(this.state.editorState.getCurrentContent());

    if (title && description)
      changeLesson(
        _id,
        title,
        description,
        exam,
        name
      );
    this.setState({ changeFlag: false, _id: null });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addPage = () => {
    this.props.addPage( this.props.lesson._id, `Page ${this.props.lesson.pages.length + 1}`, [], 0);
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  render() {
    const { lesson, loading, deletePage, deleteTask } = this.props;
    const { editorState } = this.state;
    if (loading) {
      return (
        <>
          <Spinner />
        </>
      );
    }

    if (this.state.changeFlag) {
      return (
        <>
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
                <EditorText
                  editorState={editorState}
                  onEditorStateChange={this.onEditorStateChange}
                />
                <LabelElement>EXAM :</LabelElement>
                
                  <ImgMark
                    src={this.state.exam ? checkMark : redCross }
                    onClick={() => this.changeExamMark(this.state.exam)}
                  />
                
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
              <DescriptionSpan
                dangerouslySetInnerHTML={{
                  __html: lesson.description
                }}
              />

              <LabelElement>EXAM :</LabelElement>
              {lesson.exam ? (
                <ImgMark src={checkMark} />
              ) : (
                <ImgCross src={redCross} />
              )}
              <br />

            </ElementWrapper>

            <ButtonWrapper>
              <LessonButton onClick={this.addPage}>Add Page</LessonButton>
            </ButtonWrapper>

            
            <PageList
              lessonId={lesson._id}
              pages={lesson.pages}
              id={lesson._id}
              deletePage={deletePage}
              deleteTask={deleteTask}
            />
          </Wrapper>
        </>
      );
    }
  }
}

Lesson.defaultProps = {
  lesson: [],
  loading: false,
  error: false,
  pages: [],

  getLesson() {},
  changeLesson() {}
};

Lesson.propTypes = {
  lesson: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,

  getLesson: PropTypes.func,
  changeLesson: PropTypes.func
};

const mapStateToProps = state => ({
  lesson: state.Lessons.lesson,
  loading: state.Lessons.loading,
  pages: state.Lessons.pages
});

const mapDispatchToProps = dispatch => ({
  getLesson: ( id) => dispatch(getLesson( id)),
  changeLesson: (lessonsIndex, title, description, exam,  name) =>
    dispatch(changeLesson(lessonsIndex, title, description, exam,  name)),
  addPage: ( id, text, tasks, needToComplete) =>
    dispatch(addPage( id, text, tasks, needToComplete)),
  deletePage: ( id) => dispatch(deletePage( id)),
  deleteTask: ( pageId, taskid) =>
    dispatch(deleteTask( pageId, taskid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lesson);
