import React, { Component } from "react";
import { connect } from "react-redux";

import {
  TaskTitleInput,
  QuestionInput,
  OptionButton,
  DeleteOptionButton,
  OptionButtonWrapper,
  TaskOptionWrapper,
  TaskButton
} from "../../style";
import { addTask } from "../../../../store/actions/actionLessons";

let index = 100;
class TestConstructor extends Component {
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
    this.setState({ [event.target.name]: event.target.value });
  };

  addTestTask = token => {
    const info = this.state;
    const { pageId } = this.props;
    const type = "test";
    this.props.addTask(pageId, type, info);
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
            <TaskTitleInput
              name="name"
              placeholder="Name"
              onChange={this.infoChange}
            />
          </div>
          <div>
            <TaskTitleInput
              name="description"
              placeholder="Description"
              onChange={this.infoChange}
            />
          </div>
          <div>
            <QuestionInput
              name="question"
              placeholder="Question"
              onChange={this.infoChange}
            />
          </div>
          <OptionButtonWrapper>
            <OptionButton onClick={this.addOption}>
              Add answer option
            </OptionButton>
          </OptionButtonWrapper>

          <form onSubmit={this.setParams}>
            <div>
              {this.state.options.map(el => {
                return (
                  <div className="form-check" key={el.index}>
                    <TaskOptionWrapper>
                      <TaskTitleInput
                        name="answer"
                        placeholder="Answer"
                        onChange={e => this.answerChange(el.index, e)}
                      />
                      <TaskTitleInput
                        type="checkbox"
                        onChange={e => this.setRight(el.index, e)}
                      />
                      <DeleteOptionButton
                        onClick={() => this.deleteOption(el.index)}
                      >
                        Delete option
                      </DeleteOptionButton>
                    </TaskOptionWrapper>
                  </div>
                );
              })}
            </div>
          </form>
          <TaskButton onClick={() => this.addTestTask(token)}>Save</TaskButton>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addTask: (pageid, type, info, answer) =>
    dispatch(addTask(pageid, type, info, answer))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestConstructor);
