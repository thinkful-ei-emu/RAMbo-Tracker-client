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
        {/* <nav> */}
          <Link id="logoutlink"
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
{/*         </nav>
 */}      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='nav-container'>
     
        <Link id='loginlink' to='/login'>Login</Link>
        {' '}
        <Link id='signuplink' to='/register'>Sign up</Link>
      
      </div>
    )
  }

  render() {
    return (
      <div>
        <nav>
        <h1 className='Header'>
          <Link id='main-title' to='/'>
            Symptom Tracker
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
          <div id='box'></div>
          </nav>
      </div>
    );
  }
}

export default Header