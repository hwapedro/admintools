import React, { Component } from "react";
import { connect } from "react-redux";


//import { withRouter } from "react-router-dom";

import Test from "./Tests";
import Text from "./Text";
import { getLesson } from "../../../../store/actions/actionLessons";

const goTo = (lessonId, taskId, history) => {
  history.push(`/task/${lessonId}/${taskId}`);
};

class Tasks extends Component {

  componentDidMount() {
    const { getLesson, lessonId } = this.props;
    let token = localStorage.getItem("userId");
    getLesson( lessonId);
  }

  goBack = id => {
    this.props.history.push(`/lesson/${id}`);
  };

  constSwitch = (type, taskId, lessonId) => {
    switch (type) {
      case "test":
        return (
          <Test
            taskId={taskId}
            lessonId={lessonId}
            lesson={this.props.lesson}
          />
        );
      case "text":
        return (
          <Text
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
    const { lessonId, taskId, lesson } = this.props;
    let letask;

    lesson.pages.map(page => {
      letask = page.tasks.find(task => task._id === taskId);
    });

    return (
      <>
        {letask && (
          <div>{this.constSwitch(letask.type, taskId, lessonId)} </div>
        )}
        <button onClick={() => this.goBack(this.props.lesson._id)}>Back</button>
      </>
    );
  }
}

const mapStateToProps = state => ({
  lesson: state.Lessons.lesson
});

const mapDispatchToProps = dispatch => ({
  getLesson: ( id) => dispatch(getLesson( id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
