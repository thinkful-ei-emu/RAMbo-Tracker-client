import React from 'react';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      username: '',
      password: ''
    }
  }

  firstInput = React.createRef();

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { username, password } = this.state;

    this.setState({ error: null });

    AuthApiService.postLogin({
      username, password
    })
      .then((res) => {
        TokenService.saveAuthToken(res.authToken)
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="login-form">
        <div className="error" role="alert">
          {error && <p>{error}</p>}
        </div>
        <div className="login-input">
          <label htmlFor="login-username-input ">Username:</label>
          <input
            onChange={this.handleChange}
            ref={this.firstInput}
            id="login-username-input"
            name="username"
            required
            value={this.state.username}
          />
        </div>
        <div className="login-input">
          <label htmlFor="login-password-input">Password:</label>
          <input
          onChange={this.handleChange}
            id="login-password-input"
            name="password"
            type="password"
            required
            value={this.state.password}
          />
        </div>
        <footer>
          <button type="submit">Login</button>{' '}
        </footer>
      </form>
    );
  }
}

export default LoginForm;
