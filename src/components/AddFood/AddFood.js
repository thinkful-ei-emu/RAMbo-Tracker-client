import React from 'react';
import API from '../../services/api-service'
import ProcessFoodName from '../../services/process-food-name'
import './AddFood.css';
import cart from '../../Media/cart.png'
export default class AddFood extends React.Component {
  state = {
    isInSearch:false,
    displaySearchResults: false,
    foodsFromSearch: {},
    searchTerm: '',
    brandTerm: '',
    lockedInSearchTerm:'',
    gotNoResults: true,
    resultsPerPage:50,
    page:1,
  }

  


  goFirstPage =()=>{
    API.doFetch(`/food/search?search=${this.state.lockedInSearchTerm}&pageNumber=${1}`)
    .then((res) => {
      res = JSON.parse(res);
      if (res) {
        return this.setState({
          foodsFromSearch: res,
          displaySearchResults: true,
          page:1
        })
      }
    })
  }

  goLastPage =()=>{
    //considered making lastPage a state variable, decided that I didn't want to think
    //through cases where this can go bad
    let lastPage=Math.ceil(this.state.foodsFromSearch.totalHits/this.state.resultsPerPage);
    API.doFetch(`/food/search?search=${this.state.lockedInSearchTerm}&pageNumber=${lastPage}`)
    .then((res) => {
      res = JSON.parse(res);
      if (res) {
        return this.setState({
          foodsFromSearch: res,
          displaySearchResults: true,
          page:lastPage
        })
      }
    })
  }

  goNextPage = ()=>{
    if(this.state.page!==Math.ceil(this.state.foodsFromSearch.totalHits/this.state.resultsPerPage)){
      API.doFetch(`/food/search?search=${this.state.lockedInSearchTerm}&pageNumber=${(this.state.page + 1)}`)
        .then((res) => {
          res = JSON.parse(res);
          console.log(res);
          if (res) {
            return this.setState({
              foodsFromSearch: res,
              displaySearchResults: true,
              page:this.state.page+1
            })
          }
        })
    }
    
  }

  goPrevPage = ()=>{
    if(this.state.page!==1){
      API.doFetch(`/food/search?search=${this.state.lockedInSearchTerm}&pageNumber=${(this.state.page - 1)}`)
        .then((res) => {
          res = JSON.parse(res);
          console.log(res);
          if (res) {
            return this.setState({
              foodsFromSearch: res,
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
  handleBrandChange = (brandTerm) => {
    this.setState({ brandTerm })
  }

  handleFoodSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(this.state.searchTerm){
      API.doFetch(`/food/search?search=${this.state.searchTerm}&brand=${this.state.brandTerm}`)
      .then((res) => {
        res = JSON.parse(res);
        if (res.foods) {
          return this.setState({
            foodsFromSearch: res,
            gotNoResults: res.foods.length===0? true:false,
            displaySearchResults: true,
            brandTerm: this.state.brandTerm,
            lockedInSearchTerm: this.state.searchTerm,
            page:1
          })
        }
        //If the usda server bugs out gives me back error
        else {
          return this.setState({
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
      foodsFromSearch:{},
      displaySearchResults:false,
      lockedInSearchTerm:'',
      page:1
    },
    ()=>this.props.addFood(food)
    );

  }


  render() {
    return (
      <div className='AddFoodDiv'>
        
          <label htmlFor='searchTermInput'>Search for a food:</label><br></br>
          <div className='SearchFoodForm'>
          <input
            type='text'
            onChange={(e) => this.handleSearchChange(e.target.value)}
            onKeyPress={this.keyPressed}
            id='searchTermInput'
            value={this.state.searchTerm}
            form='sub-form'
            placeholder='food name'
          />
          <input
            type='text'
            onChange={(e) => this.handleBrandChange(e.target.value)}
            onKeyPress={this.keyPressed}
            id='brandTermInput'
            value={this.state.brandTerm}
            form='sub-form'
            placeholder='brand'
          />
          <button className="user-button" id="search-food-button"
            form='sub-form' htmlFor='searchTermInput' 
            onClick={this.handleFoodSubmit}>
            Search for Food
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
                Only at most {this.state.resultsPerPage} items shown at once, total of {this.state.foodsFromSearch.totalHits}
              </div>
              
              <hr></hr>
              {
                this.state.foodsFromSearch.foods.map((food, index) =>
                  <div key={index} className='AddFoodSearchResultsDiv'>
                    <div className='AddFoodSearchResultsRow'>
                      <div className='AddFoodSearchResultsFoodInfo'>
                        <div className='AddFoodSearchResultsManu'>
                          {
                            food.brandOwner?
                            ProcessFoodName(food.brandOwner):
                            food.dataType
                          }
                        </div>
                        <div className='AddFoodSearchResultsName'>
                          {ProcessFoodName(food.description)}
                        </div>
                      </div>
                      <div className='AddFoodSearchResultsSpace'>
                      </div>
                      <button id='add-food-button' className='user-button' onClick={e => { this.handleAddFood(e,food) }} >
                       <img id='add-food-logo'src={cart} alt=''/> Add Food
                      </button>
                    </div>
                    <hr></hr>
                  </div>
                )
              }
              <div className='AddFoodSearchResultsPaginate'>
                {this.state.page !== 1 && <button form='sub-form2' id="back" onClick={this.goPrevPage}>Back</button>}
                <span>{this.state.foodsFromSearch.currentPage}</span>
                <button form='sub-form3' id="next" onClick={this.goNextPage}>Next</button>
              </div>

            </div>)
          )
        }

      </div>
    )
  }
}