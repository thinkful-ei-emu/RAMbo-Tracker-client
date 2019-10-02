import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
      <div >
        <div id='phantom-footer' />
          <div id='footer' role='contentinfo'>
            <div id="app-info">
            <div id="title-and-links">
            <p id='title-footer'>Symptom Tracker<br></br> <a href="https://github.com/thinkful-ei-emu/RAMbo-Tracker-client">Client Code</a>{' '} 
            <br></br><a href="https://github.com/thinkful-ei-emu/RAMbo-Tracker-Server">Server Code</a>
            </p>
            </div>
            <div id='demo-login'>
            <p className='login-footer'>Demo Username: testuser</p>
            <p className='login-footer'>Demo Password: password1</p>
            </div>
            </div>
            <div id='developers'>
              <p id='created-head'>Created By:</p>
              <ul>
                <li>
                  <a href="https://thinkful-ei-emu.github.io/portfolio-colleen/">Colleen Higgins</a>
                </li>
                <li>
                  Paul KHan
                </li>
                <li>
                  Blake Lowrey
                </li>
                <li>
                  <a href='https://thinkful-ei-emu.github.io/portfolio-corey/'>Corey Moore</a> 
                </li>
                <li>
                  <a href="https://tarajpatel.com">T.J. Patel</a>
                </li>
                <li>
                David Queen Jr.
                </li>
              </ul>
              <p id='copy-footer'>RAMbo &copy; 2019</p>

            </div>
          </div>
      </div>
    )
  
}
