import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getLesson,
  deleteTask,
  changeTask
} from "../../../../store/actions/actionLessons";
import checkMark from "../../../../img/good.png";
import redCross from "../../../../img/bad.png";

let index = 150;
class Test extends Component {
  state = {
    taskType: "text",
    taskEditFlag: false,
    info: {}
  };

  infoChange = event => {
    this.setState({
      info: {
        ...this.state.info,
        [event.target.name]: event.target.value
      }
    }, console.log(this.state));
  };

  componentDidMount() {
    // const { getLesson, lessonId } = this.props;
    // let token = localStorage.getItem("userId");
    // getLesson(token, lessonId);
  }

  deleteTask = (token, pageId, taskId) => {
    this.props.deleteTask(token, pageId, taskId);
  };

  getParams = (name, options, id) => {
    this.setState(
      {
        taskEditFlag: true,
        info: { name, options, id }
      },
      console.log(this.state)
    );
  };

  setParams = (event, token, taskId, type, info, pageId) => {
    event.preventDefault();
    this.props.changeTask(token, taskId, type, info, pageId);
    this.setState({ taskEditFlag: false, info: {} });
  };

  render() {
    let token = localStorage.getItem("userId");
    const { name } = this.state.info;
    let list;
    this.props.lesson.pages.map(page => {
      list = page.tasks.map(task => {
        if (task._id === this.props.taskId) {
          if (this.state.taskEditFlag) {
            return (
              <>
                <div>
                  <span>Put words in ~ ~ to mark as answer</span>
                  <div>
                    <input
                      name="name"
                      placeholder="Question"
                      value={name}
                      onChange={this.infoChange}
                    />
                  </div>
             
                  <button
                    onClick={e =>
                      this.setParams(
                        e,
                        token,
                        task._id,
                        task.type,
                        this.state.info,
                        page._id
                      )
                    }
                  >
                    Confirm
                  </button>
                </div>
              </>
            );
          } else {
            return (
              <ul>
                <li key={task._id}>
                  {task.info.name}
                               
                  <button
                    onClick={() =>
                      this.getParams(
                        task.info.name,
                        task.info.options,
                        task._id
                      )
                    }
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      this.props.deleteTask(token, page._id, task._id)
                    }
                  >
                    Delete
                  </button>
                </li>
              </ul>
            );
          }
        }
      });
    });
    return <>{list}</>;
  }
}

const mapStateToProps = state => ({
  lesson: state.Lessons.lesson
});

const mapDispatchToProps = dispatch => ({
  getLesson: (token, id) => dispatch(getLesson(token, id)),
  deleteTask: (token, pageId, taskid) =>
    dispatch(deleteTask(token, pageId, taskid)),
  changeTask: (token, taskId, type, info, pageId) =>
    dispatch(changeTask(token, taskId, type, info, pageId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
