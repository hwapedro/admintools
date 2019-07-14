import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import Button from "../../../Button";
import TaskList from "../../Task/TaskList";
import TaskConstructor from "../../Task/TaskConstructors/";
// import Error from "../../../Error";

class Page extends Component {
  render() {
    const { lessonId, pages, deletePage, deleteTask, pageNumber } = this.props;
    let list;

    if (pages) {
      list = pages.map((page, index) => {
        if (page.tasks && index === pageNumber) {
          return (
            <div key={page._id}>
              <PageNumber>{page.text}</PageNumber>
              <TaskConstructor pageId={page._id} />

              <TaskList
                lessonId={lessonId}
                page={page}
                deleteTask={deleteTask}
              />
              <ButtonWrapper>
                <Button style={"outlined"} onClick={() => deletePage(page._id)}>
                  Delete page
                </Button>
              </ButtonWrapper>
            </div>
          );
        }
      });
    }

    return <PagesWrapper>{list}</PagesWrapper>;
  }
}

export default withRouter(Page);

const PageNumber = styled.span`
  margin-top: 2rem;
  font-weight: 900;
  font-size: 1.8rem;
`;

const PagesWrapper = styled.ul`
  list-style: none;
  padding: 0;
`;

const ButtonWrapper = styled.div`
  text-align: right;
`;
