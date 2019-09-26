import React from "react";
import Api from "../../services/api-service";
import PieChart from '../PieChart/PieChart';
import "./Result.css";

export default class Result extends React.Component {
  state = {
    results: [
      { symptomType: "", mostCommonFoods: [], mostCommonIngredients: [] }
    ]
  };
  refreshResuls = () => {
    Api.doFetch("/results")
      .then(res => {
        this.setState({ results: res });
      })
      .catch(console.log);
  };
  render() {
    let results =
      this.state.results.length < 2 ? (
        <h2>Click refresh to see your analysis</h2>
      ) : (
        this.state.results.map((item, key) => {
          console.log(item);
          return (
            <li id="result-list" key={key}>
              <strong>{item.symptomType.type}</strong> is experienced most frequently after eating foods with:{" "}
              <i>{item.mostCommonIngredients
                .filter((food) => {
                  return food.name !== "WATER" }).map((food) => {
                      
                    return food.name.toLowerCase();
                  
                  
                })
                .join(", ")}</i>
                <PieChart
            data={item.mostCommonIngredients.map(ing => {
              return {
                label: ing.name,
                value: ing.weight
              }
            })}
            title={item.symptomType.type}
            colors={['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF']}
          />
            </li>
          );
        })
      );
    return (
      <div className="results">
        <ul>{results}</ul>
      
        <div id="results-button">
          <button onClick={e => this.refreshResuls(e)}>Refresh Results</button>
        </div>
      </div>
    );
  }
}
