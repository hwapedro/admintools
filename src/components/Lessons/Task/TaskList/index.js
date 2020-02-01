import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import {
  TaskElementWrapper,
  TaskInfo,
  LabelElement,
  TitleSpan,
  ButtonsWrapper,
  ButtonWrapper,
  TaskListWrapper
} from "../styleLocal";
import Button from "../../../Shared/Button";

const goTo = (task, lessonId, pageId, taskId, props) => {
  const { history, setTask } = props;
  setTask(task);
  history.push(`/task/${lessonId}/${pageId}/${taskId}`);
};

let id = 1;
const TaskList = props => {
  const { lessonId, page, deleteTask, activeLanguage } = props;
  const taskList = page.tasks.map(task => {
    console.log(page._id, task._id);
    return (
      <TaskElementWrapper key={id++}>
        {task.info && (
          <TaskInfo>
            <LabelElement>Task type:</LabelElement>
            <TitleSpan>{task.type}</TitleSpan>
            {/* <LabelElement>Task title:</LabelElement>
            <TitleSpan>{task.info.name[activeLanguage.value]}</TitleSpan> */}
            {/* <LabelElement>Task description:</LabelElement>
            <TitleSpan
              dangerouslySetInnerHTML={{
                __html: task.info.description[activeLanguage.value]
              }}
            /> */}
            <LabelElement>Question:</LabelElement>
            <TitleSpan>{task.info.question[activeLanguage.value]}</TitleSpan>
          </TaskInfo>
        )}

        <ButtonsWrapper>
          <ButtonWrapper>
            <Button
              buttonStyle={"outlined"}
              onClick={() => goTo(task, lessonId, page._id, task._id, props)}
            >
              Go To
            </Button>
          </ButtonWrapper>

          <ButtonWrapper>
            <Button
              buttonStyle={"outlined"}
              onClick={() => {
                if (window.confirm("ARE YOU SURE ?")) {
                  deleteTask(page._id, task._id);
                }
              }}
            >
              Delete Task
            </Button>
          </ButtonWrapper>
        </ButtonsWrapper>
      </TaskElementWrapper>
    );
  });
  return <TaskListWrapper>{taskList}</TaskListWrapper>;
};

TaskList.defaultProps = {
  lessonId: null,
  page: {},
  deleteTask() {},
  setTask() {}
};

TaskList.propTypes = {
  lessonId: PropTypes.string.isRequired,
  page: PropTypes.object,
  deleteTask: PropTypes.func,
  setTask: PropTypes.func
};

export default withRouter(TaskList);
