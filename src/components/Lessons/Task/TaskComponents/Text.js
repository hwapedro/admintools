import React, { Component } from "react";
import { connect } from "react-redux";

import {
  TaskElementWrapper,
  LabelElement,
  TitleSpan,
  ButtonWrapper,
  ButtonsWrapper,
  TaskWrapper,
  Wrapper,
  OptionElementWrapper,
  OptionsWrapper,
  OptionSpan,
  ImgMark,
  ImgCross
} from "../style";

import {
  deleteTask,
  changeTask
} from "../../../../store/actions/actionLessons";

import Button from "../../../Button";

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
    const { name, text } = this.state.info;
    let list;
    const { page, taskId, deleteTask } = this.props;

    list = page.tasks.map(task => {
      console.log(task);
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
            <TaskElementWrapper key={task._id}>
              <LabelElement> Title: </LabelElement>
              <TitleSpan>{task.info.name}</TitleSpan>
              <LabelElement> Description </LabelElement>
              <TitleSpan
                dangerouslySetInnerHTML={{
                  __html: task.info.description
                }}
              />
              <LabelElement>Question:</LabelElement>
              <TitleSpan>{task.info.question}</TitleSpan>
              <ButtonsWrapper>
                <Button
                  style={"outlined"}
                  onClick={() =>
                    this.getParams(
                      task.info.name,
                      task.info.text,
                      task.info.options,
                      task._id
                    )
                  }
                >
                  Edit
                </Button>
                <Button
                  style={"outlined"}
                  onClick={() => deleteTask(page._id, task._id)}
                >
                  Delete
                </Button>
              </ButtonsWrapper>
            </TaskElementWrapper>
          );
        }
      }
    });

    return <TaskWrapper>{list}</TaskWrapper>;
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
