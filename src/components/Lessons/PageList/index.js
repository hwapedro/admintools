import React, { Component } from "react";
import styled from "styled-components";

import Page from "../PageList/Page";
import PageNav from "../PageNav";

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

const ElementWrapper = styled.div`
  background-color: ${props => props.theme.courses};
  width: 960px;
  margin-top: 2rem;
  padding: 1rem;
  box-shadow: 0px 2px 4px rgb(0, 0, 0, 0.3);
`

const PageMenu = styled.div`
  margin-top:32px;
`