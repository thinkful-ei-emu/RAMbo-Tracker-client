import React, { Component } from 'react'
import pumpkin from '../../Media/infant-pumpkin-costume.jpg'
import '../NotFoundRoute/NotFound.css'

class NotFoundRoute extends Component {
  render() {
    return (
      <section className="not-found">
        <h2>404 - Page not found</h2>
        <div className = 'not-found-image'>
        <img className = "not-found-img" src='https://professionalmorondotcom.files.wordpress.com/2015/03/zelda-ii-i-am-error.png' alt="zelda error"/>
        </div>
        <p>Try going back to your previous page.</p>
      </section>
    );
  }
}

export default NotFoundRoute
