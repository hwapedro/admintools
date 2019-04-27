import React, { Component } from "react";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";

const goTo = (lessonId, taskId, history) => {
  history.push(`/task/${lessonId}/${taskId}`);
};

class Tasks extends Component {
    state = {
        type: ""
    }
  render() {
    console.log(this.props.lesson)
    
    
    return { task };
  }
}

const mapStateToProps = state => ({
  lesson: state.Lessons.lesson
});

const mapDispatchToProps = dispatch => ({
  //   getLesson: (token, id) => dispatch(getLesson(token, id)),
  //   deleteTask: (token, pageId, taskid) =>
  //     dispatch(deleteTask(token, pageId, taskid)),
  //   changeTask: (token, taskId, type, info, pageId) =>
  //     dispatch(changeTask(token, taskId, type, info, pageId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
