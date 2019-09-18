import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Header from '../Header/Header'
import TokenService from '../../services/token-service'
// import PrivateRoute from '../PrivateRoute/PrivateRoute'
// import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute'
// import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute'
// import LoginRoute from '../../routes/LoginRoute/LoginRoute'
// import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute'
import MealRoute from '../../routes/MealRoute/MealRoute';


class App extends Component {
  state = { 
    hasError: false,
    username:'',
    processLogin : (authToken,username) => {
      TokenService.saveAuthToken(authToken)
      this.setState({
        authToken,
        username
      })
    },
    processLogout : () => {
      TokenService.clearAuthToken()
      this.setState({username:''})
    }
  }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render(){
    return (
      <div className="App">
          <Header />
        <main>
          {this.state.hasError && (
            <p>There was an error! Rut Roh!</p>
          )}
          <MealRoute/>
          {/* <Switch>
          <PrivateRoute
                exact
                path={'/dash'}
              component = {DashboardRoute}
              />
              <PrivateRoute
                path={'/meal'}
                // component={MealRoute}
              />
              <PrivateRoute
                path={'/symptom'}
                // component={SymptomRoute}
              />
              <PublicOnlyRoute
                path={'/register'}
                component={RegistrationRoute}
              />
              <PublicOnlyRoute
                path={'/login'}
                component={LoginRoute}
              />
              <Route
                // component={NotFoundRoute}
              />
          </Switch> */}
        </main>
      </div>
    );
  }
}
  


export default App;
