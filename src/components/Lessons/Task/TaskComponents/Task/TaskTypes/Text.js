import React, { Component } from "react";

import {
  TaskElementWrapper,
  LabelElement,
  TitleSpan,
  ButtonsWrapper,
  TaskWrapper
} from "../../../styleLocal";

import Button from "../../../../../Shared/Button";
import TextConstructor from "../../../TaskConstructors/TextConstructor";

class Test extends Component {
  render() {
    const {
      task,
      page,
      deleteTask,
      changeEditFlag,
      taskEditFlag,
      lessonId
    } = this.props;

    return (
      <TaskWrapper>
        {taskEditFlag ? (
          <TaskElementWrapper>
            <TextConstructor
              task={task}
              pageId={page._id}
              changeEditFlag={changeEditFlag}
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
                    console.log(deleteTask)
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


export default Test;
