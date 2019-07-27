import React, { Component } from "react";
import { withRouter } from "react-router-dom";


import Button from "../../../Shared/Button";
import TaskList from "../../Task/TaskList";
import TaskConstructor from "../../Task/TaskConstructors/";
import { PageNumber, PagesWrapper, ButtonWrapper} from "../styleLocal"
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
                <Button
                  buttonStyle={"outlined"}
                  onClick={() => deletePage(page._id)}
                >
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


