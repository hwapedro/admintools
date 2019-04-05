import React, { Component } from "react";
import { connect } from "react-redux";

import { deleteTask } from "../../../store/actions";

import Tasks from "./TaskComponents/Task";
import TestConstructor from "./TaskConstructors/TestConstructor";

// import { throws } from "assert";

class TaskList extends Component {
  state = {
    displayConstructor: false,
    displayTestConstructor: true,
    taskEditFlag: false,
  };

  displayConstructor = () => {
    const displayConstructor = this.state.displayConstructor;
    this.setState({ displayConstructor: !displayConstructor });
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

  titleChange = event => {
    this.setState({ title: event.target.value });
    //  console.log(this.state.title)
  };

  getParams = (name, description, question, id) => {
   // console.log("we working boys");
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
          <span>Lesson X</span>
          {displayConstructor ? (
            <div>
              <div>
                <button onClick={this.displayConstructor}>Cancel</button>
              </div>
              {/* <input placeholder="Title" onChange={this.titleChange} /> */}
              <select onChange={this.selectChange} defaultValue="test">
                <option value="test">Test</option>
                <option value="none">Placeholder</option>
              </select>
              {displayTestConstructor ? (
                <>
                  <TestConstructor oldInfo={this.state.info} edited={false} />
                </>
              ) : (
                <div />
              )}
            </div>
          ) : (
            <div>
              <button onClick={this.displayConstructor}>Add Task</button>
            </div>
          )}
        </div>
        <div><Tasks id={this.props.id}/></div>
        {/* <button onClick={()=>this.goTo(page._id)}>To task</button> */}
      </>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  deleteTask: id => dispatch(deleteTask(id)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
