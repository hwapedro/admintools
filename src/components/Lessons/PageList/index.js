import React, { Component } from "react";

import Page from '../PageList/Page'

class PageList extends Component {


  render() {
  
   const {lessonId, pages, deletePage, deleteTask} = this.props
    return (
      <>
       <ul><Page lessonId={lessonId} pages = {pages} deletePage={deletePage} deleteTask={deleteTask}/></ul>
      </>
    );
  }
}

export default PageList;
