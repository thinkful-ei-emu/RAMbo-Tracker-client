import React from 'react';
import Api from '../../services/api-service';
import PieChart from '../PieChart/PieChart';
import './Result.css';

export default class Result extends React.Component {
  state = {
    results: null,
    error: null
  };
  refreshResuls = () => {
    this.setState({error: null})
    Api.doFetch('/results')
    
      .then((res) => {
        this.setState({ results: res });
      })
      .catch(res=>
        this.setState({error: res.message}));
  };
  render() {
    let results = !this.state.results ? (
      <h2>Click Analyze to See Results</h2>
    ) : (
      this.state.results.map((item, key) => {
        let data = [];
        return (
          <li id="result-list" key={key}>
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
              data={data}
              title={item.symptomType.type}
              colors={[
                '#a8e0ff',
                '#8ee3f5',
                '#70cad1',
                '#3e517a',
                '#b08ea2',
                '#BBB6DF'
              ]}
            />
            </div>
            
          </li>
        );
      })
    );
    return (
      
      <div id="results">
        <h2>My Results</h2>
{this.state.error && <p class="error">There Was An Error!</p>}
        <ul>{results}</ul>
        
        <div id="results-button">
          <button onClick={e => this.refreshResuls(e)}>Analyze my Log</button>
        </div>
      </div>
    );
  }
}
