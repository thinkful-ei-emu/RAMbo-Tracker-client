import React, { Component } from "react";
import API from '../../services/api-service';
import DatePicker from "react-datepicker";
import helper from "../../services/helper.services";
import "react-datepicker/dist/react-datepicker.css";
import "./Symptom.css";
import face1 from '../../Media/wellness_face_1.png'
import face2 from '../../Media/wellness_face_2.png'
import face3 from '../../Media/wellness_face_3.png'
import face4 from '../../Media/wellness_face_4.png'
import face5 from '../../Media/wellness_face_5.png'


let symptomName = document.getElementById('user-symptom')
class Symptom extends Component {
  state = {
    symptomName: "",
    symptomSeverity: 4,
    symptomTime: new Date(),
    pastUserSymptoms: [],
    pastSymptomVal: "",
    symptomSelectIsHidden: false,
    symptomInputDisabled: false,
    error: null
  };

  componentDidMount() {
    this.setState({error: null})
    /* Api.doFetch('TODO')
    .then(res => { */
    //})
    this.setState({ pastUserSymptoms: helper.preExisting() });
    //})
    //.catch(e => console.log(e))

    //set colors
    let radioButtons = document.getElementById('symptom-form')['radio-face']
    radioButtons[0].parentElement.style.backgroundColor = 'rgba(255,255,0,0)';
    radioButtons[1].parentElement.style.backgroundColor = 'rgba(255,215,0,0)';
    radioButtons[2].parentElement.style.backgroundColor = 'rgba(255,165,0,0)';
    radioButtons[3].parentElement.style.backgroundColor = 'rgba(255,69,0,0)';
    radioButtons[4].parentElement.style.backgroundColor = 'rgba(255,0,0,0)';
  }


  handleSymptomSubmit = e => {
    e.preventDefault();
    this.setState({error: null})

    let sym = {};
    sym.type='symptom';
    sym.symptom = symptomName.value;
    sym.severity = this.state.symptomSeverity;
    sym.time = this.state.symptomTime;
    sym.symptom = this.state.pastSymptomVal ? this.state.pastSymptomVal : sym.symptom;
    API.doFetch('/event','POST',sym).then(res=>{
      /* res.name = res.type; */
      console.log(res);
      this.props.updateEvents(res);
      this.props.closeModal('addSymptomsModal');//this functions is passed in from dashboard to close the modal, it should be placed int the 'then' of api call to ensure it only runs in happy case 
     }).catch((res)=> {
/*      console.log(res)
 */     this.setState({error: res.error})}); 
  };

  handleTimeChange = date => {
    this.setState({
      symptomTime: date
    });
  };

  handleSeverityChange = sev => {
    console.log(sev.target);
    let radioButtons = document.getElementById('symptom-form')['radio-face'];
    radioButtons.forEach(radio => {
      if(radio.value <= radioButtons.value)
      {
        let color = radio.parentElement.style.backgroundColor;
        let values = color.split(',');
        values[3] = '0.99)';
        color = values.join(',');
        radio.parentElement.style.backgroundColor = color;
        //that button should be lit up
      }else{
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
      <div className="symptom-container">
      <section className="symptom-container">
        <h2>Log a Symptom</h2>
        <form id='symptom-form' 
          onSubmit={e => this.handleSymptomSubmit(e)}
          onReset = {()=>this.props.closeModal('addSymptomsModal')}>
          <div id="user-input-container">
            <label htmlFor="user-symptom">Add New Symptom</label>
            <br />
            <datalist id="past-symptoms">
              {this.state.pastUserSymptoms.map((sym,i)=><option key = {i} value={sym.label}/>)}
            </datalist>
            <input
              name="symptom"
              onFocus = {(e)=>symptomName = e.target}
              id="user-symptom"
              type="text"
              placeholder="bloated.."
              list= "past-symptoms"
              disabled={this.state.symptomSelectIsHidden}
            />
            <p id="auto-complete"></p>
          </div>
    {this.props.prevSymptoms.map((s,i)=>{
    if(i > 4)//limits to 5
      return null;
    return <input type="button" onFocus={(e)=>symptomName = e.target} name="pastSymptoms" value={s.name}/>
    })
    }

          {/* 
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
            )} */}

          <div id="date">
            <label htmlFor="date-select">Date and Time:</label>
            <DatePicker
              id="date-select"
              selected={this.state.symptomTime}
              onChange={this.handleTimeChange}
              showTimeSelect
              withPortal
              dateFormat="Pp"
            />
          </div>

          <label 
              id='radio-label'
              htmlFor='radio'>
              Rate the Severity
            </label>
            <br/>
          <div className='radio-container'>

              <div className='radio-buttons-1'>
                  <input className='radio-input' name='radio-face' id='radio-1' type='radio' value='1' 
                    checked={this.state.symptomSeverity === '1'}
                    onChange={e => this.handleSeverityChange(e)} />
                  <label htmlFor='radio-1' ><img className='face' src={face1} alt='face1'/></label>
              </div>

              <div className='radio-buttons-2'>
                  <input className='radio-input' name='radio-face' id='radio-2' type='radio' value='2'
                    checked={this.state.symptomSeverity === '2'}
                    onChange={e => this.handleSeverityChange(e)} />
                  <label htmlFor='radio-2' ><img className='face' src={face2} alt='face1'/></label>
              </div>

              <div className='radio-buttons-3'>    
                  <input className='radio-input' name='radio-face' id='radio-3' type='radio' value='3'
                    checked={this.state.symptomSeverity === '3'}
                    onChange={e => this.handleSeverityChange(e)} />
                  <label htmlFor='radio-3' ><img className='face' src={face3} alt='face1'/></label>
              </div>

              <div className='radio-buttons-4'>
                  <input className='radio-input' name='radio-face' id='radio-4' type='radio' value='4'
                    checked={this.state.symptomSeverity === '4'}
                    onChange={e => this.handleSeverityChange(e)} />
                    <label htmlFor='radio-4' ><img className='face' src={face4} alt='face1'/></label>
              </div>

              <div className='radio-buttons-5'>
                  <input className='radio-input' name='radio-face' id='radio-5' type='radio' value='5'
                    checked={this.state.symptomSeverity === '5'}
                    onChange={e => this.handleSeverityChange(e)} />
                  <label htmlFor='radio-5' ><img className='face' src={face5} alt='face1'/></label>
              </div>
        
          </div>
          

          <br />
          {this.state.error && <p className='symptom-error'>{this.state.error}</p>}
          <div id='submit-button'>
            <button className="user-button" type="submit">
              Submit Symptom
            </button>
            <button className="user-button" type="reset">Cancel</button>
          </div>
        </form>
      </section>
      </div>
    );
  }
}

export default Symptom;
