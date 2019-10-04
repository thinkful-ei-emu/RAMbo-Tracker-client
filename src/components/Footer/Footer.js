import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div>
      <div id="footer" role="contentinfo">
        <div id="app-info">
          <div id="title-and-links">
            <p id="title-footer">
              Symptom Tracker<br></br>{" "}
              <a
                href="https://github.com/thinkful-ei-emu/RAMbo-Tracker-client"
                target="_blank"
                rel="noopener noreferrer"
              >
                Client Code
              </a>{" "}
              <br></br>
              <a
                href="https://github.com/thinkful-ei-emu/RAMbo-Tracker-Server"
                target="_blank"
                rel="noopener noreferrer"
              >
                Server Code
              </a>
            </p>
          </div>
          <div id="demo-login">
            <p className="login-footer">Demo Username: testuser</p>
            <p className="login-footer">Demo Password: password1</p>
          </div>
        </div>
        <div id="developers">
          <p id="created-head">Created By:</p>
          <ul>
            <li>
              <a
                href="https://thinkful-ei-emu.github.io/portfolio-colleen/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Colleen Higgins
              </a>
            </li>
            <li>
              <a
                href="https://thinkful-ei-emu.github.io/Paul-Portfolio/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Paul KHan
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Blakelowrey"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Blake Lowrey{" "}
              </a>
            </li>
            <li>
              <a
                href="https://thinkful-ei-emu.github.io/portfolio-corey/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Corey Moore
              </a>
            </li>
            <li>
              <a
                href="https://tarajpatel.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                T.J. Patel
              </a>
            </li>
            <li>
              <a
                href="https://dcoollx.github.io/Portfolio/"
                target="_blank"
                rel="noopener noreferrer"
              >
                David Queen Jr.
              </a>
            </li>
          </ul>
          <p id="copy-footer">RAMbo &copy; 2019</p>
        </div>
      </div>
    </div>
  );
}
