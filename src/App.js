import React, { Component } from 'react';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateUserComponent  from './Components/Users/CreateUserComponent';
import ListUserComponent from './Components/Users/ListUserComponent';
import ViewUserComponent  from './Components/Users/ViewUserComponent';


class App extends Component {
  render() {
    return (
      <div>
        <Router>
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListUserComponent}></Route>
                          <Route path = "/users" component = {ListUserComponent}></Route>
                          <Route path = "/add-user/:id" component = {CreateUserComponent}></Route>
                          <Route path = "/view-user/:id" component = {ViewUserComponent}></Route>
                    </Switch>
                </div>
        </Router>
    </div>
    );
  }                      
}

export default App;
