import React from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import './RegistrationRoute.css'
import lemon from '../../Media/Lemons.jpg'

class RegistrationRoute extends React.Component {
  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push('/dash');
  }

  render() {
    return (
      <section aria-live="polite" className="registration-view">
        <RegistrationForm
        onRegistrationSuccess={this.handleRegistrationSuccess}
        />
        <div className='reg-photo-container'>
          <img className="reg-photo" src={lemon} alt="Health food" />
        </div>
        <h3 className="reg-description-header">Our mission</h3>
        <p className="reg-description">The RAMbo health tracker is an online food diary designed to help users take control of their health. By tracking foods they eat and symptoms they experience, Symptom Tracker will help you draw relationships between the food you eat and way you feel. By tracking your food and symptoms, you can now be better prepared to talk with your doctor about how to take your next steps to wellness. Happy tracking!</p>
      </section>
    )
  }
}

export default RegistrationRoute; 