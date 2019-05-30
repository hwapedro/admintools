import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  ButtonWrapper,
  TitleInput,
  DescriptionTextArea,
  LessonButton as ConstructorButton,
  Wrapper,
  DarkGround,
  LabelElement,
  ConsturctorForm,
  ConsturctorWrapper,
  ImgMark,
  ImgCross
} from "./style";

import Search from "../Search";
import checkMark from "../../img/good.png";
import redCross from "../../img/bad.png";

const name = "lesson";

class SetLessons extends Component {
  state = {
    title: "",
    description: "",
    exam: false,
    constructor: false
  };

  onSubmit = event => {
    event.preventDefault();
    const { addLesson } = this.props;
    const { title, description, exam } = this.state;

    addLesson(title, description, exam, name);
  };

  showConstructor = () => {
    this.setState({
      constructor: !this.state.constructor
    });
  };

  ChangeExamTrue = () => {
    this.setState({ exam: true });
  };

  ChangeExamFalse = () => {
    this.setState({ exam: false });
  };

  render() {
    const { constructor, exam } = this.state;
    const { onChange, value } = this.props;

    return (
      <Wrapper>
        <ButtonWrapper>
          <Search onChange={onChange} value={value} />
          <ConstructorButton onClick={this.showConstructor}>
            ADD NEW LESSON
          </ConstructorButton>
        </ButtonWrapper>
        {constructor && (
          <>
            <DarkGround onClick={this.showConstructor} />
            <ConsturctorWrapper>
              <ConsturctorForm onSubmit={this.onSubmit}>
                <LabelElement>title</LabelElement>
                <TitleInput
                  name="title"
                  placeholder="title"
                  type="text"
                  value={this.state.title}
                  onChange={this.onChange}
                />
                <LabelElement>description</LabelElement>
                <DescriptionTextArea
                  name="description"
                  placeholder="description"
                  value={this.state.description}
                  type="text"
                  onChange={this.onChange}
                />
                <LabelElement>EXAM :</LabelElement>

                <ImgMark
                  style={!exam ? { filter: "grayscale(100%)" } : {}}
                  src={checkMark}
                  onClick={this.ChangeExamTrue}
                />
                <ImgCross
                  style={exam ? { filter: "grayscale(100%)" } : {}}
                  src={redCross}
                  onClick={this.ChangeExamFalse}
                />

                <ButtonWrapper>
                  <ConstructorButton type="submit">
                    ADD NEW LESSON
                  </ConstructorButton>
                </ButtonWrapper>
              </ConsturctorForm>
            </ConsturctorWrapper>
          </>
        )}
      </Wrapper>
    );
  }
}

export default SetLessons;

SetLessons.defaultProps = {
  addLesson() {}
};

SetLessons.propTypes = {
  addLesson: PropTypes.func
};
