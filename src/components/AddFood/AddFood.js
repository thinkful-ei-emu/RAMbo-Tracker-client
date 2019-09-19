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
    lockedInSearchTerm:'',
    gotNoResults: true,
    resultsPerPage:25,
    page:1,
  }

  


  goFirstPage =()=>{
    FoodApiService.getFoods(this.state.lockedInSearchTerm,1)
    .then((res) => {
      res = JSON.parse(res);
      if (res['list']) {
        this.setState({
          foodsFromSearch: res['list'],
          displaySearchResults: true,
          page:1
        })
      }
    })
  }

  goLastPage =()=>{
    //considered making lastPage a state variable, decided that I didn't want to think
    //through cases where this can go bad
    let lastPage=Math.ceil(this.state.foodsFromSearch.total/this.state.resultsPerPage);
    FoodApiService.getFoods(this.state.lockedInSearchTerm,lastPage)
    .then((res) => {
      res = JSON.parse(res);
      if (res['list']) {
        this.setState({
          foodsFromSearch: res['list'],
          displaySearchResults: true,
          page:lastPage
        })
      }
    })
  }

  goNextPage = ()=>{
    if(this.state.page!==Math.ceil(this.state.foodsFromSearch.total/this.state.resultsPerPage)){
      FoodApiService.getFoods(this.state.lockedInSearchTerm,this.state.page+1)
        .then((res) => {
          res = JSON.parse(res);
          if (res['list']) {
            this.setState({
              foodsFromSearch: res['list'],
              displaySearchResults: true,
              page:this.state.page+1
            })
          }
        })
    }
    
  }

  goPrevPage = ()=>{
    if(this.state.page!==1){
      FoodApiService.getFoods(this.state.lockedInSearchTerm,this.state.page-1)
        .then((res) => {
          res = JSON.parse(res);
          if (res['list']) {
            this.setState({
              foodsFromSearch: res['list'],
              displaySearchResults: true,
              page:this.state.page-1
            })
          }
        })
    }
    
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
            lockedInSearchTerm: this.state.searchTerm,
            page:1
          })
        }
        //If the usda server bugs out gives me back error
        else {
          this.setState({
            gotNoResults: true,
            displaySearchResults: true,
            lockedInSearchTerm:'',
            page:1
          })
        }
      })
    }
    
  }
  keyPressed=(event)=> {
    if (event.key === "Enter") {
      this.handleFoodSubmit(event);
    }
  }

  handleAddFood=(e,food)=>{
    e.preventDefault();
    this.setState({
      displaySearchResults:false,
      lockedInSearchTerm:'',
      page:1
    },
    ()=>this.props.addFood(food)
    );

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
            onKeyPress={this.keyPressed}
            id='searchTermInput'
            value={this.state.searchTerm}
            form='sub-form'
          />
          <button 
            form='sub-form' htmlFor='searchTermInput' 
            onClick={this.handleFoodSubmit}>
            Search for food
          </button>
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
                Only the first {this.state.foodsFromSearch.item.length} items shown, total of {this.state.foodsFromSearch.total}
              </div>
              <hr></hr>
              {
                this.state.foodsFromSearch.item.map((food, index) =>
                  <div key={index} className='AddFoodSearchResultsDiv'>
                    <div className='AddFoodSearchResultsRow'>
                      <div className='AddFoodSearchResultsFoodInfo'>
                        <div className='AddFoodSearchResultsManu'>
                          {ProcessFoodName(food.manu)}
                        </div>
                        <div className='AddFoodSearchResultsName'>
                          {ProcessFoodName(food.name)}
                        </div>
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
              <div className='AddFoodSearchResultsPaginate'>
              </div>

            </div>)
          )
        }

      </div>
    )
  }
}