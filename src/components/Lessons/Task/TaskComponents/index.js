import React, { Component } from "react";
import { connect } from "react-redux";

import { Wrapper } from "../style";

import Test from "./Tests";
import Text from "./Text";
import { getLesson } from "../../../../store/actions/actionLessons";
import Button from "../../../Button";
import Spinner from "../../../Spinner";
import Error from "../../../Error";

class Tasks extends Component {
  componentDidMount() {
    const { getLesson, lessonId } = this.props;
    getLesson(lessonId);
  }

  goBack = id => {
    this.props.history.push(`/lesson/${id}`);
  };

  constSwitch = (page, type, taskId, lessonId) => {
    switch (type) {
      case "test":
        return (
          <Test
            page={page}
            taskId={taskId}
            lessonId={lessonId}
            lesson={this.props.lesson}
          />
        );
      case "text":
        return (
          <Text
            page={page}
            taskId={taskId}
            lessonId={lessonId}
            lesson={this.props.lesson}
          />
        );
      default:
        return <div />;
    }
  };

  render() {
    const { lessonId, taskId, lesson, error, loading } = this.props;
    let page, task;

    for (let i = 0; i < lesson.pages.length; i++) {
      if (
        lesson.pages[i].tasks.find(task => task._id === taskId) !== undefined
      ) {
        page = lesson.pages[i];
        task = lesson.pages[i].tasks.find(task => task._id === taskId);
      }
    }
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
            {task && (
              <>{this.constSwitch(page, task.type, taskId, lessonId)} </>
            )}
          </Wrapper>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  lesson: state.Lessons.lesson,
  loading: state.Lessons.loading,
  error: state.Lessons.error
});

const mapDispatchToProps = dispatch => ({
  getLesson: id => dispatch(getLesson(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
