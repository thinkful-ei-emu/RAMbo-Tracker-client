import React from 'react';
import FoodApiService from '../../services/food-api-service'
import ProcessFoodName from '../../services/process-food-name'
import './AddFood.css';

export default class AddFood extends React.Component {
  state = {
    isInSearch:false,
    displaySearchResults: false,
    foodsFromSearch: [],
    searchTerm: '',
    gotNoResults: true,
  }
  handleSearchChange = (searchTerm) => {
    this.setState({ searchTerm })
  }

  handleFoodSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(this.state.searchTerm){
      FoodApiService.getFoods(this.state.searchTerm)
      .then((res) => {
        res = JSON.parse(res);

        console.log(res['list']);
        if (res['list']) {
          this.setState({
            foodsFromSearch: res['list'],
            gotNoResults: false,
            displaySearchResults: true,
          })
        }
        else {
          this.setState({
            gotNoResults: true,
            displaySearchResults: true,
          })
        }
      })
    }
    
  }

  handleAddFood=(e,food)=>{
    e.preventDefault();
    this.setState({displaySearchResults:false},()=>this.props.addFood(food));

  }

  //Removing some UPC and GTIN, could put it back in
  processFoodName = (name) => {
    let arr = name.split(',');
    if (arr[arr.length - 1].includes('UPC: ') || arr[arr.length - 1].includes('GTIN: '))
      arr.pop();
    return arr.join(',')
  }

  render() {
    return (
      <div className='AddFoodDiv'>
        <div className='SearchFoodForm'>
          <input
            type='text'
            onChange={(e) => this.handleSearchChange(e.target.value)}
            id='searchTermInput'
            value={this.state.searchTerm}
          />
          <button onClick={this.handleFoodSubmit}>Search for food</button>
        </div>

        {
          this.state.displaySearchResults &&
          (this.state.gotNoResults ?
            (<div>
              No results found, try again or fix the search term
            </div>)
            :
            (<div className='AddFoodSearchResults'>
              <div>
                Only the first 25 items shown, total of {this.state.foodsFromSearch.total}
              </div>
              <hr></hr>
              {
                this.state.foodsFromSearch.item.map((food, index) =>
                  <div key={index} className='AddFoodSearchResultsDiv'>
                    <div className='AddFoodSearchResultsRow'>
                      <div className='AddFoodSearchResultsName'>
                        {ProcessFoodName(food.name)}
                      </div>
                      <div className='AddFoodSearchResultsSpace'>
                      </div>
                      <button onClick={e => { this.handleAddFood(e,food) }} className='AddFoodSearchResultsAddButton'>
                        Add Food
                      </button>
                    </div>
                    <hr></hr>
                  </div>
                )

              }
            </div>)
          )
        }

      </div>
    )
  }
}