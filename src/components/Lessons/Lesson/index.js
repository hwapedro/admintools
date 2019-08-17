import React, { Component } from "react";
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
  DescriptionSpan,
  ImgMark,
  ImgCross,
  ElementWrapper,
  ExamPropContainer
} from "../styleLocal";

import {
  Wrapper,
  LabelElement,
  TitleSpan,
  ButtonWrapper,
  EmptyMessage
} from "../../GlobalStyles/styleGlobal";

import EditorText from "../../EditorText";
import Button from "../../Shared/Button";
import CustomInput from "../../Shared/Input";
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
    changeFlag: false,
    courseIndex: { value: null, label: null },
    lessonId: null,
    exam: null
  };

  componentDidMount() {
    const { getLesson, itemId } = this.props;
    const token = localStorage.getItem("token");
    getLesson(itemId);

    AdminService.getAll(token, "course")
      .then(response => {
        options = response.courses.map((element, index) => {
          const option = index + 1;
          return { value: option, label: option };
        });
      })
      .catch(console.error());
  }

  handleChange = courseIndex => {
    this.setState({ courseIndex });
  };

  changeExamProp = exam => {
    this.setState({ exam: !exam });
  };

  getParams = (lessonId, title, description, exam, courseIndex) => {
    if (description !== "") {
      const blocksFromHTML = convertFromHTML(description);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      this.setState({
        changeFlag: true,
        lessonId: lessonId,
        title: title,
        description: description,
        exam: exam,
        editorState: EditorState.createWithContent(state),
        courseIndex: courseIndex
      });
    } else {
      this.setState({
        changeFlag: true,
        lessonId: lessonId,
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
    const { title, lessonId, exam, courseIndex } = this.state;
    const description = stateToHTML(this.state.editorState.getCurrentContent());

    if (title && description)
      changeLesson(lessonId, title, description, exam, name, courseIndex.value);
    this.setState({ changeFlag: false, lessonId: null });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addPage = () => {
    const { addPage } = this.props;
    addPage(
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
    const { editorState, changeFlag, courseIndex, title, exam } = this.state;

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
                    <CustomInput
                      label="Title"
                      placeholder="Title goes here"
                      name="title"
                      value={title}
                      onChange={this.onChange}
                      required={true}
                    />
                    <LabelElement>Description of Lesson : </LabelElement>
                    <EditorText
                      editorState={editorState}
                      onEditorStateChange={this.onEditorStateChange}
                    />
                    <ExamPropContainer>
                      <LabelElement>EXAM :</LabelElement>
                      <ImgMark
                        src={exam ? checkMark : redCross}
                        onClick={() => this.changeExamProp(exam)}
                      />
                    </ExamPropContainer>
                    <LabelElement>Course Index :</LabelElement>
                    <Select
                      value={courseIndex}
                      onChange={value => this.handleChange(value)}
                      options={options}
                    />

                    <ButtonWrapper>
                      <Button buttonStyle={"outlined"} type="submit">
                        CONFIRM
                      </Button>
                    </ButtonWrapper>
                  </form>
                </ElementWrapper>
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
                      { value: lesson.courseIndex, label: lesson.courseIndex }
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
                  <ExamPropContainer>
                    <LabelElement>EXAM :</LabelElement>
                    {lesson.exam ? (
                      <ImgMark src={checkMark} />
                    ) : (
                      <ImgCross src={redCross} />
                    )}
                  </ExamPropContainer>

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
  lesson: {},
  loading: false,
  error: false,

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
  loading: state.reducer.loading,
  error: state.reducer.error,
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
