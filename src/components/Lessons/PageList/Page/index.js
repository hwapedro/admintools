import React, { Component } from "react";

import TaskList from '../../TaskList'

class Page extends Component {
  
  render() {
    console.log(this.props)
    let list
    if (this.props.pages) {
      list = this.props.pages.map(page => {
      return (
        <>
        <li key={page._id}>
          <span> {page.text}</span>
        </li>
        </>
      );
    });}

    return <>
    {list}
    <TaskList />
    </>;
  }
}

export default Page;
