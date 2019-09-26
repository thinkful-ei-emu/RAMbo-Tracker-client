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
    console.log(this.state.results)
    let results =
      this.state.results[0].mostCommonFoods.length === 0 ? (
        <h2>Click Analyze to See Results</h2>
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
                  <h2>My Results</h2>

        <ul>{results}</ul>
        
        <div id="results-button">
          <button onClick={e => this.refreshResuls(e)}>Analyze my Log</button>
        </div>
      </div>
    );
  }
}
