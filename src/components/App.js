import React, { Component } from "react";
import { Route , Switch} from "react-router-dom";

import Courses from "../components/Courses";
import Lessons from "../components/Lessons";
import Badges from "../components/Badges";
import * as route from '../components/Route/constants'

import LoginScreen from "../components/LoginScreen";

class App extends Component {
  render() {
    return (
      <>
    
        <Switch>
          <Route path="/" exact component = {LoginScreen} /> 
          <Route path={route.courses} component= { Courses } />
          <Route path={route.lessons} component= { Lessons } />
          <Route path={route.badges} component = {Badges} /> 
          {/* <Route path="/achievements" component={Achievements} /> */}
        </Switch>
        
      </>
    );
  }
}

export default App;
