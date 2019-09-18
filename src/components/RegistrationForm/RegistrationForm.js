import React from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../../services/auth-api-service';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      username: '',
      password: '',
      name: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, username, password } = this.state;
    AuthApiService.postUser({
      display_name: name.value,
      username: username.value,
      password: password.value
    })
      .then((user) => {
        this.props.onRegistrationSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="registration-form">
        <div role="alert" className="error">
          {error && <p>{error}</p>}
        </div>
        <div className="registration-input">
          <label htmlFor="registration-name-input">Enter your name:</label>
          <input
            onChange={this.handleChange}
            type="text"
            id="registration-name-input"
            name="name"
            value={this.state.name}
            required
          />
        </div>
        <div className="registration-input">
          <label htmlFor="registration-username-input">
            Choose a username:
          </label>
          <input
            onChange={this.handleChange}
            type="text"
            id="registration-username-input"
            name="username"
            value={this.state.username}
            required
          />
        </div>
        <div className="registration-input">
          <label htmlFor="registration-password-input">
            Choose a password:
          </label>
          <input
            onChange={this.handleChange}
            id="registration-password-input"
            name="password"
            type="password"
            value={this.state.password}
            required
          />
        </div>
        <button type="submit">Sign up!</button>
        <Link to="/login">Already have an account?</Link>
      </form>
    );
  }
}

export default RegistrationForm;
