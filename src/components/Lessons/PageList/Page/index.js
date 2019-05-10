import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import TaskList from "../../Task/TaskList";
import TaskConstructor from "../../Task/TaskConstructors/";
import Error from "../../../Error";

class Page extends Component {
  // goTo = id => {
  //   console.log(this.props);
  //   this.props.history.push(`/task/${id}`);
  // };
 
  render() {
    const { lessonId, pages, deletePage, deleteTask,pageNumber } = this.props;
    let token = localStorage.getItem("userId");
    let list;

    if (pages) {
      list = pages.map((page,index) => {
        if (page.tasks && index === pageNumber) {
          return (
            <li key={page._id}>
              <span> {page.text}</span>
              <TaskConstructor pageId={page._id} />
  
              <TaskList lessonId={lessonId} page={page} deleteTask={deleteTask} />
          
              <button onClick={() => deletePage( page._id)}>
                Delete page
              </button>
              {/* <button onClick={() => this.goTo(page._id)}>To task</button> */}
            </li>
          );
        }
      });
    }

    return <ul>{list}</ul>;
  }
}

export default withRouter(Page);
