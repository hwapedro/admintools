import React from "react";

const TaskList = ({ page, deleteTask }) => {
  let taskList;

  taskList = page.tasks.map(task => {
    
    let token = localStorage.getItem("userId");
    return (
      
      <li key={task._id}>
        <span> {task.info.text}</span>
        <button
          onClick={() => deleteTask(token, page._id, task._id)
          }
        >
          Delete Task</button>
      </li>
    );
  });
  return taskList;
};
export default TaskList;
