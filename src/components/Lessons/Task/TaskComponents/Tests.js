import React, { Component } from "react";
import { connect } from "react-redux";

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
  ImgCross,
} from "../styleLocal";

import {
  // getLesson,
  deleteTask,
  changeTask
} from "../../../../store/actions/actionLessons";
import Button from "../../../Button";
import checkMark from "../../../../img/good.png";
import redCross from "../../../../img/bad.png";
import TestConstructor from "../TaskConstructors/TestConstructor";

class Test extends Component {
  state = {
    taskType: "test",
    taskEditFlag: false,
    info: {}
  };

  deleteTask = (pageId, taskId) => {
    this.props.deleteTask(pageId, taskId);
  };

  getParams = (name, description, question, options, id) => {
    this.setState({
      taskEditFlag: true,
      info: { name, description, question, options, id }
    });
  };

  changeEditFlag = () =>
    this.setState({
      taskEditFlag: false
    });

  render() {
    const { taskEditFlag } = this.state;
    let list;
    const { page, taskId, deleteTask } = this.props;

    list = page.tasks.map(task => {
      if (task._id === taskId) {
        return (
          <>
            {taskEditFlag ? (
              <TaskElementWrapper>
                <TestConstructor
                  task={task}
                  pageId={page._id}
                  changeEditFlag={this.changeEditFlag}
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
                      onClick={() =>
                        this.getParams(
                          task.info.name,
                          task.info.description,
                          task.info.question,
                          task.info.options,
                          task._id
                        )
                      }
                    >
                      Edit
                    </Button>
                  </ButtonWrapper>
                  <ButtonWrapper>
                    <Button
                      buttonStyle={"outlined"}
                      onClick={() => deleteTask(page._id, task._id)}
                    >
                      Delete
                    </Button>
                  </ButtonWrapper>
                </ButtonsWrapper>
              </TaskElementWrapper>
            )}
          </>
        );
      }
    });

    return <TaskWrapper>{list}</TaskWrapper>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  deleteTask: (pageId, taskid) => dispatch(deleteTask(pageId, taskid)),
  changeTask: (taskId, type, info, pageId) =>
    dispatch(changeTask(taskId, type, info, pageId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
