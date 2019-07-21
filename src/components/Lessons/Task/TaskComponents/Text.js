import React, { Component } from "react";
import { connect } from "react-redux";

import {
  TaskElementWrapper,
  LabelElement,
  TitleSpan,
  ButtonsWrapper,
  TaskWrapper,
  DarkGround
} from "../style";

import {
  deleteTask,
  changeTask
} from "../../../../store/actions/actionLessons";

import Button from "../../../Button";
import TextConstructor from "../TaskConstructors/TextConstructor";


class Test extends Component {
  state = {
    taskType: "text",
    taskEditFlag: false,
    info: {}
  };

  deleteTask = (pageId, taskId) => {
    this.props.deleteTask(pageId, taskId);
  };

  getParams = (name, text, options, id) => {
    this.setState({
      taskEditFlag: true,
      info: { name, text, options, id }
    });
  };

  changeEditFlag = () =>
    this.setState({
      taskEditFlag: false
    });

  render() {
    const { taskEditFlag } = this.state;
    let list;
    const { page, taskId, deleteTask} = this.props;

    list = page.tasks.map(task => {
      if (task._id === taskId) {
        return (
          <>
            {taskEditFlag ? (
              <>
                <DarkGround onClick={this.changeEditFlag} />
                <TextConstructor
                  task={task}
                  pageId={page._id}
                  changeEditFlag={this.changeEditFlag}
                />
              </>
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
                <TitleSpan>{task.info.options}</TitleSpan>

                <ButtonsWrapper>
                  <Button
                    buttonStyle={"outlined"}
                    onClick={() =>
                      this.getParams(
                        task.info.name,
                        task.info.text,
                        task.info.options,
                        task._id
                      )
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    buttonStyle={"outlined"}
                    onClick={() => deleteTask(page._id, task._id)}
                  >
                    Delete
                  </Button>
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
