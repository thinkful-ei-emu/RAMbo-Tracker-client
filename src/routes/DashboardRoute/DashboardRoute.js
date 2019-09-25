import React from "react";
import API from "../../services/api-service";
import Modal from "react-modal";
//components
import Symptoms from "../../components/Symptom/Symptom";
import Meal from "../MealRoute/MealRoute";
//css
import "./Dashboard.css";
import Result from '../../components/Result/Result';
//to be removed for final product
//import helper from "../../services/helper.services";

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');
export default class DashBoard extends React.Component {
  state = {
    addMealModal: false,
    addSymptomsModal: false,
    expanded:  false,

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
        expanded: false
      })
    }
    else {
      this.setState({
        expanded: index
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
    let temp=[e, ...this.state.events];
    temp.sort((a,b)=>new Date(b.time).getTime()-new Date(a.time).getTime())
    this.setState({ events: temp });
  };
  render() {
    let events = this.state.events.map((e, index) => {
      if (e.type === "meal") {
        return(
          <div id="dashmealcontainer">
          <li key={index} className={"meal"}>
            {e.name} at {new Date(e.time).toDateString()}
            {this.state.expanded === index && <ul>{e.items.map((item, index)=> <li key={index}>{item.name}</li>)}</ul>}
            <button id="expand-toggle" onClick={() => this.handleExpandToggle(index)}>{this.state.expanded === index ? '-' : '+'}</button>
          </li>
          </div>
        )
      }
      else {
        return (
        <li key={index} className="symptom">
          {e.name} at {new Date(e.time).toDateString()} {e.severity}
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
        className='Modal'
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
        <Result/>
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
