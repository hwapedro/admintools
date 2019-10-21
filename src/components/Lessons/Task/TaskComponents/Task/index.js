import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

import Test from "./TaskTypes/Test";
import Text from "./TaskTypes/Text";

import { SelectWrapper } from "../../../../GlobalStyles/styleGlobal";
import { i18nSelector } from "../../../../../store/utils";

class Task extends Component {
  state = {
    taskEditFlag: false,
    activeLanguage: { label: "Russian", value: "ru" }
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

    const { activeLanguage } = this.state;

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
            activeLanguage={activeLanguage}
            handleLangChange={activeLanguage =>
              this.handleLangChange(activeLanguage)
            }
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
            activeLanguage={activeLanguage}
            handleLangChange={activeLanguage =>
              this.handleLangChange(activeLanguage)
            }
          />
        );
      default:
        return <div />;
    }
  };

  handleLangChange = activeLanguage => {
    this.setState({ activeLanguage });
  };

  render() {
    const { task, taskEditFlag } = this.props;
    const { activeLanguage } = this.state;
    return (
      <>
        {taskEditFlag ? (
          <></>
        ) : (
          <SelectWrapper>
            <Select
              value={activeLanguage}
              onChange={this.handleLangChange}
              options={i18nSelector}
              maxMenuHeight={100}
            />
          </SelectWrapper>
        )}

        {task && <>{this.constSwitch()} </>}
      </>
    );
  }
}

Task.defaultProps = {
  lesson: {},
  task: {},
  page: {},
  lessonId: null,
  taskEditFlag: false,
  changeEditFlag() {},
  deleteTask() {}
};

Task.propTypes = {
  lesson: PropTypes.object,
  task: PropTypes.object,
  page: PropTypes.object,
  lessonId: PropTypes.string.isRequired,
  taskEditFlag: PropTypes.bool,
  changeEditFlag: PropTypes.func,
  deleteTask: PropTypes.func
};

export default Task;
