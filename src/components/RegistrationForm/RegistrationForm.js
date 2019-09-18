import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'
import './RegistrationForm.css'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }
  handleSubmit = ev => {
    ev.preventDefault()
    const { user_name, password } = ev.target

    console.log(user_name.value, password.value)
    
    this.setState({ error: null })
    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value,
    })
    .then(user => {
      user_name.value = ''
      password.value = ''
      this.props.onRegistrationSuccess()
    })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <section className='section-container'>
        <h4>Who we are</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        <div className='reg-container'>
          <form
            className='RegistrationForm'
            onSubmit={this.handleSubmit}
          >
            <div role='alert'>
              {error && <p className='red'>{error}</p>}
            </div>
            
            <div className='user_name'>
              <label htmlFor='RegistrationForm__user_name'>
                Username 
              </label>
              <input
                name='user_name'
                type='text'
                required
                id='RegistrationForm__user_name'>
              </input>
            </div>

            <div className='password'>
              <label htmlFor='RegistrationForm__password'>
                Password 
              </label>
              <input
                name='password'
                type='password'
                required
                id='RegistrationForm__password'>
              </input>
            </div>
        
            <button type='submit'>
              Register
            </button>
          </form>
        </div>
      </section>
    )
  }
}

export default RegistrationForm;