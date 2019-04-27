import React, { Component } from "react";
import { connect } from "react-redux";

import {getLesson, deleteTask, changeTask} from "../../../../store/actions/actionLessons"
import checkMark from "../../../../img/good.png";
import redCross from "../../../../img/bad.png";

let index = 150;
class Tests extends Component {
  state = {
    taskType: null,
    taskEditFlag: false,
    info: {}
  };

  
  componentDidMount() {
    const { getLesson } = this.props;
    let token = localStorage.getItem("userId");
    getLesson(token, this.props.lessonId);
    
  }

  addOption = () => {
    const answer = "";
    const right = false;
    index++;
    this.setState({
      info: {
        ...this.state.info,
        options: [...this.state.info.options, { answer, right, index }]
      }
    });
  };

  deleteOption = index => {
    let newOptions = this.state.info.options.filter(
      option => option.index !== index
    );
    this.setState({
      info: {
        ...this.state.info,
        options: newOptions
      }
    });
  };

  answerChange = (id, event) => {
    let newOptions = this.state.info.options.map(option =>
      id === option.index
        ? {
            answer: event.target.value,
            right: option.right,
            index: option.index
          }
        : option
    );
    this.setState({
      info: {
        ...this.state.info,
        options: newOptions
      }
    });
  };

  setRight = (id, event) => {
    let newOptions = this.state.info.options.map(option =>
      id === option.index
        ? {
            answer: option.answer,
            right: event.target.checked,
            index: option.index
          }
        : option
    );
    this.setState({
      info: {
        ...this.state.info,
        options: newOptions
      }
    });
  };
  infoChange = event => {
    this.setState({
      info: {
        ...this.state.info,
        [event.target.name]: event.target.value
      }
    }, console.log(this.state));
  };

  // deleteTask = (token, pageId, taskId) => {
  //   this.props.deleteTask(token, pageId, taskId);
  // };

  selectChange = event => {
    if (event.target.value === "test") {
      this.setState({
        taskType: event.target.value,
        displayTestConstructor: true
      });
    } else {
      this.setState({ displayTestConstructor: false });
    }
  };

  getParams = (name, description, question, options, id) => {
    this.setState({
      taskEditFlag: true,
      info: { name, description, question, options, id }
    });
    console.log(this.state)
  };

  setParams = ( event, token, taskId, type, info, pageId) => {
    event.preventDefault();
    this.props.changeTask(token, taskId, type, info, pageId);
    this.setState({ taskEditFlag: false, info: {} });
  };

  goBack = id => {
    this.props.history.push(`/lesson/${id}`);
  };

  render() {
    let token = localStorage.getItem("userId");
    const { name, description, question, options } = this.state.info;
    let list
    this.props.lesson.pages.map(page => {
      list = page.tasks.map(task => {
      // console.log(this.props.lesson)

        if (this.state.taskEditFlag && task._id === this.props.taskId) {
          return (
            <>
              <div>
                <div>
                  <input
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={this.infoChange}
                  />
                </div>
                <div>
                  <input
                    name="description"
                    placeholder="Description"
                    onChange={this.infoChange}
                    value={description}
                  />
                </div>
                <div>
                  <input
                    name="question"
                    placeholder="Question"
                    onChange={this.infoChange}
                    value={question}
                  />
                </div>
                <div>
                  <button onClick={this.addOption}>Add answer option</button>
                </div>

                <form onSubmit={this.setParams}>
                  <div>
                    {options.map(el => {
                      return (
                        <div className="form-check" key={el.index}>
                          <li>
                            <input
                              name="answer"
                              placeholder="Answer"
                              value={el.answer}
                              onChange={e => this.answerChange(el.index, e)}
                            />
                            <input
                              type="checkbox"
                              checked={el.right}
                              onChange={e => this.setRight(el.index, e)}
                            />
                            <button onClick={() => this.deleteOption(token, page._id, task._id)}>
                              Delete option
                            </button>
                          </li>
                        </div>
                      );
                    })}
                  </div>
                </form>
                <button onClick={e => this.setParams(e, token, task._id, task.type, this.state.info, page._id)}>
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
                <br />
                {task.info.description}
                <br />
                {task.info.question}
                <ul>
                  {task.info.options.map(answ => {
                    return (
                      <li key={answ.index}>
                        {answ.answer}
                        {answ.right ? (
                          <img
                            width="15px"
                            height="15px"
                            margin-left="5px"
                            src={checkMark}
                          />
                        ) : (
                          <img
                            width="15px"
                            height="15px"
                            margin-left="5px"
                            src={redCross}
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>
                <button
                  onClick={() =>
                    this.getParams(
                      task.info.name,
                      task.info.description,
                      task.info.question,
                      task.info.options,
                      task._id
                    )
                  }
                >
                  Edit
                </button>
                <button onClick={() => this.props.deleteTask(task._id)}>
                  Delete
                </button>
                <button onClick={() => this.goBack(this.state.lesson._id)}>
                  Back
                </button>
              </li>
              }
            </ul>
          );
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
   deleteTask: (token, pageId, taskid) => dispatch(deleteTask(token, pageId, taskid)),
   changeTask: (token, taskId, type, info, pageId) =>
    dispatch(changeTask(token, taskId, type, info, pageId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tests);
