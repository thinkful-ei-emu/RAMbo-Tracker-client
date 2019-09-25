import React from "react";
import API from "../../services/api-service";
import Modal from "react-modal";
//components
import Symptoms from "../../components/Symptom/Symptom";
import Meal from "../MealRoute/MealRoute";
//css
import "./Dashboard.css";
import Result from "../../components/Result/Result";
//to be removed for final product
//import helper from "../../services/helper.services";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");
export default class DashBoard extends React.Component {
  state = {
    addMealModal: false,
    addSymptomsModal: false,
    expanded:  false,
    itemExpanded : false,

    user: {
      username: "",
      display_name: ""
    },
    events: [
      {
        name: "",
        time: 2134234,
        type: "",
        items: [
          {
            name: "",
            ingredients: []
          },
          {
            name: "",
            ingredients: []
          }
        ]
      }
    ]
  };
  componentDidMount() {
    API.doFetch("/event")
      .then(res => {
        this.setState({
          user: { username: res.username, display_name: res.display_name },
          events: res.events
        });
      })
      .catch(e => this.setState({ error: e }));
  }

  handleExpandToggle = (index) => {
    if (this.state.expanded === index) {
      this.setState({
        expanded: false,
        itemExpanded: false
      })
    }
    else {
      this.setState({
        expanded: index,
        itemExpanded: false
      })
    }
  }

  handleIngredientsToggle = (index) => {
    if (this.state.itemExpanded === index) {
      this.setState({
        itemExpanded: false
      })
    }
    else {
      this.setState({
        itemExpanded: index
      })
    }
  }

  closeModal = modal => {
    this.setState({ [modal]: false });
  };
  openModal = (e, modal) => {
    e.preventDefault();
    this.setState({ [modal]: true });
  };
  updateEvents = e => {
    let temp = [e, ...this.state.events];
    temp.sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );
    this.setState({ events: temp });
  };
  formatDate = time => {
    let date = new Date(time);
    let formatted_date =
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      "-" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();
      return formatted_date
  };
  render() {
    let events = this.state.events.map((e, index) => {
      if (e.type === "meal") {
        return(
          <div key={index} id="dashmealcontainer">
          <li className={"meal"}>
            {e.name} at {new Date(e.time).toDateString()}
            <button className="expand-toggle" onClick={() => this.handleExpandToggle(index)}>{this.state.expanded === index ? '-' : '+'}</button>
            {this.state.expanded === index && <ul>{
              e.items.map((item, index)=> {
                return (
                  <li key={index} className="food-item-in-dash">
                    <p className="food-info-in-dash">{item.name}</p>
                    <p className="ingredients-list-in-dash">
                    {this.state.itemExpanded===index }{this.state.itemExpanded===index && item.ingredients.map(ingredient => ingredient.toLowerCase()).join(', ')}<button className="ingredients-expand" onClick={() => this.handleIngredientsToggle(index)}>{this.state.itemExpanded === index ? 'Hide ingredients' : 'Show ingredients'}</button>
                    </p>
                  </li>
                )
              })
            }</ul>}
            
          </li>
          </div>
        )
      }
      else {
        return (
        <li key={index} className="symptom">
          {e.name} at {this.formatDate(e.time)} {e.type ==="symptom" ? `Severity: ${e.severity}` : '' }
        </li>
      );
    }});
    return (
      <div>
        {/*add meal modal*/}
        <Modal
          isOpen={this.state.addMealModal}
          onRequestClose={e => this.closeModal("addMealModal")}
        >
          <Meal closeModal={this.closeModal} updateEvents={this.updateEvents} />
        </Modal>
        <Modal
          className="Modal"
          // overlayClassName="Overlay"
          isOpen={this.state.addSymptomsModal}
          onRequestClose={() => this.closeModal("addSymptomsModal")}
        >
          <Symptoms
            closeModal={this.closeModal}
            prevSymptoms={this.state.events.filter(e => e.type === "symptom")}
            updateEvents={this.updateEvents}
          />
        </Modal>
        <div id="user-welcome">
          {" "}
          <h3>Welcome back, {this.state.user.display_name}</h3>
        </div>
        <div className="dashboard-content">
          <Result />
          <div id="dash-button-container">
            <button
              className="user-button"
              onClick={e => this.openModal(e, "addMealModal")}
            >
              Log New Meal
            </button>
            <button
              className="user-button"
              onClick={e => this.openModal(e, "addSymptomsModal")}
            >
              Log New Symptoms
            </button>
          </div>
          <div className="events">
            <div className="events-list">{events}</div>
          </div>
        </div>
      </div>
    );
  }
}
