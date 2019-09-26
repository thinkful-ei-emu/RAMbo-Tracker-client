import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import {Link} from 'react-router-dom';
import './LoginRoute.css'


class LoginRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handleLoginSuccess = (username) => {
    const { history } = this.props;
    history.push('/dash');
    this.props.processLogin(username);
  };

  render() {
    return (
      
      <section aria-live="polite">
        <div className="login-section">
          <div className="login-header">
        <h2>Welcome back!</h2>
        <p>Don't have an account? <Link id="register-link-login" to="/register">Register here.</Link></p>
        </div>
        <div className="login-content">
       {/*  <img className="reg-photo-3" src={grape} alt="grape"/> */}
        <LoginForm onLoginSuccess={this.handleLoginSuccess}/>
        </div>
        </div>
      </section>
    
    );
  }
}

export default LoginRoute;
