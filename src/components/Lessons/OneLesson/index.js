import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

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
  EmptyMessage,
  SelectWrapper
} from "../../GlobalStyles/styleGlobal";

import Button from "../../Shared/Button";
import CustomInput from "../../Shared/Input";
import Spinner from "../../Spinner";
import PageList from "../PageList";
import Error from "../../Error";
import AdminService from "../../../service";
import Editor from "../../Shared/Editor";

import checkMark from "../../../img/good.png";
import redCross from "../../../img/bad.png";
import { i18nSelector } from "../../../store/utils";

const name = "lesson";
let options = [];

export default class Lesson extends Component {
  state = {
    title: null,
    description: null,
    changeFlag: false,
    courseIndex: { value: null, label: null },
    lessonId: null,
    exam: null,
    activeLanguage: { label: "Russian", value: "ru" }
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

  //SELECTOR HANDLER
  handleChange = (value, selectorType) => {
    switch (selectorType) {
      case "course":
        this.setState({ courseIndex: value });
        break;
      case "language":
        this.setState({ activeLanguage: value });
      default:
        return;
    }
  };

  changeExamProp = exam => {
    this.setState({ exam: !exam });
  };

  getParams = (lessonId, title, description, exam, courseIndex) => {
    this.setState({
      lessonId: lessonId,
      changeFlag: true,
      courseIndex: courseIndex,
      exam: exam,
      title: title,
      description: description
    });
  };

  setParams = event => {
    event.preventDefault();
    const { changeLesson } = this.props;
    const { title, description, lessonId, exam, courseIndex } = this.state;

    if (title && description)
      changeLesson(lessonId, title, description, exam, name, courseIndex.value);
    this.setState({ changeFlag: false, lessonId: null });
  };

  //TEXT HANDLER
  onChange = event => {
    const { language, title, description } = this.state;
    const { activeLanguage } = this.props;
    switch (event.target.name) {
      case "title":
        this.setState({
          [event.target.name]: {
            ...title,
            [language.value]: event.target.value
          }
        });
        break;
      case "description":
        this.setState({
          [event.target.name]: {
            ...description,
            [activeLanguage.value]: event.target.value
          }
        });
        break;
      default:
        this.setState({ [event.target.name]: event.target.value });
    }
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

  render() {
    const { lesson, loading, deletePage, deleteTask, error } = this.props;
    const { changeFlag, courseIndex, title, description, exam, activeLanguage } = this.state;

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
                    <Select
                      value={activeLanguage}
                      onChange={(value, {}, selectorType = "language") =>
                        this.handleChange(value, selectorType)
                      }
                      options={i18nSelector}
                      maxMenuHeight={100}
                    />
                    <CustomInput
                      label="Title"
                      placeholder="Title goes here"
                      name="title"
                      value={title[activeLanguage.value]}
                      onChange={this.onChange}
                      required={true}
                    />
                    <LabelElement>Description of Lesson : </LabelElement>
                    <Editor
                      onChange={this.onChange}
                      name="description"
                      value={description[activeLanguage.value]}
                      language={activeLanguage.value}
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
                      onChange={(value, {}, selectorType = "course") =>
                        this.handleChange(value, selectorType)
                      }
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
                <SelectWrapper>
                  <Select
                    value={activeLanguage}
                    onChange={(value, {}, selectorType = "language") =>
                      this.handleChange(value, selectorType)
                    }
                    options={i18nSelector}
                  />
                </SelectWrapper>
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
                  <TitleSpan> {lesson.title[activeLanguage.value]}</TitleSpan>
                  <LabelElement>Description of Lesson : </LabelElement>
                  <DescriptionSpan
                    dangerouslySetInnerHTML={{
                      __html: lesson.description[activeLanguage.value]
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
                activeLanguage={activeLanguage}
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
