import React, { Component } from 'react';
import API from '../../services/Api-service';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Symptom.css';

class Symptom extends Component {
  state = {
    symptomName : '',
    symptomSeverity : null,
    symptomTime : new Date(),
  }

  handleSymptomSubmit = (e) => {
    e.preventDefault();
    console.log('testing symptomSubmit');

    let userSymptom = e.target['user-symptom'].value;
    API.doFetch(/*'TODO',*/ 'POST', {userSymptom})
    .then(res => {
      //TODO
    })
    .catch(e => console.log(e));
    e.target['user-symptom'].value = '';
  }

  handleTimeChange = date => { 
    this.setState({ 
      symptomTime: date 
    });
  }

  handleSeverityChange = sev => { 
    this.setState({ 
      symptomSeverity: sev.target.value 
    }); 
  }

  render() {
    return(
      <section className='symptom-container'>
        <form onSubmit={(e)=>this.handleSymptomSubmit(e)}>

        <div id='user-input-container'>
          <label htmlFor='user-symptom'>New Symptom</label>
          <br/>
          <input name='symptom' id='user-symptom' type='text' placeholder='bloated..'></input>
        </div>

        <div>
          <label htmlFor='date-select'>When?</label>
            <DatePicker id='date-select' selected={this.state.symptomTime} onChange={this.handleTimeChange} showTimeSelect withPortal dateFormat="Pp" />
        </div>

        <div id='severity-radio'>
            <p>Rate the Severity</p>
          <div className="radio">
            <label><input type="radio" value="option1" 
            checked={this.state.symptomSeverity === 'option1'}
            onChange={this.handleSeverityChange} />1</label>
          </div>
          <div className="radio">
            <label><input type="radio" value="option2" 
            checked={this.state.symptomSeverity === 'option2'}
            onChange={this.handleSeverityChange} />2</label>
          </div>
          <div className="radio">
            <label><input type="radio" value="option3" 
            checked={this.state.symptomSeverity === 'option3'}
            onChange={this.handleSeverityChange} />3</label>
          </div>
          <div className="radio">
            <label><input type="radio" value="option4" 
            checked={this.state.symptomSeverity === 'option4'}
            onChange={this.handleSeverityChange}/>4</label>
          </div>
          <div className="radio">
            <label><input type="radio" value="option5" 
            checked={this.state.symptomSeverity === 'option5'}
            onChange={this.handleSeverityChange}/>5</label>
          </div>
        </div>

          <br/>
          <button>Submit Symptom</button>
          
        </form>
      </section>
    )
  }


  
}

export default Symptom;