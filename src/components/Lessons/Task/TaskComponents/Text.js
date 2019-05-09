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
    });
  };

  deleteTask = ( pageId, taskId) => {
    this.props.deleteTask( pageId, taskId);
  };

  getParams = (name, options, id) => {
    this.setState({
      taskEditFlag: true,
      info: { name, options, id }
    });
  };

  parseAnswer = async string => {
    const rr = new RegExp(/\~([^~]*?)\~/gi);
    let options = [];
    let m;
    while ((m = rr.exec(string))) {
      options.push(m[1]);
    }
    await this.setState({
      info: {
        ...this.state.info,
        options: options
      }
    });
  };

  setParams = async (event,  taskId, type, info, pageId) => {
    event.preventDefault();
    await this.parseAnswer(this.state.info.name);

    await this.props.changeTask( taskId, type, info, pageId);
    await this.setState({ taskEditFlag: false, info: {} });
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
                      this.props.deleteTask( page._id, task._id)
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  deleteTask: ( pageId, taskid) =>
    dispatch(deleteTask( pageId, taskid)),
  changeTask: ( taskId, type, info, pageId) =>
    dispatch(changeTask( taskId, type, info, pageId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
