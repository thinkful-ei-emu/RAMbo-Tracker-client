import './AboutRoute.css';
import React from 'react';
import cupcake from '../../Media/cupcake.png';
class AboutRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: [false, false, false, false, false] };
  }
  changeName = (index) => {
    if (this.state.show[index] === false) {
      return '+';
    }
    return '-';
  };
  showHide = (index) => {
    const update = [...this.state.show];
    update[index] = !update[index];
    this.setState({
      show: update
    });
  };
  render() {
    return (
      <section>
        <div className="about">
          <h2 className="about-header">The Fine Details</h2>
          <h3 className="about-header">a.k.a How this app works</h3>

          <div className="info">
            <div className="info-head">
              <h4>What we are:</h4>{' '}
              <button className="info-button" onClick={() => this.showHide(0)}>
                {this.changeName(0)}
              </button>
            </div>
            {this.state.show[0] && (
              <p>
                We are so happy you're here. We made this application for those
                who are looking for a detailed way to investigate diet-related
                chronic symptoms they experience. You can log and track meals,
                the symptoms you specifically are experiencing, and draw
                connections between diet and symptoms.{' '}
              </p>
            )}
          </div>

          <div className="info">
            <div className="info-head">
              <h4>What we are not:</h4>
              <button className="info-button" onClick={() => this.showHide(1)}>
                {this.changeName(1)}
              </button>
            </div>
            {this.state.show[1] && (
              <>
                {' '}
                <p>
                  This application is not to be used to replace medical advice
                  from a professional, as we are not medical professionals.
                  However, this application can be used to assist you in your
                  conversation with your care provider to address your food
                  intolerances and sensitivities.
                </p>
                <p>
                  In order to compile all the information you add to your food
                  log, our team developed an algorithm that analyzes ingredients
                  (based on food inputs, compiled from the USDA API) and matches
                  to frequency and intensity of a particular symptom you are
                  tracking. Because you know your body best, you set the time
                  frame for when to look out for a particular symptom; anywhere
                  from 30 minutes to up to 72 hours.
                </p>
              </>
            )}
          </div>

          <div className="info">
            <div className="info-head">
              <h4>Where does the food search data come from?</h4>
              <button className="info-button" onClick={() => this.showHide(2)}>
                {this.changeName(2)}
              </button>
            </div>
            {this.state.show[2] && (
              <p>
                We utilize the USDA's{' '}
                <a href="https://fdc.nal.usda.gov/api-guide.html">
                  FoodData Central API
                </a>{' '}
                for all food and ingredient data. <br></br>Citation: U.S.
                Department of Agriculture, Agricultural Research Service.
                FoodData Central, 2019. fdc.nal.usda.gov.
              </p>
            )}
          </div>

          <div className="info">
            <div className="info-head">
              <h4>How do I use it?</h4>
              <button className="info-button" onClick={() => this.showHide(3)}>
                {this.changeName(3)}
              </button>
            </div>

            {this.state.show[3] && (
              <>
                {' '}
                <ul className="app-instructions">
                  <li>
                    First, register and log in to view your own dashboard, where
                    you will add your logs to track.
                  </li>
                  <li>
                    As you experience symptoms, add them using the 'Log
                    symptoms' button above your log. We reccommend only tracking
                    a few symptoms that you want to focus on.
                  </li>
                  <li>
                    Within the 'Log a Symptom' button, you can choose from your
                    most recent symptoms, or type one in. Don't worry you if
                    you've tracked a symptom and don't see it under recents. No
                    matter what you type, our program will still match it to
                    your previously tracked symptoms. Enter the time that you
                    experienced this symptom, and the level of severity. Click
                    'Log symptom,' and see it appear on your dashboard!
                  </li>
                  <li>
                    Log a meal that you ate using the 'Log A Meal' button.
                  </li>
                  <li>
                    Within the 'Log a Meal' button, you will need to search for
                    foods you ate during that meal. Click 'Add Food' to add the
                    food to your meal. We recommend ensuring you log the correct
                    time and date for your meal for the best accuracy in
                    tracking.
                  </li>
                </ul>
              </>
              
            )}
          </div>
          <div className="info">
            <div className="info-head">
              <h4>How do I customize my results?</h4>
              <button className="info-button" onClick={() => this.showHide(4)}>
                {this.changeName(4)}
              </button>
            </div>

            {this.state.show[4] && (
              <>
                {' '}
                <ul className="app-instructions">
                <li>
                    As you add meals and symptoms, you will be able to analyze
                    your results to show you which ingredients in the meals you
                    ate correspond the most strongly to the symptoms you
                    experience.
                  </li>
                  <li>
                    Over time, you will begin to see your results populate in
                    the 'Results' section of your dashboard. Feel free to filter
                    out ingredients you don't suspect as the issue.
                  </li>
                  <li>
                    Here, you can also click the pencil icon, and change the
                    time interval with which we choose foods to factor into
                    results. You know your body best, so select a time window
                    that makes sense for that symptom and your body. For
                    instance, when thinking about what is causing my migraines,
                    I might want to look at foods I ate between 1 hour and 8
                    hours before my symptoms occurred.
                  </li>
                </ul>
              </>
              
            )}
          </div>
        </div>
        <div id="about-img-cont">
          <img id="about-img" src={cupcake} alt="cupcake"></img>
        </div>
      </section>
    );
  }
}

export default AboutRoute;
