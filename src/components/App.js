import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import CoursesContainer from "../containers/CoursesContainer";
import LessonsContainer from "../containers/LessonsContainer";
import BadgesContainer from "../containers/BadgesContainer";
import TasksContainer from "../containers/TaskContainer";
import LessonContainer from "../containers/LessonContainer";
import NewsContainer from "../containers/NewsContainer";
import OneCourseContainer from "../containers/OneCourseContainer";

import Layout from "./hoc/Layout";
import LoginScreen from "../components/Authorization/LoginScreen";
import RegistrationScreen from "../components/Authorization/RegistrationScreen";

import * as route from "../components/Route/constants";

import "simplemde/dist/simplemde.min.css";
import "./test";

class App extends Component {
  routes = [
    { path: route.courses, Component: CoursesContainer },
    { path: route.lessons, Component: LessonsContainer },
    { path: route.badges, Component: BadgesContainer },
    { path: route.news, Component: NewsContainer }
  ];

  render() {
    return (
      <Switch>
        <Route path="/" exact component={LoginScreen} />
        <Route path={route.register} exact component={RegistrationScreen} />
        <Wrapper>
          <Layout className="container">
            {this.routes.map(({ path, Component }) => (
              <Route key={path} exact path={path} component={Component} />
            ))}
            <Route
              path={route.lesson}
              render={({ match }) => {
                const { id } = match.params;
                return <LessonContainer itemId={id} />;
              }}
            />
            <Route
              path={route.course}
              render={({ match }) => {
                const { id } = match.params;
                return <OneCourseContainer itemId={id} />;
              }}
            />
            <Route
              path={route.task}
              render={({ match, history }) => {
                const { lessonId, pageId, taskId } = match.params;
                return (
                  <TasksContainer
                    lessonId={lessonId}
                    pageId={pageId}
                    taskId={taskId}
                    history={history}
                  />
                );
              }}
            />
          </Layout>
        </Wrapper>
        {/* <Layout 
                <Route path={route.courses} component={Courses} />
                <Route path={route.lessons} component={Lessons} />
                <Route path={route.badges} component={Badges} />

               
              </Layout> */}
      </Switch>
    );
  }
}

const Wrapper = styled.div`
  .container {
    position: relative;
  }

  .page {
    position: absolute;
    left: 15px;
    right: 15px;
  }

  .page-enter {
    opacity: 0;
    transform: scale(1.1);
  }

  .page-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 300ms, transform 300ms;
  }

  .page-exit {
    opacity: 1;
    transform: scale(1);
  }

  .page-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }
`;

export default App;
