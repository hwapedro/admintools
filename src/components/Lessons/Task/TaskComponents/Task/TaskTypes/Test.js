import React, { Component } from "react";

import {
  TaskElementWrapper,
  LabelElement,
  TitleSpan,
  ButtonWrapper,
  ButtonsWrapper,
  TaskWrapper,
  OptionElementWrapper,
  OptionsWrapper,
  OptionSpan,
  ImgMark,
  ImgCross
} from "../../../styleLocal";

import Button from "../../../../../Shared/Button";
import checkMark from "../../../../../../img/good.png";
import redCross from "../../../../../../img/bad.png";
import TestConstructor from "../../../TaskConstructors/TestConstructor";

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
        <>
          {taskEditFlag ? (
            <TaskElementWrapper>
              <TestConstructor
                task={task}
                pageId={page._id}
                changeEditFlag={changeEditFlag}
              />
            </TaskElementWrapper>
          ) : (
            <TaskElementWrapper key={task._id}>
              <LabelElement>Title:</LabelElement>
              <TitleSpan>{task.info.name}</TitleSpan>
              <LabelElement>Description:</LabelElement>
              <TitleSpan
                dangerouslySetInnerHTML={{
                  __html: task.info.description
                }}
              />
              <LabelElement>Question:</LabelElement>
              <TitleSpan>{task.info.question}</TitleSpan>
              <LabelElement>Answer options:</LabelElement>
              <OptionsWrapper>
                {task.info.options.map(answ => {
                  return (
                    <OptionElementWrapper key={answ.index}>
                      <OptionSpan>{answ.answer}</OptionSpan>
                      {answ.right ? (
                        <ImgMark
                          width="15px"
                          height="15px"
                          margin-left="5px"
                          src={checkMark}
                        />
                      ) : (
                        <ImgCross
                          width="15px"
                          height="15px"
                          margin-left="5px"
                          src={redCross}
                        />
                      )}
                    </OptionElementWrapper>
                  );
                })}
              </OptionsWrapper>
              <ButtonsWrapper>
                <ButtonWrapper>
                  <Button
                    buttonStyle={"outlined"}
                    onClick={() => changeEditFlag()}
                  >
                    Edit
                  </Button>
                </ButtonWrapper>
                <ButtonWrapper>
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
                </ButtonWrapper>
              </ButtonsWrapper>
            </TaskElementWrapper>
          )}
        </>
      </TaskWrapper>
    );
  }
}

export default Test;
