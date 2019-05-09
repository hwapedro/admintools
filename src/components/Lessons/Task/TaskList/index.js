import React from "react";
import { withRouter } from "react-router-dom";

const goTo = (lessonId, taskId, history) => {
  history.push(`/task/${lessonId}/${taskId}`);
};

const TaskList = (props) => {
  const {lessonId, page, deleteTask} = props
  const taskList = page.tasks.map(task => {
    let token = localStorage.getItem("userId");
    return (
      <li key={task._id}>
        <span onClick={() => goTo(lessonId ,task._id, props.history)}> {task.info.name}</span>
        <button onClick={() => deleteTask( page._id, task._id)}>
          Delete Task
        </button>
      </li>
    );
  });
  return taskList;
};
export default withRouter(TaskList);
