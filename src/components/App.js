import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import CoursesContainer from "../components/Containers/CoursesContainer";
import Lessons from "../components/Lessons";
// import Test from "../components/Lessons/Task/TaskComponents/Tests"
import Tasks from "../components/Lessons/Task/TaskComponents";
import Lesson from "../components/Lessons/Lesson";
import Badges from "../components/Badges";
import News from "../components/News";
import Layout from "./hoc/Layout";
import LoginScreen from "../components/Authorization/LoginScreen";
import RegistrationScreen from "../components/Authorization/RegistrationScreen";
import OneCourseContainer from "../components/Containers/OneCourseContainer";
// import OneCourse from "../components/OneCourse";

import * as route from "../components/Route/constants";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class App extends Component {
  routes = [
    { path: route.courses, Component: CoursesContainer },
    { path: route.lessons, Component: Lessons },
    { path: route.badges, Component: Badges },
    { path: route.news, Component: News }
  ];

  render() {
    return (
      <Switch>
        <Route path="/" exact component={LoginScreen} />
        <Route path={route.register} exact component={RegistrationScreen} />
        <Wrapper>
          <Layout className="container">
            {this.routes.map(({ path, Component }) => (
              // <Route key={path} exact path={path}>
              //   {({ match }) => (
              //     <CSSTransition
              //       in={match != null}
              //       timeout={300}
              //       classNames="page"
              //       unmountOnExit
              //     >
              //       <div className="page">
              //         <Component />
              //       </div>
              //     </CSSTransition>
              //   )}
              // </Route>
              <Route key={path} exact path={path} component={Component} />
            ))}
            <Route
              path={route.lesson}
              render={({ match }) => {
                const { id } = match.params;
                return <Lesson itemId={id} />;
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
                const { lessonId, taskId } = match.params;
                return (
                  <Tasks
                    lessonId={lessonId}
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
