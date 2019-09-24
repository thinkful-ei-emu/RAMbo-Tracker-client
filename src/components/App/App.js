import React, { Component } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import TokenService from '../../services/token-service';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute';
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute';
import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute';
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute';
import MealRoute from '../../routes/MealRoute/MealRoute';

class App extends Component {
  state = {
    hasError: false,
    username: '',
    processLogin: (username) => {
      this.setState({
        username
      });
    },
    processLogout: () => {
      TokenService.clearAuthToken();
      this.setState({ username: '' });
    }
  };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    return (
      <div className="App">
        <Header refreshesWhenAppStateDoes={this.state} />
        <main>
          {this.state.hasError && <p>There was an error! Rut Roh!</p>}
          <Switch>
            <PrivateRoute exact path={'/dash'} component={DashboardRoute} />
            <PublicOnlyRoute
              exact
              path={['/register', '/']}
              component={RegistrationRoute}
            />
            <PublicOnlyRoute
              processLogin={this.state.processLogin}
              path={"/login"}
              component={LoginRoute}
            />
            <PrivateRoute path={'/meal'} component={MealRoute} />
            {<Route component={NotFoundRoute} />}
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
