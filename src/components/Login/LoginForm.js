import React, { Component } from 'react';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import { Link } from 'react-router-dom';
import './LoginForm.css';

class LoginForm extends Component {
  static defaultProps = {
    handleLoginSuccess: () => {}
  }

  state = { error: null }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { user_name, password } = ev.target
    console.log(user_name.value, password.value)

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then(res => {
        user_name.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
    }

    handleErrorMessage = () => {
      return (
        <div>
            {this.state.error}
        </div>
      )
    }

  render() {
    return (
    <div className="loginScreen">
      <form className='LoginForm' onSubmit={this.handleSubmitJwtAuth}>

      <div className='user_name'>
        <label htmlFor='LoginForm_user_name'>
          Username  
        </label><br/>
        
        <input 
          name='user_name' 
          placeholder='Username' 
          id='loginForm_user_name' 
          required>
        </input><br/>
      </div>

      <div className='password'>
        <label htmlFor='loginForm_password'>
          Password
        </label><br/>
        <input 
          type='password' 
          name='password' 
          id='loginForm_password' 
          placeholder='Password' 
          required>
        </input><br/>
      </div>

      { this.state.error && this.handleErrorMessage }

        <button type='Submit'>Login</button>
        <h1><Link className='Register'to ='/'>Not a user yet? Register here!</Link></h1>
      </form>

    </div>
    )
  }
} 

export default LoginForm;