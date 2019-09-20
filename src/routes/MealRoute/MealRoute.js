import React from 'react';
import './MealRoute.css';
import DatePicker from "react-datepicker";
import AddFood from '../../components/AddFood/AddFood';
import FoodApiService from '../../services/food-api-service';
import MealApiService from '../../services/meal-api-service';
import ProcessFoodName from '../../services/process-food-name';
import ValidationError from '../../components/ValidationError/ValidationError';
 
import "react-datepicker/dist/react-datepicker.css";

export default class MealRoute extends React.Component{
  state={
    mealName:'A Meal',
    mealTime:new Date(),
    foodsInMeal:[],
    
    handleAddFood:(food)=>{
      FoodApiService.postFood(food.ndbno,food.name)
        .then(res=>{
          console.log(...this.state.foodsInMeal,food);
          this.setState({
            foodsInMeal:[...this.state.foodsInMeal,food]
          });
      })
    }
  }

  handleNameChange = mealName=>{
    this.setState({
      mealName
    });
  }
  handleTimeChange = date => {
    console.log(this.state.mealTime);
    console.log(typeof this.state.mealTime);
    this.setState({
      mealTime: date
    });
  }

  verify= () =>{
    return this.verifyFoodNonempty() || this.verifyMealName();
  }

  verifyMealName= ()=>{
    if(this.state.mealName==='')
      return 'Meal name can\'t be empty';
  }

  verifyFoodNonempty=() =>{
    if(this.state.foodsInMeal.length===0)
      return 'Meal contents can\'t be empty';
  }

  handleRemoveFood=(e,index)=>{
    e.preventDefault();
    e.stopPropagation();
    let foods=[...this.state.foodsInMeal];
    foods.splice(index,1);
    this.setState({
      foodsInMeal:foods
    })
  }

  handleMealSubmit= (e)=>{
    e.preventDefault();
    if( !(this.verifyMealName()) && !(this.verifyFoodNonempty()) ){
      /* console.log({
        time:this.state.mealTime,
        name:this.state.mealName,
        items: this.state.foodsInMeal.map(food=>food.ndbno)
      }); */
      MealApiService.postMeal({
        time:this.state.mealTime,
        name:this.state.mealName,
        items: this.state.foodsInMeal.map(food=>food.ndbno)
      })
        .then(()=>{
          //this.props.history.push('/')
          this.props.closeModal('addMealModal');//this functions is passed in from dashboard to close the modal, it should be placed int the 'then' of api call to ensure it only runs in happy case 
        });
    }
  }
  
  render(){
    return (
      <div className='add-meal-div'>
        <h2>Add a Meal!</h2>
        <form className='add-meal-form' onSubmit={this.handleMealSubmit}>
          <label htmlFor='AddMealNameInput'>
            Meal Name:
          </label>
          <br></br>
          <input 
            type='text' 
            onChange={(e)=>this.handleNameChange(e.target.value)} 
            id='AddMealNameInput'
            value={this.state.mealName}
          />
          <ValidationError message={this.verifyMealName()} />
          <br></br>
          <label htmlFor='AddMealTimeInput'>
            Date:
          </label>
          <DatePicker
            selected={this.state.mealTime}
            onChange={this.handleTimeChange}
            showTimeSelect
            withPortal
            dateFormat="Pp"
          />
          <div className='AddMealFoodsDisplayContainer'>
            <h3>Meal Contents</h3>
            <div className='AddMealFoodsDisplay'>
              {
                this.state.foodsInMeal.map((food,index)=>
                <div key={index}>

                  <div  className='AddMealFoodsDisplayRow'>
                    <div className='AddMealFoodsDisplayName'>
                      {ProcessFoodName(food.name)}
                    </div>
                    <div className='AddMealFoodsDisplaySpace'>
                    </div>
                    <button className="user-button" onClick={e => { this.handleRemoveFood(e,index) }}>
                      Remove
                    </button>
                  </div>
                  <hr></hr>
                </div>
                )
              }
            </div>
          </div>


          <AddFood addFood={this.state.handleAddFood}/>

          <br></br>


          <button disabled={this.verify()? true:false} className='user-button'>
            Add Meal
          </button>
          <ValidationError message={this.verifyFoodNonempty()} />
        </form>
      </div>
    );
  }
}