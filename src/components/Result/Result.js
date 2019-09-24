import React from "react";
import Api from "../../services/api-service";
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
          return (
            <li id="result-list" key={key}>
              <strong>{item.symptomType.type}</strong> <i>triggered by:</i>{" "}
              {item.mostCommonIngredients
                .map((food) => {
                  if (food.ingredient.name !== "WATER"){
                    return food.ingredient.name.toLowerCase();
                  }
                  
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
          <button onClick={e => this.refreshResuls(e)}>Refresh Results</button>
        </div>
      </div>
    );
  }
}
