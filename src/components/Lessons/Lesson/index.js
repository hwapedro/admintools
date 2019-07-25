import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import Select from "react-select";

import {
  getLesson,
  changeLesson,
  addPage,
  deletePage,
  deleteTask
} from "../../../store/actions/actionLessons";

import {
  TitleInput,
  DescriptionSpan,
  ImgMark,
  ImgCross,
  ElementWrapper
} from "../styleLocal";
import {
  Wrapper,
  LabelElement,
  TitleSpan,
  ButtonWrapper
} from "../../GlobalStyles/styleGlobal";

import EditorText from "../../EditorText";
import Button from "../../Button";
import Spinner from "../../Spinner";
import PageList from "../PageList";
import Error from "../../Error";
import AdminService from "../../../service";

import checkMark from "../../../img/good.png";
import redCross from "../../../img/bad.png";

const name = "lesson";
let options = [];

class Lesson extends Component {
  state = {
    title: "",
    description: "",
    courseIndex: 0,
    changeFlag: false,
    _id: null,
    exam: null
  };

  componentDidMount() {
    const { getLesson, itemId } = this.props;
    const token = localStorage.getItem("token");
    getLesson(itemId);

    AdminService.getLesson(token, itemId)
      .then(response => {
        const courseIndex = response.lesson.courseIndex;
        this.setState({
          courseIndex: { value: courseIndex, label: courseIndex }
        });
      })
      .catch(console.error());

    AdminService.getAll(token, "course")
      .then(response => {
        options = response.courses.map((element, index) => {
          const option = index + 1;
          return { value: option, label: option };
        });
        console.log(options[0].value);
      })
      .catch(console.error());
  }

  handleChange = courseIndex => {
    this.setState({ courseIndex });
  };

  changeExamMark = exam => {
    this.setState({ exam: !exam });
  };

  getParams = (_id, title, description, exam) => {
    if (description !== "") {
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
    } else {
      this.setState({
        changeFlag: true,
        _id: _id,
        title: title,
        description: description,
        exam: exam,
        editorState: EditorState.createEmpty()
      });
    }
  };

  setParams = event => {
    event.preventDefault();
    const { changeLesson } = this.props;
    const { title, _id, exam, courseIndex } = this.state;

    const description = stateToHTML(this.state.editorState.getCurrentContent());

    if (title && description)
      changeLesson(_id, title, description, exam, name, courseIndex.value);
    this.setState({ changeFlag: false, _id: null });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addPage = () => {
    this.props.addPage(
      this.props.lesson._id,
      `Page ${this.props.lesson.pages.length + 1}`,
      [],
      0
    );
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  render() {
    const { lesson, loading, deletePage, deleteTask, error } = this.props;
    const { editorState, changeFlag, courseIndex } = this.state;
    if (loading) {
      return (
        <>
          <Spinner />
        </>
      );
    }

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
          <Wrapper>
            {changeFlag ? (
              <>
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
                      src={this.state.exam ? checkMark : redCross}
                      onClick={() => this.changeExamMark(this.state.exam)}
                    />

                    <LabelElement>Course Index :</LabelElement>
                    <Select
                      value={courseIndex}
                      onChange={this.handleChange}
                      options={options}
                    />

                    <ButtonWrapper>
                      <Button buttonStyle={"outlined"} type="submit">
                        CONFIRM
                      </Button>
                    </ButtonWrapper>
                  </form>
                </ElementWrapper>{" "}
              </>
            ) : (
              <>
                <ElementWrapper
                  key={lesson._id}
                  onClick={() =>
                    this.getParams(
                      lesson._id,
                      lesson.title,
                      lesson.description,
                      lesson.exam,
                      lesson.courseIndex
                    )
                  }
                >
                  <LabelElement>Name of Lesson :</LabelElement>
                  <TitleSpan> {lesson.title}</TitleSpan>
                  <LabelElement>Description of Lesson : </LabelElement>
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

                  <LabelElement>Course Index :</LabelElement>
                  <TitleSpan> {lesson.courseIndex}</TitleSpan>
                </ElementWrapper>

                <ButtonWrapper>
                  <Button buttonStyle={"outlined"} onClick={this.addPage}>
                    Add Page
                  </Button>
                </ButtonWrapper>
              </>
            )}
            {lesson.pages.length === 0 ? (
              <EmptyMessage>There is nothing here yet</EmptyMessage>
            ) : (
              <PageList
                lessonId={lesson._id}
                pages={lesson.pages}
                id={lesson._id}
                deletePage={deletePage}
                deleteTask={deleteTask}
              />
            )}
          </Wrapper>
        )}
      </>
    );
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
  error: state.Lessons.error,
  pages: state.Lessons.pages
});

const mapDispatchToProps = dispatch => ({
  getLesson: id => dispatch(getLesson(id)),
  changeLesson: (lessonsIndex, title, description, exam, name, courseIndex) =>
    dispatch(
      changeLesson(lessonsIndex, title, description, exam, name, courseIndex)
    ),
  addPage: (id, text, tasks, needToComplete) =>
    dispatch(addPage(id, text, tasks, needToComplete)),
  deletePage: id => dispatch(deletePage(id)),
  deleteTask: (pageId, taskid) => dispatch(deleteTask(pageId, taskid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lesson);

const EmptyMessage = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 2.5rem;
  top: 50%;
  margin-top: 270px;
`;
