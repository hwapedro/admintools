import React, { Component } from "react";
import {withRouter} from 'react-router-dom'

import TaskList from '../../TaskList/'

class Page extends Component {
  
  goTo = (id) => { 
    console.log(this.props)
    this.props.history.push(`/task/${id}`)
  }

  render() {
    let list
    if (this.props.pages) {
      list = this.props.pages.map(page => {
      return (
        <>
        <li key={page._id}>
          <span> {page.text}</span>
          <TaskList id={this.props.id} />
          <button onClick={()=>this.goTo(page._id)}>To task</button>
        </li>
        </>
      );
    });}

    return <>
    {list}
    </>;
  }
}

export default withRouter(Page);
