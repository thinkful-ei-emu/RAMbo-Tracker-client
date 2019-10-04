import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import "./Header.css";
import logo from "../../Media/logo2.png";

class Header extends Component {
  state = {
    refresh: true,
    isHidden: false
  };
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.setState({
      refresh: !this.state.refresh
    });
  };

  renderLogoutLink() {
    return (
      <div className="nav-container">
        <nav className="LoginLogout">
          <NavLink id="aboutlink" to="/about" activeClassName="current-nav">
            About
          </NavLink>{" "}
          <NavLink id="dashlink" to="/dash" activeClassName="current-nav">
            Dashboard
          </NavLink>
          <Link id="logoutlink" onClick={this.handleLogoutClick} to="/login">
            Logout
          </Link>
        </nav>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="nav-container">
        <nav className="LoginLogout">
          <NavLink id="aboutlink" to="/about" activeClassName="current-nav">
            About
          </NavLink>{" "}
          <NavLink id="loginlink" to="/login" activeClassName="current-nav">
            Login
          </NavLink>{" "}
          <NavLink id="signuplink" to="/register" activeClassName="current-nav">
            Sign up
          </NavLink>
        </nav>
      </div>
    );
  }

  render() {
    return (
      <header>
        <h1 className="Header">
          <a href="/">
            <img className="header-photo" src={logo} alt="Symptom Tracker" />
          </a>
          <Link id="main-title" to="/">
            Symptom Tracker
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
        <div id="box"></div>
      </header>
    );
  }
}

export default Header;
