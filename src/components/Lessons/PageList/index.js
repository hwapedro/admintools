import React, { Component } from "react";

import Page from "../PageList/Page";
import PageNav from "../PageNav";

class PageList extends Component {

  state = {
    pageNumber: 0
  };

  changePage = number => {
    console.log(number)
    this.setState({ pageNumber: number });
  };

  render() {
    const { pageNumber} = this.state
    const { lessonId, pages, deletePage, deleteTask } = this.props;
    console.log(pageNumber)
    return (
      <>
        <PageNav amount={pages} changePage={this.changePage} />
        <Page
          pageNumber={pageNumber}
          lessonId={lessonId}
          pages={pages}
          deletePage={deletePage}
          deleteTask={deleteTask}
        />
      </>
    );
  }
}

export default PageList;
