import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import './Header.css'

class Header extends Component {
  state={
    refresh:true,
    isHidden: false
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
        <Link id="aboutlink"
          to="/about">About</Link>
          {' '}
          <Link id="logoutlink"
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
     <nav className="LoginLogout">
     <Link id="aboutlink"
          to="/about">About</Link>
          {' '}
        </nav>
        <Link id='loginlink' to='/login'>Login</Link>
        {' '}
        <Link id='signuplink' to='/register'>Sign up</Link>
        
        
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