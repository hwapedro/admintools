import React, { Component } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";

import EditorText from "../../EditorText";
import Search from "../../Search";
import Button from "../../Shared/Button";
import CustomInput from "../../Shared/Input";
import Editor from "../../Shared/Editor";

import { ButtonWrapperConstructor } from "../styleLocal";
import {
  Wrapper,
  LabelElement,
  ButtonWrapper,
  DarkGround,
  ConsturctorWrapper,
  ConsturctorForm,
  SelectWrapper
} from "../../GlobalStyles/styleGlobal";
import { i18nSelector } from "../../../store/utils";

const name = "course";
const toolbar = [
  'bold', 'italic', 'heading', '|',
  'code', 'quote', 'unordered-list', 'ordered-list', '|',
  'link',
  {
    name: 'image',
    action: function customFunction(editor) {
      alert('This feature is not implemented yet.');
    },
    className: 'fa fa-picture-o',
    title: 'Insert Image',
  },
  'table', '|',
  'preview', 'side-by-side', 'fullscreen', '|',
  {
    name: 'Help',
    action: function customFunction(editor) {
      alert('This feature is not implemented yet.');
    },
    className: 'fa fa-keyboard-o',
    title: 'Editor Sortcuts',
  },
  {
    name: 'Help',
    action: function customFunction(editor) {
      alert('This feature is not implemented yet.');
    },
    className: 'fa fa-question-circle',
    title: 'Editor Help',
  },
  '|', // Separator
];

export default class CourseCounstructor extends Component {
  state = {
    title: null,
    description: null,
    language: { label: "Russian", value: "ru" },
    editorState: EditorState.createEmpty(),
    constructor: false
  };

  componentDidMount() {
    let i18nStart = {};
    i18nSelector.forEach(el => (i18nStart = { ...i18nStart, [el.value]: "" }));
    this.setState({
      title: i18nStart,
      description: i18nStart
    });
  }

  showConstructor = () => {
    const { constructor } = this.state;
    this.setState({
      constructor: !constructor
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { addCourses } = this.props;
    const { title, description } = this.state;
    this.showConstructor();
    addCourses(title, description, name);
  };

  onEditorStateChange = editorState => {
    const description = {
      ...this.state.description,
      [this.state.language.value]: stateToHTML(editorState.getCurrentContent())
    };

    this.setState({
      editorState: editorState,
      description: description
    });
  };

  //SELECTOR HANDLER
  handleChange = language => {
    const { description } = this.state;
    const contentState = stateFromHTML(description[language.value]);
    const editorState = EditorState.push(this.state.editorState, contentState);

    this.setState({ language: language, editorState: editorState });
  };

  onChange = event => {
    const { language, title, description } = this.state;
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
            [language.value]: event.target.value
          }
        });
        break;
      default:
        this.setState({ [event.target.name]: event.target.value });
    }
  };

  render() {
    const { onChange, value, activeLanguage, handleLangChange } = this.props;
    const {
      title,
      editorState,
      constructor,
      language,
      description
    } = this.state;
    return (
      <Wrapper>
        <ButtonWrapperConstructor>
          <Search onChange={onChange} value={value} />
          <SelectWrapper>
            <Select
              value={activeLanguage}
              onChange={handleLangChange}
              options={i18nSelector}
            />
          </SelectWrapper>
          <Button buttonStyle={"outlined"} onClick={this.showConstructor}>
            ADD NEW COURSE
          </Button>
          {constructor && (
            <>
              <DarkGround onClick={this.showConstructor} />
              <ConsturctorWrapper>
                <ConsturctorForm onSubmit={this.onSubmit}>
                  <LabelElement>Choose language</LabelElement>
                  <Select
                    value={language}
                    onChange={this.handleChange}
                    options={i18nSelector}
                    maxMenuHeight={100}
                  />
                  <CustomInput
                    label="Title"
                    placeholder="Title goes here"
                    name="title"
                    value={title[language.value]}
                    onChange={this.onChange}
                    required={true}
                  />
                  <LabelElement>Description</LabelElement>
                  <Editor
                    onChange={this.onChange}
                    name="description"
                    value={description[language.value]}
                  />
                  <EditorText
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                  />
                  <ButtonWrapper>
                    <Button buttonStyle={"outlined"} type="submit">
                      ADD NEW COURSE
                    </Button>
                  </ButtonWrapper>
                </ConsturctorForm>
              </ConsturctorWrapper>
            </>
          )}
        </ButtonWrapperConstructor>
      </Wrapper>
    );
  }
}

CourseCounstructor.defaultProps = {
  addCourses() {}
};

CourseCounstructor.propTypes = {
  addCourses: PropTypes.func
};
