import React from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

class RegistrationRoute extends React.Component {
  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push('/dash');
  }

  render() {
    return (
      <section aria-live="polite">
        <RegistrationForm
        onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    )
  }
}

export default RegistrationRoute;