import React, { Component } from "react";
import { connect } from "react-redux";

import {
  deleteTask,
  changeTask
} from "../../../../store/actions/actionLessons";

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

  deleteTask = (pageId, taskId) => {
    this.props.deleteTask(pageId, taskId);
  };

  getParams = (name, text, options, id) => {
    this.setState({
      taskEditFlag: true,
      info: { name, text, options, id }
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

  setParams = async (event, taskId, type, info, pageId) => {
    event.preventDefault();
    await this.parseAnswer(this.state.info.text);

    await this.props.changeTask(taskId, type, info, pageId);
    await this.setState({ taskEditFlag: false, info: {} });
  };

  render() {
    const { name , text} = this.state.info;
    let list;
    const { page, taskId, deleteTask } = this.props;

    list = page.tasks.map(task => {
      console.log(task)
      if (task._id === taskId) {
        if (this.state.taskEditFlag) {
          return (
            <>
              <div>
                <span>Put words in ~ ~ to mark as answer</span>
                <div>
                  <input
                    name="name"
                    placeholder="Title"
                    value={name}
                    onChange={this.infoChange}
                  />
                </div>
                <div>
                  <input
                    text="text"
                    placeholder="Question"
                    value={text}
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
                <div>{task.info.name}</div>

                <div>{task.info.text}</div>

                <button
                  onClick={() =>
                    this.getParams(task.info.name, task.info.text, task.info.options, task._id)
                  }
                >
                  Edit
                </button>
                <button onClick={() => deleteTask(page._id, task._id)}>
                  Delete
                </button>
              </li>
            </ul>
          );
        }
      }
    });

    return <>{list}</>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  deleteTask: (pageId, taskid) => dispatch(deleteTask(pageId, taskid)),
  changeTask: (taskId, type, info, pageId) =>
    dispatch(changeTask(taskId, type, info, pageId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
