import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Pages/Login/Login';
import Home from './Components/Pages/Home/Home';

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;