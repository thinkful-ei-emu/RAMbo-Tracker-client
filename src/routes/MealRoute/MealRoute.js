import React from "react";
import "./MealRoute.css";
import DatePicker from "react-datepicker";
import AddFood from "../../components/AddFood/AddFood";
import API from "../../services/api-service";
import ProcessFoodName from "../../services/process-food-name";
import ValidationError from "../../components/ValidationError/ValidationError";
import trashCan from '../../Media/trash-can.jpg'

import "react-datepicker/dist/react-datepicker.css";

export default class MealRoute extends React.Component {
  state = {
    mealName: "A Meal",
    mealTime: new Date(),
    foodsInMeal: [],
    error: null,

    handleAddFood: food => {
      this.clearErrors()
      API.doFetch('/food', 'POST', {ndbno: food.fdcId}).then(res => {
        this.setState({
          foodsInMeal: [...this.state.foodsInMeal, food]
        });
      })
      .catch(res => 
        {this.setState({ error: res.error })});;
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
  clearErrors=()=>{
    this.setState({error: null})
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
    this.clearErrors()
    if (!this.verifyMealName() && !this.verifyFoodNonempty()) {
      let meal ={
        type: 'meal',
        time:this.state.mealTime,
        name:this.state.mealName,
        items: this.state.foodsInMeal.map(food=>food.fdcId)
      };
      API.doFetch('/event', 'POST', meal)
        .then((res)=>{
          //this.props.history.push('/')
          meal.items= null;
          meal.type='meal';
          this.props.updateEvents(res);
          this.props.closeModal('addMealModal');//this functions is passed in from dashboard to close the modal, it should be placed int the 'then' of api call to ensure it only runs in happy case 
        })
        .catch(res => this.setState({ error: res.error }));;
    }
  };

  render() {
    return (
      <div className="add-meal-div">
        <p className="exitButton" onClick={()=>this.props.closeModal('addMealModal')}>X</p>
        <h2>Log a Meal</h2>
        <form className="add-meal-form" onSubmit={this.handleMealSubmit}  onReset = {()=>this.props.closeModal('addMealModal')}>
          <label className="add-meal-labels" htmlFor="AddMealNameInput">Meal Name:</label>
          <br></br>
          <input
            type="text"
            maxLength="40"
            onChange={e => this.handleNameChange(e.target.value)}
            id="AddMealNameInput"
            value={this.state.mealName}
          />
          <ValidationError message={this.verifyMealName()} />
          <br/>
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
                    <div className="AddMealFoodsDisplayInfo">
                      <div className='AddMealFoodsDisplayManu'>
                        {food.brandOwner?
                            ProcessFoodName(food.brandOwner):
                            food.dataType
                        }
                      </div>
                      <div className="AddMealFoodsDisplayName">
                        {ProcessFoodName(food.description)}
                      </div>
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
                  <hr/>
                </div>
              ))}
            </div>
          </div>
          <AddFood addFood={this.state.handleAddFood} />
          <br/>
          <ValidationError message={this.verifyFoodNonempty()} />
          <div id='meal-form-btn-container'>
            <button id="back-button"  type="reset">Back</button>
          <button
            disabled={this.verify() ? true : false}
            className="user-button add-meal-button"
          >
            Add Meal
          </button>
          
          </div>
        </form>
      </div>
    );
  }
}
