import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  ButtonWrapper,
  TitleInput,
  DescriptionTextArea,
  LessonButton as ConstructirButton,
  Wrapper,
  DarkGround,
  LabelElement,
  ConsturctorForm,
  ConsturctorWrapper,
  ImgMark,
  ImgCross
} from "./style";

import checkMark from "../../img/good.png";
import redCross from "../../img/bad.png";

const name = "lesson";

class SetLessons extends Component {
  state = {
    title: "",
    description: "",
    exam: false,
    constructor: false,
  };

  onSubmit = event => {
    event.preventDefault();
    const { addLesson } = this.props;
    const { title, description, exam } = this.state;
    let token = localStorage.getItem("userId");
    addLesson(title, description, exam, token, name);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  showConstructor = () => {
    this.setState({
      constructor: !this.state.constructor
    });
  };

  ChangeExamTrue = () => {
    
    this.setState({ exam :  true})
    console.log(this.state.exam)
  }

  ChangeExamFalse = () => {
   
    this.setState({ exam :  false})
    console.log(this.state.exam)
  }

  render() {
    const {constructor,exam} = this.state
    if (constructor) {
      return (
        <Wrapper>
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
              
              <ImgMark  style={!exam ? {  filter: 'grayscale(100%)'} : {}} src={checkMark} onClick = {this.ChangeExamTrue} />
              <ImgCross style={exam ? {   filter: 'grayscale(100%)'} : {}}  src={redCross} onClick = {this.ChangeExamFalse}/>

              <ButtonWrapper>
                <ConstructirButton type="submit">
                  ADD NEW COURSE
                </ConstructirButton>
              </ButtonWrapper>
            </ConsturctorForm>
          </ConsturctorWrapper>
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        <ButtonWrapper>
          <ConstructirButton onClick={this.showConstructor}>
            ADD NEW LESSON
          </ConstructirButton>
        </ButtonWrapper>
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


