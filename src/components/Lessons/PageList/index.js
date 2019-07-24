import React, { Component } from "react";

import Page from "../PageList/Page";
import PageNav from "../PageNav";

import { ElementWrapper,  PageMenu} from "./style"

class PageList extends Component {

  state = {
    pageNumber: 0
  };

  changePage = number => {
    this.setState({ pageNumber: number });
  };

  render() {
    const { pageNumber} = this.state
    const { lessonId, pages, deletePage, deleteTask } = this.props;
    return (
      <>
      <PageMenu>
        <PageNav amount={pages} changePage={this.changePage} />
      </PageMenu>
      <ElementWrapper>
        <Page
          pageNumber={pageNumber}
          lessonId={lessonId}
          pages={pages}
          deletePage={deletePage}
          deleteTask={deleteTask}
        />
      </ElementWrapper>
      </>
    );
  }
}

export default PageList;

