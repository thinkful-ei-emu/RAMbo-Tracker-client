import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Header from '../Header/Header'
// import PrivateRoute from '../PrivateRoute/PrivateRoute'
// import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute'
import LoginForm from '../../components/Login/LoginForm'
import SymptomRoute from '../Symptom/Symptom'
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute'
import LandingPage from '../../routes/LandingRoute/LandingRoute'


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
              
              <Route /* ROUTE ONLY HERE FOR TESTING TO BYPASS AUTH */
                exact
                path={'/'}
                component={LandingPage}
              />

              <Route /* ROUTE ONLY HERE FOR TESTING TO BYPASS AUTH */
                path={'/symptom'}
                exact
                component={SymptomRoute}
              />

              {/* <PublicOnlyRoute
                path={'/register'}
                component={RegistrationRoute} 
              />*/}


              {/* <PublicOnlyRoute
                path={'/login'}
                component={LoginRoute} 
              />*/}

              <Route /* ROUTE ONLY HERE FOR TESTING TO BYPASS AUTH */
                exact
                path={'/login'}
                component={LoginForm}
              />

              <Route
                component={NotFoundRoute}
              />
          </Switch>
        </main>
      </div>
    );
  }
}
  


export default App;
