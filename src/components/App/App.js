import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Header from '../Header/Header'
// import PrivateRoute from '../PrivateRoute/PrivateRoute'
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute'
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute'
import LoginRoute from '../../routes/LoginRoute/LoginRoute'
// import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute'
import SymptomRoute from '../Symptom/Symptom'
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute'


class App extends Component {
  state = { hasError: false }

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
          <Switch>
          {/* <PrivateRoute
                exact
                path={'/dash'}
              component = {DashboardRoute} */}
              {/* />
              <PrivateRoute
                path={'/meal'}
                component={MealRoute}
              /> */}
              <Route /* ROUTE ONLY HERE FOR TESTING TO BYPASS AUTH */
                path={'/symptom'}
                 component={SymptomRoute}
              />
              <PublicOnlyRoute
                path={'/login'}
                component={LoginRoute}
              />
              {/* <Route
                // component={NotFoundRoute}
              /> */}
          </Switch> 
        </main>
      </div>
    );
  }
}
  


export default App;
