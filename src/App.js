import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Pages/Login/Login';
import Home from './Components/Pages/Home/Home';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './Styles/Css/App.css';

const theme = createMuiTheme({
  typography: {
    fontSize: 15,
  },
  palette: {
    primary: {
      main: '#000'
    },
    secondary: {
      main: '#FFF'
    }
  },
  shadows: ["none"]
});

export class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" exact component={Home} />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;