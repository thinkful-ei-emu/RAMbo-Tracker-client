import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import TokenService from "../../services/token-service";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import PublicOnlyRoute from "../PublicOnlyRoute/PublicOnlyRoute";
import RegistrationRoute from "../../routes/RegistrationRoute/RegistrationRoute";
import LoginRoute from "../../routes/LoginRoute/LoginRoute";
import DashboardRoute from "../../routes/DashboardRoute/DashboardRoute";
import NotFoundRoute from "../../routes/NotFoundRoute/NotFoundRoute";
import MealRoute from "../../routes/MealRoute/MealRoute";
import AboutRoute from "../../routes/AboutRoute/AboutRoute";
import Footer from "../Footer/Footer";
import IdleService from "../../services/idle-service";
import AuthService from "../../services/auth-service";

class App extends Component {
  state = {
    hasError: false,
    error: "",
    username: "",
    processLogin: username => {
      this.setState({
        username
      });
      IdleService.registerIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        this.fetchRefreshToken();
      });
    },
    processLogout: () => {
      TokenService.clearAuthToken();
      TokenService.clearCallbackBeforeExpiry();
      IdleService.unRegisterIdleResets();
      this.setState({ username: "" });
    }
  };

  fetchRefreshToken = () => {
    AuthService.refreshToken()
      .then(res => {
        TokenService.saveAuthToken(res.authToken);
        TokenService.queueCallbackBeforeExpiry(() => {
          this.fetchRefreshToken();
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };
  componentDidMount() {
    IdleService.setIdleCallback(this.logoutFromIdle);
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        AuthService.refreshToken();
      });
    }
  }
  componentWillUnmount() {
    IdleService.unRegisterIdleResets();
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.forceUpdate();
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
          {this.state.hasError && (
            <p className="error">There was an error! Rut Roh!</p>
          )}
          <Switch>
            <PrivateRoute exact path={"/dash"} component={DashboardRoute} />
            <PublicOnlyRoute
              exact
              path={["/register", "/"]}
              component={RegistrationRoute}
            />
            <PublicOnlyRoute
              processLogin={this.state.processLogin}
              path={"/login"}
              component={LoginRoute}
            />
            <PrivateRoute path={"/meal"} component={MealRoute} />
            <Route exact path={"/about"} component={AboutRoute} />

            {<Route component={NotFoundRoute} />}
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
