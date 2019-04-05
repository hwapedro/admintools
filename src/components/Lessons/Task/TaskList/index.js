import React from "react";

 const TaskList = ({page})=> {
  let taskList;
    console.log(page)
    taskList = page.tasks.map(task => {
      return (
         <li key={task._id}>
            <span> {task._id}</span>
          </li>
        
      );
    });
    return taskList
 
};
export default TaskList