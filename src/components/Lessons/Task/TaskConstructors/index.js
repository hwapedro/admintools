import React, { Component } from "react";
import styled from "styled-components";

import TestConstructor from "./TestConstructor";
import TextConstructor from "./TextConstructor";

class TaskConstructor extends Component {
  state = {
    displayConstructor: false,
    displayTaskConstructor: "test",
    taskEditFlag: false
  };

  displayConstructor = () => {
    const displayConstructor = this.state.displayConstructor;
    this.setState({ displayConstructor: !displayConstructor });
  };

  selectChange = event => {
    this.setState({
      taskType: event.target.value,
      displayTaskConstructor: event.target.value
    });
  };

  constSwitch = displayTaskConstructor => {
    switch (displayTaskConstructor) {
      case "test":
        return (
          <TestConstructor
            oldInfo={this.state.info}
            edited={false}
            pageId={this.props.pageId}
          />
        );
      case "text":
        return <TextConstructor pageId={this.props.pageId} />;
      default:
        return <div />;
    }
  };

  getParams = (name, description, question, id) => {
    this.setState({
      taskEditFlag: true,
      info: { name, description, question, id }
    });
  };

  render() {
    const { displayConstructor, displayTaskConstructor } = this.state;
    return (
      <>
        <div>
          {displayConstructor ? (
            <div>
              <div>
                <TaskButton onClick={this.displayConstructor}>
                  Cancel
                </TaskButton>
              </div>
              <Select onChange={this.selectChange} defaultValue="test">
                <option value="test">Test</option>
                <option value="text">Text</option>
                <option value="none">Placeholder</option>
              </Select>
              {this.constSwitch(displayTaskConstructor)}
            </div>
          ) : (
            <ButtonWrapper>
              <TaskButton onClick={this.displayConstructor}>
                Add Task
              </TaskButton>
            </ButtonWrapper>
          )}
        </div>
      </>
    );
  }
}

export default TaskConstructor;

const TaskButton = styled.button`
  width: 120px;
  height: 30px;
  border: 0;
  border-radius: 10px;
  background-color: ${props => props.theme.button};
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
    cursor: pointer;
  }
  margin-right: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-top: 0.5rem;
`;

const Select = styled.select`
  border: 1px solid #ddd;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5rem ;
  font-size: 1rem;
  color: black;
  padding-left: 0.7em;
`;
