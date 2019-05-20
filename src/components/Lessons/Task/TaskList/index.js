import React from "react";
import { withRouter } from "react-router-dom";

import {
  TaskElementWrapper,
  TitleSpan,
  ButtonWrapper,
  TaskButton
} from "../../style"

const goTo = (lessonId, taskId, history) => {
  history.push(`/task/${lessonId}/${taskId}`);
};
let id = 1;
const TaskList = props => {
  const { lessonId, page, deleteTask } = props;
  const taskList = page.tasks.map(task => {
    return (
      <TaskElementWrapper key={id++}>
        {task.info && (
          <TitleSpan onClick={() => goTo(lessonId, task._id, props.history)}>
            {task.info.name}
          </TitleSpan>
        )}
        <ButtonWrapper>
          <TaskButton onClick={() => deleteTask(page._id, task._id)}>
            {" "}
            Delete Task{" "}
          </TaskButton>
        </ButtonWrapper>
      </TaskElementWrapper>
    );
  });
  return <ul>{taskList}</ul>;
};
export default withRouter(TaskList);

