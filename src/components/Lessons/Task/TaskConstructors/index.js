import React, { Component } from "react";

import TestConstructor from "./TestConstructor";
import InputQConstructor from "./InputQConstructor";

class TaskConstructor extends Component {
  state = {
    displayConstructor: false,
    displayTestConstructor: true,
    taskEditFlag: false
  };

  displayConstructor = () => {
    const displayConstructor = this.state.displayConstructor;
    this.setState({ displayConstructor: !displayConstructor });
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
  };

  titleChange = event => {
    this.setState({ title: event.target.value });

  };

  getParams = (name, description, question, id) => {

    this.setState({
      taskEditFlag: true,
      info: { name, description, question, id }
    });
  };

  render() {
    const { displayConstructor, displayTestConstructor } = this.state;
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
                <option value="none">Placeholder</option>
              </select>
              {displayTestConstructor ? (
                <>
                  {/* <TestConstructor
                    oldInfo={this.state.info}
                    edited={false}
                    pageId={this.props.pageId}
                  /> */}
                  <InputQConstructor pageId={this.props.pageId} />
                </>
              ) : (
                <div />
              )}
              {
                
              }
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
