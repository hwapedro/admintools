import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {
  EditorState,
  ContentState,
  convertFromHTML
} from "draft-js";

import EditorText from "../EditorText";

import checkMark from "../../img/good.png";
import redCross from "../../img/bad.png";

const name = "lesson";

class LessonsList extends Component {
  state = {
    title: "",
    description: "",
    changeFlag: false,
    _id: null
  };

  getParams = (_id, title, description) => {
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
      editorState: EditorState.createWithContent(state)
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
        name
      );
    this.setState({ changeFlag: false, _id: null });
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  deleteItem = _id => {
    const { delLesson } = this.props;
    delLesson(_id, name);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  goTo = id => {
    this.props.history.push(`/lesson/${id}`);
  };

  render() {
    const { lessons } = this.props;
    const { editorState } = this.state;
    let list = lessons.map((lesson, index) => {
      if (this.state.changeFlag && lesson._id === this.state._id) {
        return (
          <ElementWrapper key={lesson._id}>
            <form onSubmit={this.setParams}>
              <LabelElement>Name of Lessons :</LabelElement>
              <TitleInput
                name="title"
                onChange={this.onChange}
                value={this.state.title}
              />
              <LabelElement>Description of Lessons : </LabelElement>
              <EditorText
                editorState={editorState}
                onEditorStateChange={this.onEditorStateChange}
              />

              <ButtonWrapper>
                <SignInButton type="submit">CONFIRM</SignInButton>
              </ButtonWrapper>
            </form>
          </ElementWrapper>
        );
      } else {
        return (
          <Draggable
            key={lesson._id}
            draggableId={`draggableId-lesson-${lesson._id}`}
            index={index}
          >
            {provided => (
              <ElementWrapper
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                key={lesson._id}
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
                <ButtonWrapper>
                  <SignInButton onClick={() => this.goTo(lesson._id)}>
                    CHANGE Lessons
                  </SignInButton>
                  <SignInButton
                    onClick={() => {
                      if (window.confirm("Delete the item?")) {
                        this.deleteItem(lesson._id);
                      }
                    }}
                  >
                    DELETE Lessons
                  </SignInButton>
                </ButtonWrapper>
              </ElementWrapper>
            )}
          </Draggable>
        );
      }
    });
    return (
      <Wrapper>
        <Droppable droppableId="droppable">
          {provided => (
            <ElementsWrapper
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {list}
              {provided.placeholder}
            </ElementsWrapper>
          )}
        </Droppable>
      </Wrapper>
    );
  }
}

export default withRouter(LessonsList);

LessonsList.defaultProps = {
  lessons: [],
  loading: false,
  error: false,
  delLesson() {},
  changeLesson() {}
};

LessonsList.propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,

  delLesson: PropTypes.func,
  changeLesson: PropTypes.func
};

const Wrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleSpan = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
`;

const TitleInput = styled.input`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
  color: black;
`;

const LabelElement = styled.span`
  margin-top: 2rem;
  font-weight: 900;
  font-size: 1.8rem;
`;

const DescriptionSpan = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
`;

// const DescriptionTextArea = styled.textarea`
//   display: flex;
//   justify-content: flex-start;
//   width: 100%;
//   height: 400px;
//   max-height: 100%;
//   max-width: 100%;
//   resize: none;
//   align-items: center;
//   margin-top: 2rem;
//   font-size: 1.3rem;
//   color: black;
// `;

const ElementsWrapper = styled.ul`
  list-style-type: none;
  width: 1000px;
  margin: 0;
`;

const ElementWrapper = styled.li`
  background-color: ${props => props.theme.courses};
  margin-top: 2rem;
  border: 1px solid white;
  border-radius: 20px;
  padding: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 0.5rem;
`;
export const SignInButton = styled.button`
  width: 150px;
  height: 40px;
  border: 0;
  border-radius: 10px;
  background-color: ${props => props.theme.button};
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
    cursor: pointer;
  }
  margin-right: 1rem;
`;

export const ImgMark = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 1rem;
  margin-bottom: -0.4rem;
`;

export const ImgCross = styled.img`
  width: 2rem;
  height: 2rem;
  margin-left: 1rem;
  margin-bottom: -0.4rem;
`;
