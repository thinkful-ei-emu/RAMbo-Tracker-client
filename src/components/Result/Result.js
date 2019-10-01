import React from "react";
import Api from "../../services/api-service";
import "./Result.css";

export default class Result extends React.Component {
  state = {
    results: [
      { symptomType: "", mostCommonFoods: [], mostCommonIngredients: [] }
    ]
  };
  refreshResults = () => {
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
          return (
            <li id="result-list" key={key}>
              <strong>{item.symptomType.type}</strong> <i>is experienced most frequently after eating foods with:</i>{" "}
              {item.mostCommonIngredients
                .filter((food) => {
                  return food.name !== "WATER" }).map((food) => {
                      
                    return food.name.toLowerCase();
                  
                  
                })
                .join(", ")}
            </li>
          );
        })
      );
    return (
      <div className="results">
        <ul>{results}</ul>
        <div id="results-button">
          <button onClick={e => this.refreshResults(e)}>Refresh Results</button>
        </div>
      </div>
    );
  }
}
