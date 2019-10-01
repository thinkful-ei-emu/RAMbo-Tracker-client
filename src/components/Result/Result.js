import React from 'react';
import Api from '../../services/api-service';
import PieChart from '../PieChart/PieChart';
import './Result.css';

export default class Result extends React.Component {
  state = {
    results: null,
    error: null
  };
  refreshResults = () => {
    Api.doFetch("/results")
      .then(res => {
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
          <li className="visual-list" id="result-list" key={key}>
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
                '#FF810D',
                '#03FF2B',
                '#0C87E8',
                '#AE00FF',
                '#E83B0C',
                '#FFCE0D',
                '#E80CA0',
                '#0116FF',
                '#0CE8A0',
                '#CAFF03'

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
          <button onClick={e => this.refreshResults(e)}>Refresh Results</button>
        </div>
      </div>
    );
  }
}
