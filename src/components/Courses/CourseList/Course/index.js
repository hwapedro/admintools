import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  TitleSpan,
  LabelElement,
  DescriptionSpan,
  ButtonWrapper,
  SignInButton
} from "../../style.js";

class Course extends Component {
  render() {
    const { course, getParams, deleteItem } = this.props;

    return (
      <>
        <LabelElement>Name of course :</LabelElement>
        <TitleSpan> {course.title}</TitleSpan>
        <LabelElement>Description of course : </LabelElement>
        <DescriptionSpan>{course.description}</DescriptionSpan>
        <ButtonWrapper>
          <SignInButton
            onClick={() =>
              getParams(course.courseIndex, course.title, course.description)
            }
          >
            CHANGE COURSE
          </SignInButton>
          <SignInButton onClick={() => deleteItem(course.courseIndex)}>
            DELETE COURSE
          </SignInButton>
        </ButtonWrapper>
      </>
    );
  }
}

Course.defaultProps = {
  course: [],
  loading: false,
  error: false,

  getParams() {},
  deleteItem() {}
};

Course.propTypes = {
  course: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,

  getParams: PropTypes.func,
  deleteItem: PropTypes.func
};

export default Course;
