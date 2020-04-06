import React, { Component } from "react";
import PropTypes from "prop-types";

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
import TestConstructor from "../../../TaskConstructors/TestConstructor/";

class Test extends Component {
  render() {
    const {
      task,
      pageId,
      deleteTask,
      changeEditFlag,
      taskEditFlag,
      lessonId,
      changeTask,
      activeLanguage,
      handleLangChange
    } = this.props;
  
    return (
      <TaskWrapper>
        <>
          {taskEditFlag ? (
            <TaskElementWrapper>
              <TestConstructor
                task={task}
                pageId={pageId}
                changeEditFlag={changeEditFlag}
                changeTask={changeTask}
                activeLanguage={activeLanguage}
                handleLangChange={handleLangChange}
              />
            </TaskElementWrapper>
          ) : (
            <TaskElementWrapper key={task._id}>
              {/* <LabelElement>Title:</LabelElement>
              <TitleSpan>{task.info.name[activeLanguage.value]}</TitleSpan>
              <LabelElement>Description:</LabelElement>
              <TitleSpan
                dangerouslySetInnerHTML={{
                  __html: task.info.description[activeLanguage.value]
                }}
              /> */}
              <LabelElement>Question:</LabelElement>
              <TitleSpan>{task.info.question[activeLanguage.value]}</TitleSpan>
              <LabelElement>Answer options:</LabelElement>
              <OptionsWrapper>
                {task.info.choices.map(option => {
                   
                  return (
                    <OptionElementWrapper key={option.i}>
                      <OptionSpan>{option.c[activeLanguage.value]}</OptionSpan>
                      {task.answer.find(answ => answ === option.i) !== undefined ? (
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
              <LabelElement>Hint:</LabelElement>
              <TitleSpan>{task.info.hint[activeLanguage.value]}</TitleSpan>
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
                        deleteTask(pageId, task._id, lessonId);
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
Test.defaultProps = {
  task: {},
  pageId: null,
  lessonId: null,
  taskEditFlag: false,
  changeEditFlag() {},
  deleteTask() {}
};

Test.propTypes = {
  task: PropTypes.object,
  pageId: PropTypes.string.isRequired,
  lessonId: PropTypes.string.isRequired,
  taskEditFlag: PropTypes.bool,
  changeEditFlag: PropTypes.func,
  deleteTask: PropTypes.func
};

export default Test;
