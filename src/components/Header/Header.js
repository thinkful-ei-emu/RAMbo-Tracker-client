import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import './Header.css'

class Header extends Component {
  state={
    refresh:true
  }
  handleLogoutClick = () => {
    TokenService.clearAuthToken();this.setState({
      refresh: !this.state.refresh
    })
  }

  renderLogoutLink() {
    return (
      <div className='user-container'>
        <nav>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='nav-container'>
      <nav className='LoginLogout'>
        <Link id='loginlink' to='/login'>Login</Link>
        {' '}
        <Link id='signuplink' to='/register'>Sign up</Link>
      </nav>
      </div>
    )
  }

  render() {
    return (
      <header>
        <h1 className='Header'>
          <Link id='main-title' to='/'>
            Symptom Tracker
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
          <div id='box'></div>
      </header>
    );
  }
}

export default Header