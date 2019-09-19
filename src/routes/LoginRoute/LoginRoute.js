import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import {Link} from 'react-router-dom';

class LoginRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handleLoginSuccess = () => {
    const { history } = this.props;
    history.push('/dash');
  };

  render() {
    return (
      <section aria-live="polite">
        <p>Welcome back!</p>
        <p>Don't have an account? Register <Link to="/register">here.</Link></p>
        <LoginForm onLoginSuccess={this.handleLoginSuccess}/>
      </section>
    );
  }
}

export default LoginRoute;
