import React from "react";
import "./MealRoute.css";
import DatePicker from "react-datepicker";
import AddFood from "../../components/AddFood/AddFood";
import FoodApiService from "../../services/food-api-service";
import MealApiService from "../../services/meal-api-service";
import ProcessFoodName from "../../services/process-food-name";
import ValidationError from "../../components/ValidationError/ValidationError";
import trashCan from '../../Media/trash-can.jpg'

import "react-datepicker/dist/react-datepicker.css";

export default class MealRoute extends React.Component {
  state = {
    mealName: "A Meal",
    mealTime: new Date(),
    foodsInMeal: [],

    handleAddFood: food => {
      FoodApiService.postFood(food.ndbno, food.name).then(res => {
        console.log(...this.state.foodsInMeal, food);
        this.setState({
          foodsInMeal: [...this.state.foodsInMeal, food]
        });
      });
    }
  };

  handleNameChange = mealName => {
    this.setState({
      mealName
    });
  };
  handleTimeChange = date => {
    this.setState({
      mealTime: date
    });
  };

  verify = () => {
    return this.verifyFoodNonempty() || this.verifyMealName();
  };

  verifyMealName = () => {
    if (this.state.mealName === "") return "Meal name can't be empty";
  };

  verifyFoodNonempty = () => {
    if (this.state.foodsInMeal.length === 0)
      return "Meal contents can't be empty";
  };

  handleRemoveFood = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    let foods = [...this.state.foodsInMeal];
    foods.splice(index, 1);
    this.setState({
      foodsInMeal: foods
    });
  };

  handleMealSubmit = e => {
    e.preventDefault();
    if (!this.verifyMealName() && !this.verifyFoodNonempty()) {
      /* console.log({
        time:this.state.mealTime,
        name:this.state.mealName,
        items: this.state.foodsInMeal.map(food=>food.ndbno)
      }); */
      let meal ={
        time:this.state.mealTime,
        name:this.state.mealName,
        items: this.state.foodsInMeal.map(food=>food.ndbno)
      };
      MealApiService.postMeal(meal)
        .then((res)=>{
          //this.props.history.push('/')
          meal.items= null;
          meal.type='meal';
          this.props.updateEvents(meal);
          this.props.closeModal('addMealModal');//this functions is passed in from dashboard to close the modal, it should be placed int the 'then' of api call to ensure it only runs in happy case 
        });
    }
  };

  render() {
    return (
      <div className="add-meal-div">
        <h2>Log a Meal</h2>
        <form className="add-meal-form" onSubmit={this.handleMealSubmit}>
          <label className="add-meal-labels" htmlFor="AddMealNameInput">Meal Name:</label>
          <br></br>
          <input
            type="text"
            onChange={e => this.handleNameChange(e.target.value)}
            id="AddMealNameInput"
            value={this.state.mealName}
          />
          <ValidationError message={this.verifyMealName()} />
          <br></br>
          <label className="add-meal-labels" htmlFor="AddMealTimeInput">Date and Time:</label>
          <DatePicker
            id='AddMealDateInput'
            selected={this.state.mealTime}
            onChange={this.handleTimeChange}
            showTimeSelect
            withPortal
            dateFormat="Pp"
          />
          <div className="AddMealFoodsDisplayContainer">
            <h3>Meal Contents</h3>
            <div className="AddMealFoodsDisplay">
              {this.state.foodsInMeal.map((food, index) => (
                <div key={index}>
                  <div className="AddMealFoodsDisplayRow">
                    <div className="AddMealFoodsDisplayName">
                      {ProcessFoodName(food.name)}
                    </div>
                    <div className="AddMealFoodsDisplaySpace"></div>
                    <button
                      className="user-button"
                      id="remove-food-button"
                      onClick={e => {
                        this.handleRemoveFood(e, index);
                      }}
                    >
                      <img
                        className="remove-trash-can"
                        src={trashCan}
                        alt="Remove food item"
                      />
                    </button>
                  </div>
                  <hr></hr>
                </div>
              ))}
            </div>
          </div>
          <AddFood addFood={this.state.handleAddFood} />
          <br></br>
          <ValidationError message={this.verifyFoodNonempty()} />
          <button
            disabled={this.verify() ? true : false}
            className="user-button"
            id="add-meal-button"
          >
            Add Meal
          </button>
         
        </form>
      </div>
    );
  }
}
