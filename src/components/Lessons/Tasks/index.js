import React, { Component } from "react";

import Task from '../TaskList/Task'

class TaskList extends Component {


  render() {

    console.log(this.props.pages)
    return (
      <>
       <Task />
      </>
    );
  }
}

export default TaskList;