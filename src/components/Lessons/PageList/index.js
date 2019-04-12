import React, { Component } from "react";

import Page from '../PageList/Page'

class PageList extends Component {


  render() {
  
   const {pages, deletePage, deleteTask} = this.props
    return (
      <>
       <ul><Page pages = {pages} deletePage={deletePage} deleteTask={deleteTask}/></ul>
      </>
    );
  }
}

export default PageList;
