import React, { Component } from "react";
import PropTypes from "prop-types";

import { Wrapper } from "../styleLocal";

import Task from "./Task";
import Button from "../../../Shared/Button";
import Spinner from "../../../Spinner";
import Error from "../../../Error";

export default class TaskContainer extends Component {
  state = {
    taskEditFlag: false
  };

  componentDidMount() {
    const { getLesson, lessonId } = this.props;
    getLesson(lessonId);
  }

  goBack = id => {
    this.props.history.push(`/lesson/${id}`);
  };

  deleteTask = (pageId, taskId, lessonId) => {
    const { deleteTask } = this.props;
    deleteTask(pageId, taskId);
    this.goBack(lessonId);
  };

  changeEditFlag = () =>
    this.setState({
      taskEditFlag: !this.state.taskEditFlag
    });

  render() {
    const { taskEditFlag } = this.state;
    const { lessonId, taskId, lesson, error, loading, changeTask } = this.props;
    let page, task;

    lesson.pages.map(pageElemnt =>
      pageElemnt.tasks.map(taskElemet => {
        if (taskElemet._id === taskId) {
          task = taskElemet;
          page = pageElemnt;
        }
      })
    );

    return (
      <>
        {error && (
          <>
            <Error name={"Task"} />
          </>
        )}

        {loading && (
          <>
            <Spinner />
          </>
        )}
        {!error && !loading && (
          <Wrapper>
            <Button
              buttonStyle={"outlined"}
              onClick={() => this.goBack(this.props.lesson._id)}
            >
              Back
            </Button>

            {task && (
              <Task
                page={page}
                task={task}
                lessonId={lessonId}
                lesson={lesson}
                taskEditFlag={taskEditFlag}
                deleteTask={this.deleteTask}
                changeEditFlag={this.changeEditFlag}
                changeTask={(taskId, type, info, pageId) =>
                  changeTask(taskId, type, info, pageId)
                }
              />
            )}
          </Wrapper>
        )}
      </>
    );
  }
}

TaskContainer.defaultProps = {
  lesson: {},
  loading: false,
  error: false,

  getLesson() {},
  deleteTask() {}
};

TaskContainer.propTypes = {
  lesson: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,

  getLesson: PropTypes.func,
  deleteTask: PropTypes.func
};
