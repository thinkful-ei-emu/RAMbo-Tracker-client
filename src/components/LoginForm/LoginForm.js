import React from "react";
import API from "../../services/api-service";
import TokenService from "../../services/token-service";
import "./LoginForm.css";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      username: "",
      password: ""
    };
    this.firstInput = React.createRef();

  }


  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const { username, password } = this.state;

    this.setState({ error: null });

    API.doFetch('/auth/token', 'POST', {
      username,
      password
    })
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess(username);
      })
      .catch(res => {
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
          {error && <p className='error'>{error}</p>}
        </div>
        <div className="login-input">
          <label htmlFor="login-username-input" className="loginLabel">
            Username:
          </label>
          <br></br>
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
          <label htmlFor="login-password-input" className="loginLabel">
            Password:
          </label>
          <br></br>
          <input
            onChange={this.handleChange}
            id="login-password-input"
            name="password"
            type="password"
            required
            value={this.state.password}
          />
          <button className="user-button" type="submit">
            Login
          </button>{" "}
        </div>
      </form>
    );
  }
}

export default LoginForm;
