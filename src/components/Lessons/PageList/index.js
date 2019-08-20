import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import PageNav from "../PageNav";
import Button from "../../Shared/Button";
import TaskList from "../Task/TaskList";
import TaskConstructorContainer from "../../Containers/TaskConstructorContainer";

import {
  PageNumber,
  ButtonWrapper,
  PageHeader,
  ElementWrapper,
  PageMenu
} from "./styleLocal";

class PageList extends Component {
  state = {
    pageNumber: 0
  };

  changePage = number => {
    this.setState({ pageNumber: number });
  };

  render() {
    const { pageNumber } = this.state;
    const { lessonId, pages, deletePage, deleteTask } = this.props;

    let list;
    if (pages) {
      list = pages.map((page, index) => {
        if (page.tasks && index === pageNumber) {
          return (
            <div key={page._id}>
              <PageHeader>
                <PageNumber>Page {index + 1}</PageNumber>
                <ButtonWrapper>
                  <TaskConstructorContainer pageId={page._id} />
                  <ButtonWrapper>
                    <Button
                      buttonStyle={"outlined"}
                      onClick={() => deletePage(page._id)}
                    >
                      Delete page
                    </Button>
                  </ButtonWrapper>
                </ButtonWrapper>
              </PageHeader>
              <TaskList
                lessonId={lessonId}
                page={page}
                deleteTask={deleteTask}
              />
            </div>
          );
        }
      });
    }

    return (
      <>
        <PageMenu>
          <PageNav amount={pages} changePage={this.changePage} pageNumber={pageNumber}/>
        </PageMenu>
        <ElementWrapper>{list}</ElementWrapper>
      </>
    );
  }
}

PageList.defaultProps = {
  pages: [],
  lessonId: null,

  deletePage() {},
  deleteTask() {}
};

PageList.propTypes = {
  pages: PropTypes.array,
  lessonId: PropTypes.string.isRequired,

  deletePage: PropTypes.func,
  deleteTask: PropTypes.func
};

export default withRouter(PageList);
