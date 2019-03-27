import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Page from "../components/Page";
import Courses from "../components/Courses";
import Lessons from "../components/Lessons";
import Lesson from "../components/Lessons/Lesson";
import Badges from "../components/Badges";
import * as route from "../components/Route/constants";

import LoginScreen from "../components/LoginScreen";

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route path="/" exact component={LoginScreen} />
          <Route path={route.courses} component={Courses} />
          <Route path={route.lessons} component={Lessons} />
          <Route path={route.badges} component={Badges} />
          <Route
            path={route.lesson}
            render={({match}) => {
              const {id} = match.params
              return <Lesson itemId = {id}/>;
            }}
          />
        </Switch>
      </>
    );
  }
}

export default App;
