import "./AboutRoute.css";
import React, { Component } from "react";

function AboutRoute() {
  return (
    <section>
      <div className="about">
        <h2>The Fine Details</h2>
           <h3>a.k.a How this app works</h3>
          <p>
            We are so happy you're here. We made this application for those who are looking for a specific way to help people experiencing potential adverse effects from food ingredients. You can log and track meals, the symptoms you specifically are experiencing, and draw connections between diet and symptoms. <br></br>
            This application is not to be used to replace medical advice from a professional, as we are not medical professionals. However, this application can be used to assist you in your conversation with your care provider to address your food intolerances and sensitivities</p>
      </div>
    </section>
  );
}

export default AboutRoute;
