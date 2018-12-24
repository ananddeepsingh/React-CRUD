import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from './components/common/privateRoute';
import NoMatch from './components/notFoundPage';

import signup from "./components/signup";
import login from "./components/login";
import studentList from "./components/studentList";

class App extends Component {
  
  render() {
    return (
      <div className="loginPage">
        <Router>
          <div>
          <Switch>
            <Route path="/" exact component={login}></Route>
            <Route path="/signup" exact component={signup}></Route>
            <PrivateRoute path="/student" exact component={studentList}></PrivateRoute>
            <Route component={NoMatch} />
          </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
