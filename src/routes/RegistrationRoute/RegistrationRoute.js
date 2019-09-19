import React from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import './RegistrationRoute.css'
import lemon from '../../Media/Lemons.jpg'
import carrot from '../../Media/carrot.jpg'
import grape from '../../Media/grapes.jpg'
import lettuce from '../../Media/lettuce.jpg'

class RegistrationRoute extends React.Component {
  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push("/dash");
  };

  render() {
    return (
      <section aria-live="polite" className="registration-view">
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
        <div className='reg-photo-container'>
        <img
          className="reg-photo"
          src={lemon}
          alt="A lemon"
        /></div>
        <img
          className="reg-photo-2"
          src={carrot}
          alt="Carrot"
        />
        <div className="mission">
          <h3 className="reg-description-header">Our mission</h3>
          <p className="reg-description">
            The RAMbo health tracker is an online food diary designed to help
            you take control of your health.{" "}
          </p>
        
        </div>
        <div className="mission">
       
        <p>
            {" "}
            <span className="emphasis">By tracking foods</span> you eat and symptoms you experience, Symptom
            Tracker will help draw relationships between the what you eat and
            how you feel.
          </p>
          </div>
          <img
          className="reg-photo-2"
          src={grape}
          alt="bunch of grapes"
        />
             <img
          className="reg-photo-2"
          src={lettuce}
          alt="lettuce"
        />
        <div className="mission">
          <p>
            {" "}
           <span className="emphasis">You can now</span> be better prepared
            to talk with your doctor about how to take your next steps to
            wellness. <br></br> Happy tracking!
          </p>
          </div>
      </section>
    );
  }
}

export default RegistrationRoute;
