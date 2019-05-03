import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { EditorState, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import Article from "./Article";

import EditorText from "../../EditorText";



const token = localStorage.getItem("userId");
const name = "news";

class NewsList extends Component {
  state = {
    title: "",
    description: "",
    changeFlag: false,
    _id: null,
    editorState: EditorState.createEmpty()
  };

  getParams = (_id, title, description) => {
    this.setState({
      changeFlag: true,
      _id: _id,
      title: title,
      description: description
    });
  };

  onEditorStateChange = editorState => {
    let contentState = editorState.getCurrentContent();
    let rawState = convertToRaw(contentState);
    let html = stateToHTML(contentState);
    console.log(rawState)

    this.setState({
      editorState
    });
  };

  setParams = event => {
    event.preventDefault();
    const { title, description } = this.state;
    const { changeCourse } = this.props;
    if (title && description)
      changeCourse(
        this.state._id,
        this.state.title,
        this.state.description,
        token,
        name
      );
    this.setState({ changeFlag: false, _id: null });
  };

  deleteItem = id => {
    const { delNews } = this.props;
    delNews(id, token, name);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { news } = this.props;
    const { editorState } = this.state;

    let list = news.map((news, index) => {
      if (this.state.changeFlag && news._id === this.state._id) {
        return (
          <ElementWrapper key={news._id}>
            <form onSubmit={this.setParams}>
              <LabelElement>Name of news :</LabelElement>
              <TitleInput
                name="title"
                onChange={this.onChange}
                value={this.state.title}
              />
              <LabelElement>Description of news : </LabelElement>

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
          <Article
            key={news._id}
            news={news}
            index={index}
            getParams={this.getParams}
            deleteItem={this.deleteItem}
          />
        );
      }
    });
    return (
      <Wrapper>
        <ElementsWrapper>
          {list}
        </ElementsWrapper>
      </Wrapper>
    );
  }
}

export default NewsList;

NewsList.defaultProps = {
  news: [],
  loading: false,
  error: false
  //   delCourse() {},
  //   changeLesson() {}
};

NewsList.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool

  //   delCourse: PropTypes.func,
  //   changeLesson: PropTypes.func
};

const Wrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EditorWrapper = styled.div`
  min-height: 650px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  cursor: text;
  padding: 16px;
  border-radius: 2px;
  margin-bottom: 2em;
  box-shadow: inset 0px 1px 8px -3px #ababab;
  background: #fefefe;
  overflow: auto;
  height: 20rem;
`;
// const TitleSpan = styled.span`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   margin: 1rem 0;
//   font-size: 1.3rem;
// `;

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

// const DescriptionSpan = styled.span`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   margin: 1rem 0;
//   font-size: 1.3rem;
// `;

const DescriptionTextArea = styled.textarea`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 400px;
  max-height: 100%;
  max-width: 100%;
  resize: none;
  align-items: center;
  margin-top: 2rem;
  font-size: 1.3rem;
  color: black;
`;

const ElementsWrapper = styled.ul`
  margin: 0;
  list-style-type: none;
  width: 1000px;
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
  //
`;
