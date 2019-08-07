import React, { Component } from "react";

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
      deleteTask
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

export default Task;
