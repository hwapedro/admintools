import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import Button from "../../../Button";

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
        <ButtonsWrapper>
          <ButtonWrapper>
            <Button
              style={"outlined"}
              onClick={() => goTo(lessonId, task._id, props.history)}
            >
              Go To
            </Button>
          </ButtonWrapper>

          <ButtonWrapper>
            <Button
              style={"outlined"}
              onClick={() => deleteTask(page._id, task._id)}
            >
              Delete Task
            </Button>
          </ButtonWrapper>
        </ButtonsWrapper>
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

const TaskElementWrapper = styled.li`
  background-color: #dddddd;
  margin: 1.5rem 0;
  padding: 1rem;
  box-shadow: 0px 2px 4px rgb(0,0,0,0.3)
  display: flex;
  flex-direction: column;
 
`;

const Tasklist = styled.ul`
  padding: 0;
  list-style-type: none;
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

export const ButtonWrapper = styled.div`
  margin: 0.5rem 0
  text-align: end;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`