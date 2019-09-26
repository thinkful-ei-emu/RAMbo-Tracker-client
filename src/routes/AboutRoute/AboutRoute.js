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
            This application is not to be used to replace medical advice from a professional, as we are not medical professionals. However, this application can be used to assist you in your conversation with your care provider to address your food intolerances and sensitivities.</p>
            <p>In order to compile all the information you add to your food log, our team developed an algorithm that analyzes ingredients (based on food inputs, compiled from the USDA API) and matches to frequency and intensity of a particular symptom you are tracking. Because you know your body best, you set the time frame for when to look out for a particular symptom; anywhere from 30 minutes to up to 72 hours.</p>
            <h4>Where does the food search data come from?</h4>
            <p>We utilize the USDA's <a href='https://fdc.nal.usda.gov/api-guide.html'>FoodData Central API</a> for all food and ingredient data. <br></br>Citation: U.S. Department of Agriculture, Agricultural Research Service. FoodData Central, 2019. fdc.nal.usda.gov.</p>
      </div>
    </section>
  );
}

export default AboutRoute;
