import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

import Test from "./TaskTypes/Test";
import Text from "./TaskTypes/Text";

import { SelectWrapper } from "../../../../GlobalStyles/styleGlobal";
import { i18nSelector } from "../../../../../store/utils";
import { Wrapper } from "../../styleLocal";
import Button from "../../../../Shared/Button";
import Spinner from "../../../../Spinner";
import Error from "../../../../Error";

class Task extends Component {
  state = {
    taskEditFlag: false,
    activeLanguage: { label: "Russian", value: "ru" }
  };

  componentDidMount() {
    const { taskId, getTask } = this.props;
    getTask(taskId);
  }

  handleLangChange = activeLanguage => {
    this.setState({ activeLanguage });
  };

  goBack = id => {
    this.props.setLoading(true);
    this.props.history.push(`/lesson/${id}`);
  };

  deleteTask = (pageId, taskId, lessonId) => {
    const { deleteTask } = this.props;
    deleteTask(pageId, taskId);
    this.goBack(lessonId);
  };

  changeEditFlag = () =>
    this.setState({
      taskEditFlag: !this.state.taskEditFlag
    });

  constSwitch = () => {
    const { task, pageId, lessonId, changeTask } = this.props;

    const { activeLanguage, taskEditFlag } = this.state;

    switch (task.type) {
      case "test":
        return (
          <Test
            task={task}
            pageId={pageId}
            lessonId={lessonId}
            taskEditFlag={taskEditFlag}
            changeEditFlag={this.changeEditFlag}
            deleteTask={this.deleteTask}
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
            changeEditFlag={this.changeEditFlag}
            deleteTask={this.deleteTask}
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

  render() {
    const { task, taskEditFlag, lessonId, error, loading } = this.props;
    const { activeLanguage } = this.state;
    return (
      <>
        {error && (
          <>
            <Error name={"Task"} />
          </>
        )}

        {loading && (
          <>
            <Spinner />
          </>
        )}

        {!error && !loading && (
          <Wrapper>
            <Button
              buttonStyle={"outlined"}
              onClick={() => this.goBack(lessonId)}
            >
              Back
            </Button>

            {!taskEditFlag && (
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
          </Wrapper>
        )}
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
