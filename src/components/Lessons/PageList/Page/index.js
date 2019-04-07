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
    const { pages, deletePage, deleteTask } = this.props;
    let token = localStorage.getItem("userId");
    let list;
    console.log()
    if (pages) {
      list = pages.map(page => {
        if (page.tasks) {
          return (
            <li key={page._id}>
              <span> {page.text}</span>
              <TaskConstructor pageId={page._id} />
              <ul>
              <TaskList page={page} deleteTask={deleteTask} />
              </ul>
              <button onClick={() => deletePage(token, page._id)}>
                Delete page
              </button>
              {/* <button onClick={() => this.goTo(page._id)}>To task</button> */}
            </li>
          );
        } else return <Error />;
      });
    }

    return <>{list}</>;
  }
}

export default withRouter(Page);
