import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'

import PageNav from '../PageNav'
import Button from '../../Shared/Button'
import TaskListContainer from '../../../containers/TaskContainer/TaskListContainer'
import TaskConstructorContainer from '../../../containers/TaskContainer/TaskConstructorContainer'
import { SmartConstructor } from '../../Shared/SmartConstructor'

import { PageTitle, PageDescription, LabelElement, ButtonWrapper, PageHeader, ElementWrapper, PageMenu } from './styleLocal'

class PageList extends Component {
  state = {
    pageNumber: 0,
    changeFlag: false,
    title: null,
    description: null,
    pageId: null,
    tasksOnPage: 1,
  }

  showConstructor = () => {
    const { changeFlag } = this.state
    this.setState({
      changeFlag: !changeFlag,
    })
  }

  //TEXT HANDLER
  onChange = (event) => {
    const { title, description } = this.state
    const { activeLanguage } = this.props
    switch (event.target.name) {
      case 'title':
        this.setState({
          [event.target.name]: {
            ...title,
            [activeLanguage.value]: event.target.value,
          },
        })
        break
      case 'description':
        this.setState({
          [event.target.name]: {
            ...description,
            [activeLanguage.value]: event.target.value,
          },
        })
        break
      default:
        this.setState({ [event.target.name]: event.target.value })
    }
  }

  getParams = (pageId, title, description, tasksOnPage) => {
    this.setState({
      changeFlag: true,
      pageId: pageId,
      title: title,
      description: description,
      tasksOnPage: tasksOnPage,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { title, description, tasksOnPage, pageId } = this.state
    const { changePage } = this.props
    changePage(pageId, title, description, tasksOnPage)
    this.setState({ changeFlag: false })
  }

  changeNumberPage = (number) => {
    this.setState({ pageNumber: number })
  }

  render() {
    const { pageNumber, changeFlag, title, description, tasksOnPage } = this.state
    const { lessonId, pages, deletePage, activeLanguage, handleLangChange } = this.props
    let list
    if (pages) {
      list = pages.map((page, index) => {
        if (page.tasks && index === pageNumber) {
          return (
            <div key={page._id}>
              {changeFlag && (
                <>
                  <SmartConstructor
                    showConstructor={this.showConstructor}
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                    modal={true}
                    activeLanguage={activeLanguage}
                    select={{
                      handleLangChange: handleLangChange,
                    }}
                    tasksOnPage={{
                      value: tasksOnPage,
                      type: 'number',
                    }}
                    title={title[activeLanguage.value]}
                    description={description[activeLanguage.value]}
                  />
                </>
              )}
              <PageHeader>
                <PageTitle>{page.title[activeLanguage.value]}</PageTitle>
                <PageNav pages={pages} changePage={this.changeNumberPage} pageNumber={pageNumber} activeLanguage={activeLanguage} />
                <ButtonWrapper>
                  <TaskConstructorContainer pageId={page._id} />
                  <ButtonWrapper>
                    <Button startIcon={<CreateIcon />} buttonStyle={'outlined'} onClick={() => this.getParams(page._id, page.title, page.description, page.tasksOnPage)}>
                      Change
                    </Button>
                  </ButtonWrapper>
                  <ButtonWrapper>
                    <Button startIcon={<DeleteIcon />} buttonColor="secondary" buttonStyle={'outlined'} onClick={() => deletePage(page._id)}>
                      Delete
                    </Button>
                  </ButtonWrapper>
                </ButtonWrapper>
              </PageHeader>
              <PageDescription>
                <LabelElement>description</LabelElement> {page.description[activeLanguage.value]}
              </PageDescription>
              <TaskListContainer lessonId={lessonId} page={page} activeLanguage={activeLanguage} />
            </div>
          )
        }
        return null
      })
    }

    return (
      <>
        <PageMenu></PageMenu>
        <ElementWrapper>{list}</ElementWrapper>
      </>
    )
  }
}

PageList.defaultProps = {
  pages: [],
  lessonId: null,

  deletePage() {},
  deleteTask() {},
  setTask() {},
}

PageList.propTypes = {
  pages: PropTypes.array,
  lessonId: PropTypes.string.isRequired,

  deletePage: PropTypes.func,
  deleteTask: PropTypes.func,
  setTask: PropTypes.func,
}

export default withRouter(PageList)
