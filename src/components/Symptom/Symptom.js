import React, { Component } from 'react';
// import API from '../../services/Api-service';
import DatePicker from 'react-datepicker';
// import helper from '../../services/helper.services';
import 'react-datepicker/dist/react-datepicker.css';
import './Symptom.css';

class Symptom extends Component {
  state = {
    name : '',
    severity : null,
    time : new Date(),
    pastUserSymptoms : [...this.props.prevSymptoms],
    pastSymptomVal : '',
    symptomSelectIsHidden : false,
    symptomInputDisabled : false
  }

  handleSymptomSubmit = (e) => {
    e.preventDefault();
    let { name, severity, prevSymptom } = e.target;
    let sym = { name, severity, prevSymptom }
    sym.name = sym.name.value
    sym.severity = sym.severity.value
    sym.time = this.state.time
    sym.prevSymptom = sym.prevSymptom === undefined ? '' : sym.prevSymptom.value

    sym.name = sym.prevSymptom === '' ? sym.name : sym.prevSymptom
    console.log(sym)
    
    // API.doFetch('/event', 'POST', {name, severity, time})
    // .then(res => {
      
    // })
    // .catch(e => console.log(e));
    e.target['user-symptom'].value = '';
    this.props.updateEvents(sym);
    this.props.closeModal('addSymptomsModal');//this functions is passed in from dashboard to close the modal, it should be placed int the 'then' of api call to ensure it only runs in happy case 
  }

  addSymptomClick = (e) => { 
    e.preventDefault(); 
    const symptomSelectIsHidden = this.state.symptomSelectIsHidden; 
    this.setState({ symptomSelectIsHidden : !symptomSelectIsHidden, symptomInputDisabled : true }) }

  handleTimeChange = date => { 
    this.setState({ 
      symptomTime: date 
    }); 
  }

  render() {

    let savedSymptoms = this.state.pastUserSymptoms.map((item, index) => {
      return  <option key={index} value={item.name}>
                {item.name}
              </option>
    })

    return(
      <section className='symptom-container'>
        <form onSubmit={(e)=>this.handleSymptomSubmit(e)}>

        <div id='user-input-container'>
          <label htmlFor='user-symptom'>New Symptom</label>
          <br/>
          <input name='name' id='user-symptom' type='text' placeholder='bloated..' disabled={this.state.symptomSelectIsHidden} />
        </div>

        <div id='select'>
          <button type='button' onClick={this.addSymptomClick} >Add Pre-existing</button>
          { this.state.symptomSelectIsHidden ? <>
          <label htmlFor='symptom-select'></label>
          <select name='prevSymptom' id='symptom-select' >
            {savedSymptoms}
          </select> </> : <></>
        }
        </div>

        <div id='date'>
          <label htmlFor='date-select'>When?</label>
            <DatePicker name='time' id='date-select' selected={this.state.symptomTime} showTimeSelect withPortal dateFormat="Pp" onChange={this.handleTimeChange} />
        </div>

        <div id='severity-radio'>
            <p>Rate the Severity</p>
          <input name='severity' type="range" step="1" min="1" max="5" defaultValue='5' />
        </div>

          <br/>
          <button type='submit'>Submit Symptom</button>
          
        </form>
      </section>
    )
  }


  
}

export default Symptom;