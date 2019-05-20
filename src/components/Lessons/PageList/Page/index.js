import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import {
  ButtonWrapper,
  LessonButton,
  ElementWrapper,
  LabelElement,
} from "../../style";

import TaskList from "../../Task/TaskList";
import TaskConstructor from "../../Task/TaskConstructors/";
// import Error from "../../../Error";

class Page extends Component {
  render() {
    const { lessonId, pages, deletePage, deleteTask, pageNumber } = this.props;
    let list;

    if (pages) {
      list = pages.map((page, index) => {
        if (page.tasks && index === pageNumber) {
          return (
            <ElementWrapper key={page._id}>
              <LabelElement> {page.text}</LabelElement>
              <TaskConstructor pageId={page._id} />

              <TaskList
                lessonId={lessonId}
                page={page}
                deleteTask={deleteTask}
              />
              <ButtonWrapper>
                <LessonButton onClick={() => deletePage(page._id)}>
                  Delete page
                </LessonButton>
              </ButtonWrapper>
            </ElementWrapper>
          );
        }
      });
    }

    return <ul>{list}</ul>;
  }
}

export default withRouter(Page);
