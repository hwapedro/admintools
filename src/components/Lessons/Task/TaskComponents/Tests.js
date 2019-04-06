import React, { Component } from "react";
import { connect } from "react-redux";

//import { deleteTask, changeTestTask } from "../../../../store/actions";

import checkMark from "../../../../img/good.png";
import redCross from "../../../../img/bad.png";

// import { throws } from "assert";
let index = 150;
class Tests extends Component {
  state = {
    taskType: null,
    taskEditFlag: false,
    info: {}
  };

  addOption = () => {
    //console.log(this.state.info.options);
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
    // console.log(event.target.name);
    this.setState({
      info: {
        ...this.state.info,
        [event.target.name]: event.target.value
      }
    });
  };

  deleteTask = id => {
    this.props.deleteTask(id);
  };

  selectChange = event => {
    if (event.target.value === "test") {
      this.setState({
        taskType: event.target.value,
        displayTestConstructor: true
      });
    } else {
      this.setState({ displayTestConstructor: false });
    }
    // console.log(event.target.value)
  };

  getParams = (name, description, question, options, id) => {
    this.setState({
      taskEditFlag: true,
      info: { name, description, question, options, id }
    });
  };

  setParams = (id, e) => {
    e.preventDefault();
    const { name, description, question, options } = this.state.info;
    const { changeTestTask } = this.props;
    changeTestTask(name, description, question, options, id);
    this.setState({ taskEditFlag: false, info: {} });
  };

  
  goBack = (id) => { 
    this.props.history.push(`/lesson/${id}`)
  }

  render() {
    const { name, description, question, options } = this.state.info;
    let list = this.props.tasks.map(task => {
      if (this.state.taskEditFlag && task.id === this.state.info.id) {
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
                          <button onClick={() => this.deleteOption(el.index)}>
                            Delete option
                          </button>
                        </li>
                      </div>
                    );
                  })}
                </div>
              </form>
              <button onClick={e => this.setParams(task.id, e)}>Confirm</button>
            </div>
          </>
        );
      } else {
        return (
          <ul>
            <li key={task.id}>
              {task.name}
              <br />
              {task.description}
              <br />
              {task.question}
              <ul>
                {task.options.map(answ => {
                  return (
                    <li key={answ.index}>
                      {answ.answer}
                      {answ.right ? (
                        <img width="15px" height="15px" margin-left="5px" src={checkMark} />
                      ) : (
                        <img width="15px" height="15px" margin-left="5px" src={redCross} />
                      )}
                    </li>
                  );
                })}
              </ul>
              <button
                onClick={() =>
                  this.getParams(
                    task.name,
                    task.description,
                    task.question,
                    task.options,
                    task.id
                  )
                }
              >
                Edit
              </button>
              <button onClick={() => this.deleteTask(task.id)}>Delete</button>
              <button onClick={() => this.goBack(this.state.lesson._id)}>Back</button>
            </li>
            }
          </ul>
        );
      }
    });
    return <>{list}</>;
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks,
  lesson: state.lesson
});

const mapDispatchToProps = dispatch => ({
  // deleteTask: id => dispatch(deleteTask(id)),
  // changeTestTask: (name, description, question, options, id) =>
  //   dispatch(changeTestTask(name, description, question, options, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tests);
