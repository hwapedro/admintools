import React, { Component } from "react";

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

 constSwitch = (displayTaskConstructor) =>{
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
  }

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
                <button onClick={this.displayConstructor}>Cancel</button>
              </div>
              <select onChange={this.selectChange} defaultValue="test">
                <option value="test">Test</option>
                <option value="text">Text</option>
                <option value="none">Placeholder</option>
              </select>
              {/* {(displayTaskConstructor) => {
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
                    return <InputQConstructor pageId={this.props.pageId} />;
                  default:
                    return <div />;
                }
              }} */}{this.constSwitch(displayTaskConstructor)}
            </div>
          ) : (
            <div>
              <button onClick={this.displayConstructor}>Add Task</button>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default TaskConstructor;
