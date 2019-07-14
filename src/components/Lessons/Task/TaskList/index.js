import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { ButtonWrapper, TaskButton } from "../../style";
import Tasks from "../TaskComponents";

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
          <TaskInfo>
            <span>Task type:</span>
            <TitleSpan>{task.type}</TitleSpan>
            <span>Task title:</span>
            <TitleSpan>{task.info.name}</TitleSpan>
            <span>Task description:</span>
            <TitleSpan
              dangerouslySetInnerHTML={{
                __html: task.info.description
              }}
            />
            <span>Question:</span>
            <TitleSpan>{task.info.question}</TitleSpan>
          </TaskInfo>
        )}
        <ButtonWrapper>
          <TaskButton onClick={() => goTo(lessonId, task._id, props.history)}>
            Edit
          </TaskButton>
        </ButtonWrapper>

        <ButtonWrapper>
          <TaskButton onClick={() => deleteTask(page._id, task._id)}>
            Delete Task
          </TaskButton>
        </ButtonWrapper>
      </TaskElementWrapper>
    );
  });
  return <Tasklist>{taskList}</Tasklist>;
};
export default withRouter(TaskList);

const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskElementWrapper = styled.div`
  background-color: #bbbbbb;
  margin: 1.5rem 0;
  padding: 1rem;
  box-shadow: 0px 2px 4px rgb(0,0,0,0.3)
  display: flex;
  flex-direction: column;
  z-index: 50;
`;

const Tasklist = styled.ul`
  padding: 0;
`;
const TitleSpan = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1rem;
  color: black;
  padding-left: 0.7em;
  width: 100%;
`;
