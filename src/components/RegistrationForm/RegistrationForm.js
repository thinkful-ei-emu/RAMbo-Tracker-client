import React from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api-service';
import './RegistrationForm.css';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      username: '',
      password1: '',
      password2: '',
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
    if(this.state.password1 !== this.state.password2) {
      this.setState({
        error: 'Passwords must match'
      })
    }
    else {
      const { name, username, password1 } = this.state;
      API.doFetch('/user', 'POST', {
        display_name: name,
        username: username,
        password: password1
      })
        .then((user) => {
          this.props.onRegistrationSuccess();
        })
        .catch((res) => {
          this.setState({error: res.message});
        });
    }
  };

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="registration-form">
        <h2>Register for an account</h2>
        <div role="alert" className="error">
          {error && <p>{this.state.error}</p>}
        </div>
        <div className="registration-input">
          <label htmlFor="registration-name-input" className='regLabel'>Enter your name:</label><br></br>
          <input
          className="registration-input-field"
            onChange={this.handleChange}
            type="text"
            id="registration-name-input"
            name="name"
            value={this.state.name}
            required
          />
        </div>
        <div className="registration-input">
          <label htmlFor="registration-username-input" className='regLabel'>
            Choose a username:
          </label><br></br>
          <input
                    className="registration-input-field"

            onChange={this.handleChange}
            type="text"
            id="registration-username-input"
            name="username"
            value={this.state.username}
            required
          />
        </div>
        <div className="registration-input">
          <label htmlFor="registration-password-input1" className='regLabel'>
            Choose a password:
          </label><br></br>
          <input
            onChange={this.handleChange}
            className="registration-input-field"

            id="registration-password-input1"
            name="password1"
            type="password"
            value={this.state.password1}
            required
          />
        </div>
        <div className="registration-input">
          <label htmlFor="registration-password-input2" className='regLabel'>
            Re-enter your password:
          </label><br></br>
          <input
            onChange={this.handleChange}
            className="registration-input-field"

            id="registration-password-input2"
            name="password2"
            type="password"
            value={this.state.password2}
            required
          />
        </div>
        <button className="user-button" type="submit">Sign up!</button>
        <p><Link to="/login">Already have an account?</Link></p>
      </form>
    );
  }
}

export default RegistrationForm;
