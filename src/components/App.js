import React, { Component } from "react";
import { Route , Switch} from "react-router-dom";

import Courses from "../components/Courses";

import LoginScreen from "../components/LoginScreen";
import GlobalStyles from './GlobalStyles'

class App extends Component {
  render() {
    return (
      <>
    
        <Switch>
          <Route path="/" exact component = {LoginScreen} /> 
          <Route path="/lessons">
            <div>lol</div>
          </Route>
          <Route path="/courses" component= { Courses } />
          {/* <Route path="/achievements" component={Achievements} /> */}
        </Switch>
        
      </>
    );
  }
}

export default App;
