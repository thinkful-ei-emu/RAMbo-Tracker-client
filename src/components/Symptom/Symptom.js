import React, { Component } from "react";
import API from '../../services/Api-service';
import DatePicker from "react-datepicker";
import helper from "../../services/helper.services";
import "react-datepicker/dist/react-datepicker.css";
import "./Symptom.css";

class Symptom extends Component {
  state = {
    symptomName: "",
    symptomSeverity: null,
    symptomTime: new Date(),
    pastUserSymptoms: [],
    pastSymptomVal: "",
    symptomSelectIsHidden: false,
    symptomInputDisabled: false
  };

  componentDidMount() {
    /* Api.doFetch('TODO')
    .then(res => { */
    //})
    this.setState({ pastUserSymptoms: helper.preExisting() });
    //})
    //.catch(e => console.log(e))
  }

  handleSymptomSubmit = e => {
    e.preventDefault();
    let sym = {};
    sym.type='symptom';
    sym.symptom = e.target["user-symptom"].value;
    sym.severity = this.state.symptomSeverity;
    sym.time = this.state.symptomTime;
    sym.symptom = this.state.pastSymptomVal ? this.state.pastSymptomVal : sym.symptom;
    API.doFetch('/event', 'POST', sym).then(res=>{
      res.name = res.type;
      this.props.updateEvents(res);
      this.props.closeModal('addSymptomsModal');//this functions is passed in from dashboard to close the modal, it should be placed int the 'then' of api call to ensure it only runs in happy case 
     }).catch(e=>this.setState({error: e})); 
  };

  handleTimeChange = date => {
    this.setState({
      symptomTime: date
    });
  };

  handleSeverityChange = sev => {
    console.log(sev.target.value);
    this.setState({
      symptomSeverity: sev.target.value
    });
  };

  handleSymptomChange = sym => {
    this.setState({
      pastSymptomVal: sym.target.value
    });
  };

  addSymptomClick = e => {
    e.preventDefault();
    const symptomSelectIsHidden = this.state.symptomSelectIsHidden;
    this.setState({
      symptomSelectIsHidden: !symptomSelectIsHidden,
      symptomInputDisabled: true
    });
  };

  render() {
    let savedSymptoms = this.state.pastUserSymptoms.map((item, index) => {
      return (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      );
    });

    return (
      <section className="symptom-container">
        <form onSubmit={e => this.handleSymptomSubmit(e)}>
          <div id="user-input-container">
            <label htmlFor="user-symptom">Add New Symptom</label>
            <br />
            <input
              name="symptom"
              id="user-symptom"
              type="text"
              placeholder="bloated.."
              disabled={this.state.symptomSelectIsHidden}
            />
          </div>

          <div id="select">
            <button id="select-preexisting" className='user-button' onClick={e => this.addSymptomClick(e)}>
              Choose Saved Symptom
            </button>
            {this.state.symptomSelectIsHidden ? (
              <>
                <label htmlFor="symptom-select"></label>
                <select
                  id="symptom-select"
                  onChange={this.handleSymptomChange}
                  value={this.state.pastSymptomVal}
                >
                  {savedSymptoms}
                </select>{" "}
              </>
            ) : (
              <></>
            )}
          </div>

          <div id="date">
            <label htmlFor="date-select">When?</label>
            <DatePicker
              id="date-select"
              selected={this.state.symptomTime}
              onChange={this.handleTimeChange}
              showTimeSelect
              withPortal
              dateFormat="Pp"
            />
          </div>

          <div id="severity-radio">
            <p>Rate the Severity</p>
            <input
              type="range"
              step="1"
              min="1"
              max="5"
              onChange={e => this.handleSeverityChange(e)}
            />
          </div>

          <br />
          <button className="user-button" type="submit">
            Submit Symptom
          </button>
        </form>
      </section>
    );
  }
}

export default Symptom;
