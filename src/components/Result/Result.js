import React from 'react';
import API from '../../services/api-service';
import PieChart from '../PieChart/PieChart';
import './Result.css';
import pencil from '../../Media/pencil.png';

export default class Result extends React.Component {
  state = {
    results: null,
    error: null,
    selected: 0,
    onLastCheckBeforeDelete: false,
    isEditting: false,
    screenSize: 0,
    tempMinTimeObj: { days: 0, hours: 0, minutes: 0 },
    tempMaxTimeObj: { days: 0, hours: 0, minutes: 0 }
  };
  clearErrors = () => {
    this.setState({ error: null });
  };

  refreshResults = (selectedReset = false) => {
    this.clearErrors();
    return API.doFetch('/results')
      .then((res) => {
        this.props.refreshDash();
        this.setState({
          results: res,
          onLastCheckBeforeDelete: false,
          isEditting: false,
          selected: selectedReset ? 0 : this.state.selected
        });
      })
      .catch((res) =>
        this.setState({
          error: res.error,
          onLastCheckBeforeDelete: false,
          isEditting: false,
          selected: 0
        })
      );
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.forceUpdate !== this.props.forceUpdate) {
      this.refreshResults();
    }
  }
  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }
  resize = () => {
    let currentscreenSize =
      window.innerWidth >= 1000 ? (window.innerWidth >= 1400 ? 2 : 1) : 0;
    if (currentscreenSize !== this.state.screenSize) {
      this.setState({ screenSize: currentscreenSize });
    }
  };

  handleSelectedChange = (event) => {
    this.clearErrors();
    this.setState({
      selected: event.target.value,
      onLastCheckBeforeDelete: false,
      isEditting: false
    });
  };
  handleBeginDelete = () => {
    this.clearErrors();
    this.setState({
      onLastCheckBeforeDelete: true
    });
  };
  handleToggleEdit = () => {
    this.clearErrors();
    this.setState({
      isEditting: !this.state.isEditting,
      tempMaxTimeObj: this.state.results[this.state.selected].symptomType
        .max_time,
      tempMinTimeObj: this.state.results[this.state.selected].symptomType
        .min_time
    });
  };
  handleEdit = (event, item) => {
    event.preventDefault();
    let minTime =
      Number(this.state.tempMinTimeObj.days) +
      ' days ' +
      Number(this.state.tempMinTimeObj.hours) +
      ' hours ' +
      Number(this.state.tempMinTimeObj.minutes) +
      ' minutes';

    let maxTime =
      Number(this.state.tempMaxTimeObj.days) +
      ' days ' +
      Number(this.state.tempMaxTimeObj.hours) +
      ' hours ' +
      Number(this.state.tempMaxTimeObj.minutes) +
      ' minutes';

    console.log('min being submitted:', minTime);
    console.log('max being submitted:', maxTime);

    return API.doFetch('/symptom', 'PATCH', {
      id: item.symptomType.type_id,
      min_time: minTime,
      max_time: maxTime
    })
      .then((res) => {
        return this.refreshResults();
      })
      .catch((res) =>
        this.setState({
          error: res.error,
          onLastCheckBeforeDelete: false
        })
      );
  };
  handleResultDelete = (e, toBeDeleted, type_id) => {
    if (toBeDeleted) {
      return API.doFetch(`/symptom/${type_id}`, 'DELETE')
        .then(() => {
          return this.refreshResults(true);

          /* const newResults = [...this.state.results];
          newResults.splice(this.state.selected, 1)
          this.setState({
            results: newResults,
            onLastCheckBeforeDelete: false,
            isEditting:false,
            selected: 0, */
        })
        .catch((res) => this.setState({ error: res.error }));
    } else {
      this.setState({
        onLastCheckBeforeDelete: false,
        isEditting: false
      });
    }
  };
  handleTimeChange = (minOrMax, unit, event, item) => {
    /* item.symptomType[minOrMax + '_time'][unit] = (event.target.value);
    this.forceUpdate(); */
    let key = 'temp' + minOrMax + 'TimeObj';
    this.setState({
      [key]: {
        ...this.state[key],
        [unit]: event.target.value
      }
    });
  };
  render() {
    let results = !this.state.results ? (
      <h2>Click Analyze to See Results</h2>
    ) : (
      this.state.results.map((item, key) => {
        let data = [];
        return (
          <div className="visual-list" id="result-list" key={key}>
            <form id="symptom-results-display-form">
              Tracked Symptom:
              <select
                id="symptom-results-display-select"
                value={this.state.selected}
                onChange={this.handleSelectedChange}
              >
                {this.state.results.map((item, key) => {
                  return (
                    <option value={key} key={key}>
                      {item.symptomType.type}
                    </option>
                  );
                })}
              </select>
              <div className="edit-user-symptom-setting-begin-div">
                <button
                  className="edit-user-symptom-begin-div"
                  type="button"
                  onClick={this.handleToggleEdit}
                >
                  <img
                    className="edit-user-symptom-begin-icon"
                    alt="pencil icon for editting symptom"
                    src={pencil}
                  />
                </button>
                {!this.state.onLastCheckBeforeDelete && (
                  <button
                    type="button"
                    className="delete-symptom-type"
                    onClick={this.handleBeginDelete}
                  >
                    <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
                  </button>
                )}
              </div>
            </form>
            {this.state.onLastCheckBeforeDelete && (
              <div id="last-check-before-delete-symptom">
                <p>
                  Are you sure? <br /> Deleting this symptom here will delete
                  all occurences of this symptom in your history.
                </p>
                <button
                  type="button"
                  className="results-symptom-yes-delete"
                  onClick={(e) =>
                    this.handleResultDelete(e, true, item.symptomType.type_id)
                  }
                >
                  Yes, Delete
                </button>
                <button
                  type="button"
                  className="results-symptom-do-not-delete"
                  onClick={(e) =>
                    this.handleResultDelete(e, false, item.symptomType.type_id)
                  }
                >
                  No
                </button>
              </div>
            )}
            {this.state.isEditting && !this.state.onLastCheckBeforeDelete && (
              <form
                id="edit-user-symptom-form"
                onSubmit={(e) => this.handleEdit(e, item)}
              >
                <h3>Meals-to-Symptom settings</h3>
                <span>Minimum time required between meal and symptom</span>
                <br></br>
                <div className="edit-user-symptom-label-input-div">
                  <label
                    htmlFor="edit-user-symptom-min-days"
                    className="edit-user-symptom-minmax-label"
                  >
                    Days:
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    pattern="\d+"
                    id="edit-user-symptom-min-days"
                    className="edit-user-symptom-minmax-input"
                    value={this.state.tempMinTimeObj.days}
                    onChange={(e) =>
                      this.handleTimeChange('Min', 'days', e, item)
                    }
                  />
                </div>

                <div className="edit-user-symptom-label-input-div">
                  <label
                    htmlFor="edit-user-symptom-min-hours"
                    className="edit-user-symptom-minmax-label"
                  >
                    Hours:
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    pattern="\d+"
                    id="edit-user-symptom-min-hours"
                    value={this.state.tempMinTimeObj.hours}
                    className="edit-user-symptom-minmax-input"
                    onChange={(e) =>
                      this.handleTimeChange('Min', 'hours', e, item)
                    }
                  />
                </div>

                <div className="edit-user-symptom-label-input-div">
                  <label
                    htmlFor="edit-user-symptom-min-minutes"
                    className="edit-user-symptom-minmax-label"
                  >
                    Minutes:
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    pattern="\d+"
                    id="edit-user-symptom-min-minutes"
                    value={this.state.tempMinTimeObj.minutes}
                    className="edit-user-symptom-minmax-input"
                    onChange={(e) =>
                      this.handleTimeChange('Min', 'minutes', e, item)
                    }
                  />
                </div>
                <br></br>
                {/* 
                    <br></br> */}

                <span>Maximum time allowed between meal and symptom</span>
                <br></br>
                <div className="edit-user-symptom-label-input-div">
                  <label
                    htmlFor="edit-user-symptom-max-days"
                    className="edit-user-symptom-minmax-label"
                  >
                    Days:
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    pattern="\d+"
                    id="edit-user-symptom-max-days"
                    value={this.state.tempMaxTimeObj.days}
                    onChange={(e) =>
                      this.handleTimeChange('Max', 'days', e, item)
                    }
                    className="edit-user-symptom-minmax-input"
                  />
                </div>
                {/* <br></br> */}
                <div className="edit-user-symptom-label-input-div">
                  <label
                    htmlFor="edit-user-symptom-max-hours"
                    className="edit-user-symptom-minmax-label"
                  >
                    Hours:
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    pattern="\d+"
                    id="edit-user-symptom-max-hours"
                    value={this.state.tempMaxTimeObj.hours}
                    onChange={(e) =>
                      this.handleTimeChange('Max', 'hours', e, item)
                    }
                    className="edit-user-symptom-minmax-input"
                  />
                </div>
                {/* <br></br> */}
                <div className="edit-user-symptom-label-input-div">
                  <label
                    htmlFor="edit-user-symptom-max-minutes"
                    className="edit-user-symptom-minmax-label"
                  >
                    Minutes:
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    pattern="\d+"
                    id="edit-user-symptom-max-minutes"
                    value={this.state.tempMaxTimeObj.minutes}
                    onChange={(e) =>
                      this.handleTimeChange('Max', 'minutes', e, item)
                    }
                    className="edit-user-symptom-minmax-input"
                  />
                </div>

                {/* <br></br> */}

                <button className="user-button">Submit</button>
                <button
                  className="user-button"
                  type="reset"
                  onClick={this.handleToggleEdit}
                >
                  Cancel
                </button>
              </form>
            )}
            {item.mostCommonIngredients.length > 0 ? (
              <div>
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
                      });
                      return food.name.toLowerCase();
                    })
                    .join(', ')}
                </i>
                <div className="pie-area">
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
                      '#EFCBE' /* 
                    '#8AD2D8',
                    '#C6A68E',
                    '#558AA4', */,
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
            ) : (
              <div>
                Sorry, there's not enough data to give you any results yet. Keep
                logging! You may also click the pencil icon the edit the time
                span with which we track meals related to symptoms.
              </div>
            )}
          </div>
        );
      })
    );
    return (
      <div id="results">
        <h2>My Results</h2>
        {this.state.error && <p class="error">There Was An Error!</p>}
        {results.length === 0 ? (
          <div>No Results</div>
        ) : (
          <div>{results[this.state.selected]}</div>
        )}

        <div id="results-button">
          <button onClick={(e) => this.refreshResults(e)}>
            Refresh Results
          </button>
        </div>
      </div>
    );
  }
}
