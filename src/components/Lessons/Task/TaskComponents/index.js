import React, { Component } from "react";
import PropTypes from "prop-types";

import { Wrapper } from "../styleLocal";

import TaskContainer from "../../../../containers/TaskContainer";

import Button from "../../../Shared/Button";
import Spinner from "../../../Spinner";
import Error from "../../../Error";

export default class Tasks extends Component {
  state = {
    taskEditFlag: false
  };

  componentDidMount() {
    const { lessonId } = this.props;
    //todo get task
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
    const {
      pageId,
      lessonId,
      error,
      loading,
      task
    } = this.props;

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
              onClick={() => this.goBack(lessonId)}
            >
              Back
            </Button>

            {task && (
              <TaskContainer
                pageId={pageId}
                lessonId={lessonId}
                taskEditFlag={taskEditFlag}
                changeEditFlag={this.changeEditFlag}
              />
            )}
          </Wrapper>
        )}
      </>
    );
  }
}

Tasks.defaultProps = {
  loading: false,
  error: false,
  task: {},

  getLesson() {},
  deleteTask() {}
};

Tasks.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  task: PropTypes.object,

  getLesson: PropTypes.func,
  deleteTask: PropTypes.func
};
