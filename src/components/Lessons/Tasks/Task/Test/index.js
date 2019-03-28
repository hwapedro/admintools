import React, { Component } from "react";
import { connect } from "react-redux";

import {
  // addOption,
  // deleteOption,
  // setAnswerOption,
  // setRightOption,
  addTestTask
} from "../../../../../store/actions";

let index = 100;
class Test extends Component {
  state = {
    name: "",
    description: "",
    question: "",
    options: []
  };

  addOption = () => {
    const answer = "";
    const right = false;
    index++;
    this.setState({
      options: [...this.state.options, { answer, right, index }]
    });
  };

  deleteOption = index => {
    let newOptions = this.state.options.filter(
      option => option.index !== index
    );
    this.setState({ options: newOptions });
  };

  answerChange = (id, event) => {
    let newOptions = this.state.options.map(option =>
      id === option.index
        ? {
            answer: event.target.value,
            right: option.right,
            index: option.index
          }
        : option
    );
    this.setState({ options: newOptions });
  };

  setRight = (id, event) => {
    let newOptions = this.state.options.map(option =>
      id === option.index
        ? {
            answer: option.answer,
            right: event.target.checked,
            index: option.index
          }
        : option
    );
    this.setState({ options: newOptions });
  };

  infoChange = event => {
    // console.log(event.target.name);
    this.setState({ [event.target.name]: event.target.value });
  };

  // addOption = () => {
  //   this.props.addOption();
  // };

  // deleteOption = index => {
  //   this.props.deleteOption(index);
  // };

  // answerChange = (index, event) => {
  //   this.props.setAnswerOption(event.target.value, index);
  // };

  // setRight = (index, event) => {
  //   this.props.setRightOption(event.target.checked, index);
  // };

  addTestTask = () => {
    const { name, description, question } = this.state;
    this.props.addTestTask(
      name,
      description,
      question,
      this.state.options
    );
  };

  setParams = event => {
    event.preventDefault();
  };

  render() {
    return (
      <>
        <div>
          <div>
            <input name="name" placeholder="Name" onChange={this.infoChange} />
          </div>
          <div>
            <input
              name="description"
              placeholder="Description"
              onChange={this.infoChange}
            />
          </div>
          <div>
            <input
              name="question"
              placeholder="Question"
              onChange={this.infoChange}
            />
          </div>
          <div>
            <button onClick={this.addOption}>Add answer option</button>
          </div>

          <form onSubmit={this.setParams}>
            <div>
              {this.state.options.map(el => {
                return (
                  <div className="form-check" key={el.index}>
                    <li>
                      <input
                        name="answer"
                        placeholder="Answer"
                        //value={el.answer}
                        onChange={e => this.answerChange(el.index, e)}
                      />
                      <input
                        type="checkbox"
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
          <button onClick={this.addTestTask}>Save</button>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks
});

const mapDispatchToProps = dispatch => ({
  // addOption: () => dispatch(addOption()),
  // deleteOption: id => dispatch(deleteOption(id)),
  // setAnswerOption: (answer, index) => dispatch(setAnswerOption(answer, index)),
  // setRightOption: (right, index) => dispatch(setRightOption(right, index)),
  addTestTask: (name, description, question, options) =>
    dispatch(addTestTask(name, description, question, options))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
