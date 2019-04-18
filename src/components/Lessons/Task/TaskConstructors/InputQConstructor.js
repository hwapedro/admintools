import React, { Component } from "react";
import { connect } from "react-redux";

import { addTask } from "../../../../store/actions/actionLessons";

let index = 100;
class QConstructor extends Component {
  state = {
    name: "",
    options: []
  };

  infoChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addAnswer = () => {
    const answer = "";
    index++;
    this.setState({
      options: [...this.state.options, { answer, index }]
    });
  };

  answerChange = (id, event) => {
    let newOptions = this.state.options.map(option =>
      id === option.index
        ? {
            answer: event.target.value,
            index: option.index
          }
        : option
    );
    this.setState({ options: newOptions });
  };

  addQTask = token => {
    const info = this.state;
    const { pageId } = this.props;
    const type = "test";
    this.props.addTask(token, pageId, type, info);
  };

  setParams = event => {
    event.preventDefault();
  };

  render() {
    let token = localStorage.getItem("userId");
    return (
      <>
        <div>
          <div>
            <input
              name="name"
              placeholder="Question"
              onChange={this.infoChange}
            />
          </div>
          <div>
            <button onClick={this.addAnswer}>Add answer option</button>
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
                        onChange={e => this.answerChange(el.index, e)}
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
          <button onClick={() => this.addQTask(token)}>Save</button>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addTask: (token, pageid, type, info, answer) =>
    dispatch(addTask(token, pageid, type, info, answer))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QConstructor);
