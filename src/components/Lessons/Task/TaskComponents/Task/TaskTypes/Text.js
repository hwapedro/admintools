import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  TaskElementWrapper,
  LabelElement,
  TitleSpan,
  ButtonsWrapper,
  TaskWrapper
} from "../../../styleLocal";

import Button from "../../../../../Shared/Button";
import TextConstructor from "../../../TaskConstructors/TextConstructor";

class Text extends Component {
  render() {
    const {
      task,
      page,
      deleteTask,
      changeEditFlag,
      taskEditFlag,
      lessonId,
      changeTask
    } = this.props;

    return (
      <TaskWrapper>
        {taskEditFlag ? (
          <TaskElementWrapper>
            <TextConstructor
              task={task}
              pageId={page._id}
              changeEditFlag={changeEditFlag}
              changeTask={changeTask}
            />
          </TaskElementWrapper>
        ) : (
          <TaskElementWrapper key={task._id}>
            <LabelElement> Title: </LabelElement>
            <TitleSpan>{task.info.name}</TitleSpan>
            <LabelElement> Description </LabelElement>
            <TitleSpan
              dangerouslySetInnerHTML={{
                __html: task.info.description
              }}
            />
            <LabelElement>Question:</LabelElement>
            <TitleSpan>{task.info.question}</TitleSpan>

            <LabelElement>Answers:</LabelElement>
            <TitleSpan>{task.info.options.join(" , ")}</TitleSpan>

            <ButtonsWrapper>
              <Button buttonStyle={"outlined"} onClick={() => changeEditFlag()}>
                Edit
              </Button>
              <Button
                buttonStyle={"outlined"}
                onClick={() => {
                  if (window.confirm("ARE YOU SURE ?")) {
                    deleteTask(page._id, task._id, lessonId)
                  }
                }}
              >
                Delete
              </Button>
            </ButtonsWrapper>
          </TaskElementWrapper>
        )}
      </TaskWrapper>
    );
  }
}

Text.defaultProps = {
  task: {},
  page: {},
  lessonId: null,
  taskEditFlag: false,
  changeEditFlag: false,
  deleteTask() {}
};

Text.propTypes = {
  task: PropTypes.object,
  page: PropTypes.object,
  lessonId: PropTypes.string.isRequired,
  taskEditFlag: PropTypes.bool,
  changeEditFlag: PropTypes.bool,
  deleteTask: PropTypes.func
};


export default Text;
