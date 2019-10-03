import React, { Component } from 'react';
import API from '../../services/api-service';
import DatePicker from 'react-datepicker';
import helper from '../../services/helper.services';
import 'react-datepicker/dist/react-datepicker.css';
import './Symptom.css';
import face1 from '../../Media/wellness_face_1.png';
import face2 from '../../Media/wellness_face_2.png';
import face3 from '../../Media/wellness_face_3.png';
import face4 from '../../Media/wellness_face_4.png';
import face5 from '../../Media/wellness_face_5.png';

class Symptom extends Component {
  state = {
    selectedSymptom: '',
    typedSymptom: '',
    symptomSeverity: null,
    symptomTime: new Date(),
    pastUserSymptoms: [],
    pastSymptomVal: '',
    symptomSelectIsHidden: false,
    symptomInputDisabled: false,
    error: null
  };

  componentDidMount() {
    this.setState({ error: null });
    this.setState({ pastUserSymptoms: helper.preExisting() });

    //set colors
    let radioButtons = document.getElementById('symptom-form')['radio-face'];
    radioButtons[0].parentElement.style.backgroundColor = 'rgba(255,255,0,0)';
    radioButtons[1].parentElement.style.backgroundColor = 'rgba(255,215,0,0)';
    radioButtons[2].parentElement.style.backgroundColor = 'rgba(255,165,0,0)';
    radioButtons[3].parentElement.style.backgroundColor = 'rgba(255,69,0,0)';
    radioButtons[4].parentElement.style.backgroundColor = 'rgba(255,0,0,0)';
  }

  handleSymptomSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: null });

    let sym = {};
    sym.type = 'symptom';
    sym.symptom = this.state.selectedSymptom || this.state.typedSymptom;
    sym.severity = this.state.symptomSeverity;
    sym.time = this.state.symptomTime;
    sym.symptom = this.state.pastSymptomVal
      ? this.state.pastSymptomVal
      : sym.symptom;
    API.doFetch('/event', 'POST', sym)
      .then((res) => {
        this.setState({
          typedSymptom: '',
          selectedSymptom: false
        })
        this.props.updateEvents(res);
        this.props.closeModal('addSymptomsModal');
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  handleTimeChange = (date) => {
    this.setState({
      symptomTime: date
    });
  };

  handleSeverityChange = (sev) => {
    let radioButtons = document.getElementById('symptom-form')['radio-face'];
    this.setState({ symptomSeverity: Number(sev.target.value) });
    radioButtons.forEach((radio) => {
      if (radio.value <= radioButtons.value) {
        let color = radio.parentElement.style.backgroundColor;
        let values = color.split(',');
        values[3] = '0.99)';
        color = values.join(',');
        radio.parentElement.style.backgroundColor = color;
        //that button should be lit up
      } else {
        let color = radio.parentElement.style.backgroundColor;
        let values = color.split(',');
        values[3] = '0)';
        color = values.join(',');
        radio.parentElement.style.backgroundColor = color;
        //button should be transparent
      }
    });
    this.setState({
      symptomSeverity: sev.target.value
    });
  };

  handleSymptomChange = (sym) => {
    this.setState({
      typedSymptom: '',
      selectedSymptom: sym.target.value
    });
  };

  handleSymptomInputChange = (sym) => {
    this.setState({
      selectedSymptom: false,
      typedSymptom: sym.target.value
    })
  }

  addSymptomClick = (e) => {
    e.preventDefault();
    const symptomSelectIsHidden = this.state.symptomSelectIsHidden;
    this.setState({
      symptomSelectIsHidden: !symptomSelectIsHidden,
      symptomInputDisabled: true
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="symptom-container">
        <p className="exitButton" onClick={()=>this.props.closeModal('addSymptomsModal')}>X</p>
        <section className="symptom-container">
          <h2>Log a Symptom</h2>
          <form
            id="symptom-form"
            onSubmit={(e) => this.handleSymptomSubmit(e)}
            onReset={() => this.props.closeModal('addSymptomsModal')}
          >
            <h3>Choose from recent symptoms:</h3>
            {this.props.prevSymptoms.map((s, i) => {
              if (i > 4 || !s)
                //limits to 5
                return null;
                
              return (
                <div className={`recent-radio-container ${this.state.selectedSymptom===s && 'selected'}`} key={i} >
                  <label className="recent-radios-label" htmlFor={`radio-${s}`}>{s}</label>
                  <input
                    className="recent-radio"
                    id={`radio-${s}`}
                    key={i}
                    type="radio"
                    onChange={this.handleSymptomChange}
                    checked={this.state.selectedSymptom === s}
                    name="symptom-type-name"
                    value={s}
                  />
                </div>
              );
            })}
            <div id="user-input-container">
              <h3>
                <label htmlFor="user-symptom">Or type in a symptom:</label>
              </h3>
              <br />
              <input
                id="radio-other-input"
                className="recent-radio"
                type="radio"
                name="symptom-type-name"
                value={this.state.typedSymptom}
                onChange={this.handleSymptomInputChange}
                checked={this.state.typedSymptom}
              />
              <label htmlFor="radio-other-input">
                <datalist id="past-symptoms">
                  {this.state.pastUserSymptoms.map((sym, i) => (
                    <option key={i} value={sym.label} />
                  ))}
                </datalist>
                <input
                  name="symptom"
                  value={this.state.typedSymptom}
                  onChange={this.handleSymptomInputChange}
                  id="user-symptom"
                  type="text"
                  placeholder="bloated.."
                  maxlength="20"
                  list="past-symptoms"
                  disabled={this.state.symptomSelectIsHidden}
                />
                <p id="auto-complete"></p>
              </label>
            </div>

            <div id="date">
              <label htmlFor="date-select">Date and Time:</label>
              <DatePicker
                id="date-select"
                selected={this.state.symptomTime}
                onChange={this.handleTimeChange}
                showTimeSelect
                dateFormat="Pp"
              />
            </div>

            <label id="radio-label" htmlFor="radio">
              Rate the Severity
            </label>
            <br />
            <div className="radio-container">
              <div className="radio-buttons-1">
                <input
                  className="radio-input"
                  name="radio-face"
                  id="radio-1"
                  type="radio"
                  value="1"
                  checked={this.state.symptomSeverity === '1'}
                  onChange={(e) => this.handleSeverityChange(e)}
                />
                <label htmlFor="radio-1">
                  <img className="face" src={face1} alt="Severity Very Mild" />
                </label>
              </div>

              <div className="radio-buttons-2">
                <input
                  className="radio-input"
                  name="radio-face"
                  id="radio-2"
                  type="radio"
                  value="2"
                  checked={this.state.symptomSeverity === '2'}
                  onChange={(e) => this.handleSeverityChange(e)}
                />
                <label htmlFor="radio-2">
                  <img className="face" src={face2} alt="Severity Mild" />
                </label>
              </div>

              <div className="radio-buttons-3">
                <input
                  className="radio-input"
                  name="radio-face"
                  id="radio-3"
                  type="radio"
                  value="3"
                  checked={this.state.symptomSeverity === '3'}
                  onChange={(e) => this.handleSeverityChange(e)}
                />
                <label htmlFor="radio-3">
                  <img className="face" src={face3} alt="Severity Medium" />
                </label>
              </div>

              <div className="radio-buttons-4">
                <input
                  className="radio-input"
                  name="radio-face"
                  id="radio-4"
                  type="radio"
                  value="4"
                  checked={this.state.symptomSeverity === '4'}
                  onChange={(e) => this.handleSeverityChange(e)}
                />
                <label htmlFor="radio-4">
                  <img className="face" src={face4} alt="Severity High" />
                </label>
              </div>

              <div className="radio-buttons-5">
                <input
                  className="radio-input"
                  name="radio-face"
                  id="radio-5"
                  type="radio"
                  value="5"
                  checked={this.state.symptomSeverity === '5'}
                  onChange={(e) => this.handleSeverityChange(e)}
                />
                <label htmlFor="radio-5">
                  <img className="face" src={face5} alt="Severity Extreme" />
                </label>
              </div>
            </div>

            <br />
            {this.state.error && (
              <p className="symptom-error">{this.state.error}</p>
            )}
            <div id="submit-button">
              <button id="back-button" type="reset">
                Back
              </button>
              <button className="user-button" type="submit">
                Submit Symptom
              </button>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

export default Symptom;
