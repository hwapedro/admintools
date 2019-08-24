import React, { Component } from "react";
import PropTypes from "prop-types";

import Test from "./TaskTypes/Test";
import Text from "./TaskTypes/Text";

class Task extends Component {
  state = {
    taskEditFlag: false,
    info: {}
  };

  constSwitch = () => {
    const {
      lesson,
      task,
      page,
      lessonId,
      taskEditFlag,
      changeEditFlag,
      deleteTask,
      changeTask
    } = this.props;

    switch (task.type) {
      case "test":
        return (
          <Test
            task={task}
            page={page}
            lessonId={lessonId}
            lesson={lesson}
            taskEditFlag={taskEditFlag}
            changeEditFlag={changeEditFlag}
            deleteTask={deleteTask}
            changeTask={changeTask}
          />
        );
      case "text":
        return (
          <Text
            task={task}
            page={page}
            lessonId={lessonId}
            lesson={lesson}
            taskEditFlag={taskEditFlag}
            changeEditFlag={changeEditFlag}
            deleteTask={deleteTask}
            changeTask={changeTask}
          />
        );
      default:
        return <div />;
    }
  };

  render() {
    const { task } = this.props;
    return <>{task && <>{this.constSwitch()} </>}</>;
  }
}

Task.defaultProps = {
  lesson: {},
  task: {},
  page: {},
  lessonId: null,
  taskEditFlag: false,
  changeEditFlag: false,
  deleteTask() {}
};

Task.propTypes = {
  lesson: PropTypes.object,
  task: PropTypes.object,
  page: PropTypes.object,
  lessonId: PropTypes.string.isRequired,
  taskEditFlag: PropTypes.bool,
  changeEditFlag: PropTypes.bool,
  deleteTask: PropTypes.func
};

export default Task;
