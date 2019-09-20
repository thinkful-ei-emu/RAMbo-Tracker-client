import React from "react";
import API from "../../services/Api-service";
import Modal from "react-modal";
//components
import Symptoms from "../../components/Symptom/Symptom";
import Meal from "../MealRoute/MealRoute";
//css
import "./Dashboard.css";
//to be removed for final product
import helper from "../../services/helper.services";

export default class DashBoard extends React.Component {
  state = {
    addMealModal: false,
    addSymptomsModal: false,

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
      },
      {
        type: "",
        name: "",
        severity: 0,
        time: null
      }
    ],
    symptoms: []
  };
  componentDidMount() {
    /*  API.doFetch('events')
      .then(res=>) */
    let test = helper.getUserEvents();
    this.setState({
      user: { username: test.username, display_name: test.display_name },
      events: test.events
    });
  }

  closeModal = modal => {
    this.setState({ [modal]: false });
  };
  openModal = (e, modal) => {
    e.preventDefault();
    this.setState({ [modal]: true });
  };
  render() {
    let events = this.state.events.map((e, index) => {
      return (
        <div className="events-list">
        <li key={index} className={e.type === "meal" ? "meal" : "symptom"}>
          {e.name} at {e.time} | severity: {e.severity}
        </li>
        </div>
      );
    });
    return (
      <div className="user-dashboard">
        {/*add meal modal*/}
        <Modal
          isOpen={this.state.addMealModal}
          onRequestClose={e => this.closeModal("addMealModal")}
        >
          <Meal closeModal={this.closeModal} />
        </Modal>
        <Modal
          isOpen={this.state.addSymptomsModal}
          onRequestClose={() => this.closeModal("addSymptomsModal")}
        >
          <Symptoms closeModal={this.closeModal} />
        </Modal>
        <h3 id="user-welcome">Welcome back, {this.state.user.display_name}</h3>
        <div id="dash-button-container">
        <button
          className="user-button"
          onClick={e => this.openModal(e, "addMealModal")}
        >
          Add New Meal
        </button>
        <button
          className="user-button"
          onClick={e => this.openModal(e, "addSymptomsModal")}
        >
          Add New Symptoms
        </button>
        </div>
        <div className="events">{events}</div>
       
      </div>
    );
  }
}
