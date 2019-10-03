import React from 'react';
import API from '../../services/api-service';
import PieChart from '../PieChart/PieChart';
import './Result.css';
import pencil from '../../Media/pencil.png'

export default class Result extends React.Component {
  state = {
    results: null,
    error: null,
    selected: 0,
    onLastCheckBeforeDelete: false,
    isEditting: false,
    screenSize:0
  };
  clearErrors=()=>{
    this.setState({error: null})
  }
  
  refreshResults = () => {
    this.clearErrors();
    return API.doFetch('/results')
      .then((res) => {
        this.props.refreshDash();
        this.setState({
          results: res,
          onLastCheckBeforeDelete: false,
          isEditting: false
        });
      })
      .catch(res =>
        this.setState({
          error: res.message,
          onLastCheckBeforeDelete: false,
          isEditting: false
        }));
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.forceUpdate!==this.props.forceUpdate){
      this.refreshResults();
    }
  }
  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize)
  }
  resize=()=> {
    let currentscreenSize = (window.innerWidth >= 1000) ? (window.innerWidth >= 1400) ? 2 : 1 : 0;
    if (currentscreenSize !== this.state.screenSize) {
      this.setState({ screenSize: currentscreenSize });
    }
  }

  handleSelectedChange = (event) => {
    this.clearErrors();
    this.setState({
      selected: event.target.value,
      onLastCheckBeforeDelete: false,
      isEditting:false
    });
  }
  handleBeginDelete = () => {
    this.clearErrors();
    this.setState({
      onLastCheckBeforeDelete: true
    })
  }
  handleToggleEdit = () => {
    this.clearErrors();
    this.setState({
      isEditting: !this.state.isEditting
    })
  }
  handleEdit = (event, item) => {
    event.preventDefault();
    return API.doFetch('/symptom', 'PATCH', {
      id: item.symptomType.type_id,
      min_time: Number(item.symptomType.min_time.days)+' days '+Number(item.symptomType.min_time.hours)+' hours '+Number(item.symptomType.min_time.minutes)+' minutes',
      max_time: Number(item.symptomType.max_time.days)+' days '+Number(item.symptomType.max_time.hours)+' hours '+Number(item.symptomType.max_time.minutes)+' minutes',
    })
      .then(res => {
        return this.refreshResults();
      })
      .catch(res =>
        this.setState({
          error: res.error,
          onLastCheckBeforeDelete: false
        })
      );
  }
  handleResultDelete = (e, toBeDeleted, type_id) => {

    if (toBeDeleted) {
      return API.doFetch(`/symptom/${type_id}`, "DELETE")
        .then(() => {

          return this.refreshResults();

          /* const newResults = [...this.state.results];
          newResults.splice(this.state.selected, 1)
          this.setState({
            results: newResults,
            onLastCheckBeforeDelete: false,
            isEditting:false,
            selected: 0, */
        })
        .catch(res => this.setState({ error: res.message }));
    }
    else {
      this.setState({
        onLastCheckBeforeDelete: false,
        isEditting:false
      })
    }
  }
  handleTimeChange = (minOrMax, unit, event, item) => {
    item.symptomType[minOrMax + '_time'][unit] = (event.target.value);
    this.forceUpdate();
  }
  render() {
    let results = !this.state.results ? (
      <h2>Click Analyze to See Results</h2>
    ) : (
        this.state.results.map((item, key) => {
          let data = [];
          return (
            <div className="visual-list" id="result-list" key={key}>
              <form id='symptom-results-display-form'>
                Tracked Symptom:
              <select
                  id='symptom-results-display-select'
                  value={this.state.selected}
                  onChange={this.handleSelectedChange}
                >
                  {
                    this.state.results.map((item, key) => {
                      return (
                        <option value={key} key={key}>
                          {item.symptomType.type}
                        </option>
                      )
                    })
                  }
                </select>
                <div className='edit-user-symptom-setting-begin-div'>
                  <button
                    className='edit-user-symptom-begin-div'
                    type='button'
                    onClick={this.handleToggleEdit}
                  >
                    <img className='edit-user-symptom-begin-icon' alt='pencil icon for editting symptom' src={pencil} />
                  </button>
                  {
                    !this.state.onLastCheckBeforeDelete &&
                    <button
                      type="button"
                      className="delete-symptom-type"
                      onClick={this.handleBeginDelete}
                    >
                      <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
                    </button>
                  }

                </div>
              </form>
              {
                this.state.onLastCheckBeforeDelete &&
                <div id="last-check-before-delete-symptom">
                  <p>
                    Are you sure? <br/> Deleting this symptom here will delete all occurences of this symptom in your history.
                  </p>
                  <button
                    type="button"
                    className='results-symptom-yes-delete'
                    onClick={(e) => this.handleResultDelete(e, true, item.symptomType.type_id)}
                  >
                    Yes, Delete
                  </button>
                  <button
                    type="button"
                    className='results-symptom-do-not-delete'
                    onClick={(e) => this.handleResultDelete(e, false, item.symptomType.type_id)}
                  >
                    No
                  </button>
                </div>
              }
              {
                this.state.isEditting && 
                !this.state.onLastCheckBeforeDelete &&
                <form id="edit-user-symptom-form" onSubmit={e => this.handleEdit(e, item)}>
                    <h3>Meals-to-Symptom settings</h3>
                    <span>
                      Minimum Time Elapsed required between meal and symptom
                    </span>
                    <br></br>
                    <div className='edit-user-symptom-label-input-div'>
                      <label htmlFor='edit-user-symptom-min-days'
                        className='edit-user-symptom-minmax-label'>
                        Days:
                      </label>
                      <input type="number" min="0" step="1" pattern="\d+"id='edit-user-symptom-min-days' className='edit-user-symptom-minmax-input' value={item.symptomType.min_time.days} onChange={(e) => this.handleTimeChange('min', 'days', e, item)} />
                    </div> 
                    
                    <div className='edit-user-symptom-label-input-div'>
                    <label htmlFor='edit-user-symptom-min-hours'
                    className='edit-user-symptom-minmax-label'>
                      Hours:
                    </label>
                    <input type="number" min="0" step="1" pattern="\d+" id='edit-user-symptom-min-hours' value={item.symptomType.min_time.hours}   className='edit-user-symptom-minmax-input'onChange={(e) => this.handleTimeChange('min', 'hours', e, item)} />
                    </div> 

                    <div className='edit-user-symptom-label-input-div'>
                    <label htmlFor='edit-user-symptom-min-minutes' className='edit-user-symptom-minmax-label'>
                      Minutes:
                    </label>
                    <input type="number" min="0" step="1" pattern="\d+" id='edit-user-symptom-min-minutes' value={item.symptomType.min_time.minutes} className='edit-user-symptom-minmax-input' onChange={(e) => this.handleTimeChange('min', 'minutes', e, item)} />
                    </div>
                    <br></br>{/* 
                    <br></br> */}

                    <span>
                      Maximum Time Elapsed allowed between meal and symptom
                    </span>
                    <br></br>
                    <div className='edit-user-symptom-label-input-div'>
                    <label htmlFor='edit-user-symptom-max-days'
                    className='edit-user-symptom-minmax-label'>
                      Days:
                    </label>
                    <input type="number" min="0" step="1" pattern="\d+" id='edit-user-symptom-max-days' value={item.symptomType.max_time.days} onChange={(e) => this.handleTimeChange('max', 'days', e, item)} className='edit-user-symptom-minmax-input'/>
                    </div>
                    {/* <br></br> */}
                    <div className='edit-user-symptom-label-input-div'>
                    <label htmlFor='edit-user-symptom-max-hours'
                    className='edit-user-symptom-minmax-label'>
                      Hours:
                    </label>
                    <input type="number" min="0" step="1" pattern="\d+" id='edit-user-symptom-max-hours' value={item.symptomType.max_time.hours} onChange={(e) => this.handleTimeChange('max', 'hours', e, item)} className='edit-user-symptom-minmax-input' />
                    </div>
                    {/* <br></br> */}
                    <div className='edit-user-symptom-label-input-div'>
                    <label htmlFor='edit-user-symptom-max-minutes'
                    className='edit-user-symptom-minmax-label'>
                      Minutes:
                    </label>
                    <input type="number" min="0" step="1" pattern="\d+" id='edit-user-symptom-max-minutes' value={item.symptomType.max_time.minutes} onChange={(e) => this.handleTimeChange('max', 'minutes', e, item)} className='edit-user-symptom-minmax-input'/>
                    </div>

                    {/* <br></br> */}

                    <button className='user-button'>
                      Submit
                    </button>
                  </form>
              }
              
              <strong>{item.symptomType.type}</strong> is experienced most
            frequently after eating foods with:{' '}
              <i>
                {item.mostCommonIngredients
                  .filter((food) => {
                    return food.name !== 'WATER';
                  })
                  .map((food) => {
                    data.push({
                      label: food.name.toLowerCase(),
                      value: food.weight
                    })
                    return food.name.toLowerCase();
                  })
                  .join(', ')}
              </i>
              <div className='pie-area'>
                <PieChart
                  screenSize={this.state.screenSize}
                  data={data}
                  title={item.symptomType.type}
                  colors={[
                    '#8AD2D8',
                    '#C6A68E',
                    '#558AA4',
                    '#F15E3D',
                    '#56704B',
                    '#CC3B7C',
                    '#005594',
                    '#89B65A',
                    '#EBC9BE',
                    '#EFCBE',/* 
                    '#8AD2D8',
                    '#C6A68E',
                    '#558AA4', */
                    '#F15E3D',
                    '#56704B',
                    '#CC3B7C',
                    '#005594',
                    '#89B65A',
                    '#EBC9BE'
                  
                  ]}
                />
              </div>

            </div>
          );
        })
      );
    return (

      <div id="results">
        <h2>My Results</h2>
        {this.state.error && <p class="error">There Was An Error!</p>}
        { results.length===0?
          <div>
            No Results
          </div> :
          <div>
            {results[this.state.selected]}
          </div>

        }

        <div id="results-button">
          <button onClick={e => this.refreshResults(e)}>Refresh Results</button>
        </div>
      </div>
    );
  }
}
