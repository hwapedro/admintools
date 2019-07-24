import React, { Component } from "react";
import Select from "react-select";

import { ButtonWrapper, ConsturctorWrapper, DarkGround } from "../style";
import Button from "../../../Button";
import TestConstructor from "./TestConstructor";
import TextConstructor from "./TextConstructor";

const options = [
  { value: "test", label: "Test" },
  { value: "text", label: "Text" },
  { value: "placeholder", label: "Placeholder" }
];
class TaskConstructor extends Component {
  state = {
    displayConstructor: false,
    displayTaskConstructor: { value: "test", label: "Test" },
    taskEditFlag: false
  };

  displayConstructor = () => {
    const displayConstructor = this.state.displayConstructor;
    this.setState({ displayConstructor: !displayConstructor });
  };

  selectChange = displayTaskConstructor => {
    this.setState({
      displayTaskConstructor
    });
  };

  constSwitch = displayTaskConstructor => {
    switch (displayTaskConstructor.value) {
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
        {displayConstructor ? (
          <>
            <DarkGround onClick={this.displayConstructor} />
            <ConsturctorWrapper>
              <Select
                value={displayTaskConstructor}
                options={options}
                maxMenuHeight={100}
                onChange={this.selectChange}
              />

              {this.constSwitch(displayTaskConstructor)}
            </ConsturctorWrapper>
          </>
        ) : (
          <ButtonWrapper>
            <Button buttonStyle={"outlined"} onClick={this.displayConstructor}>
              Add Task
            </Button>
          </ButtonWrapper>
        )}
      </>
    );
  }
}

export default TaskConstructor;
