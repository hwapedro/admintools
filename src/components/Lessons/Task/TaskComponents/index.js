import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Wrapper } from "../styleLocal";

import {
  deleteTask,
  changeTask
} from "../../../../store/actions/actionLessons";

import Task from "./Test";
import Text from "./Text";
import { getLesson } from "../../../../store/actions/actionLessons";
import Button from "../../../Shared/Button";
import Spinner from "../../../Spinner";
import Error from "../../../Error";

class TaskContainer extends Component {
  componentDidMount() {
    const { getLesson, lessonId } = this.props;
    getLesson(lessonId);
  }

  goBack = id => {
    this.props.history.push(`/lesson/${id}`);
  };

  deleteTask = (pageId, taskId) => {
    this.props.deleteTask(pageId, taskId);
  };

  getParams = (name, description, question, options, id) => {
    this.setState({
      taskEditFlag: true,
      info: { name, description, question, options, id }
    });
  };

  changeEditFlag = () =>
    this.setState({
      taskEditFlag: false
    });

  constSwitch = (page, type, taskId, lessonId) => {
    const { lesson } = this.props;
    switch (type) {
      case "test":
        return (
          <Task
            page={page}
            taskId={taskId}
            lessonId={lessonId}
            lesson={lesson}
          />
        );
      case "text":
        return (
          <Text
            page={page}
            taskId={taskId}
            lessonId={lessonId}
            lesson={lesson}
          />
        );
      default:
        return <div />;
    }
  };

  render() {
    const { lessonId, taskId, lesson, error, loading } = this.props;
    let page, task;
    console.log(lesson);
    lesson.pages.map(pageElemnt =>
      pageElemnt.tasks.map(taskElemet => {
        if (taskElemet._id === taskId) {
          task = taskElemet;
          page = pageElemnt;
        }
      })
    );

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
              onClick={() => this.goBack(this.props.lesson._id)}
            >
              Back
            </Button>
           {task && 
           <Task
              task={task}
              taskId={taskId}
              lessonId={lessonId}
              lesson={lesson}
            />}

            {task && (
              <>{this.constSwitch(page, task.type, taskId, lessonId)} </>
            )}
          </Wrapper>
        )}
      </>
    );
  }
}
TaskContainer.defaultProps = {
  lesson: {},
  loading: false,
  error: false,

  getLesson() {}
};

TaskContainer.propTypes = {
  lesson: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,

  getLesson: PropTypes.func
};

const mapStateToProps = state => ({
  lesson: state.Lessons.lesson,
  loading: state.Lessons.loading,
  error: state.Lessons.error
});

const mapDispatchToProps = dispatch => ({
  getLesson: id => dispatch(getLesson(id)),
  deleteTask: (pageId, taskid) => dispatch(deleteTask(pageId, taskid)),
  changeTask: (taskId, type, info, pageId) =>
    dispatch(changeTask(taskId, type, info, pageId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskContainer);
