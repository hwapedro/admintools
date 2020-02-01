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
      task,
      pageId,
      lessonId,
      taskEditFlag,
      changeEditFlag,
      deleteTask,
      changeTask
    } = this.props;

    const { activeLanguage } = this.state;

    switch (task.type) {
      case "select":
        return (
          <Test
            task={task}
            pageId={pageId}
            lessonId={lessonId}
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
            pageId={pageId}
            lessonId={lessonId}
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
  task: {},
  pageId: null,
  lessonId: null,
  taskEditFlag: false,
  changeEditFlag() {},
  deleteTask() {}
};

Task.propTypes = {
  lesson: PropTypes.object,
  task: PropTypes.object,
  pageId: PropTypes.string.isRequired,
  lessonId: PropTypes.string.isRequired,
  taskEditFlag: PropTypes.bool,
  changeEditFlag: PropTypes.func,
  deleteTask: PropTypes.func
};

export default Task;
