import React from "react";
import API from "../../services/api-service";
import Modal from "react-modal";
//components
import Symptoms from "../../components/Symptom/Symptom";
import Meal from "../MealRoute/MealRoute";
//css
import "./Dashboard.css";
import Result from "../../components/Result/Result";
import Plate from "../../Media/plate.png";
import Symptom from "../../Media/symptom.png";
import Printer from '../../Media/print.png'
//to be removed for final product
//import helper from "../../services/helper.services";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");
export default class DashBoard extends React.Component {
  state = {
    addMealModal: false,
    addSymptomsModal: false,
    expanded: false,
    itemExpanded: [],
    forceUpdateInResult:false,

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
  clearErrors=()=>{
    this.setState({error: null})
  }
  componentDidMount() {
    this.clearErrors()
    API.doFetch("/event")
      .then(res => {
        this.setState({
          user: { username: res.username, display_name: res.display_name },
          events: res.events
        });
      })
      .catch(res => this.setState({ error: res.message }));
  }

  updateAllEventsDueToResult= ()=>{
    this.clearErrors()
    API.doFetch("/event")
      .then(res => {
        this.setState({
          user: { username: res.username, display_name: res.display_name },
          events: res.events
        });
      })
      .catch(res => this.setState({ error: res.message }));
  }

  handleDelete = (id, type, index) => {
    this.clearErrors()

    API.doFetch("/event", "DELETE", {
      id,
      type
    }).then(() => {
      const newEvents = [...this.state.events];
      newEvents.splice(index, 1);
      this.setState({
        events: newEvents,
        forceUpdateInResult:!this.state.forceUpdateInResult
      });
    })
    .catch(res =>this.setState({error: res.message}));
  };

  handleExpandToggle = index => {
    if (this.state.expanded === index) {
      this.setState({
        expanded: false,
        itemExpanded: []
      });
    } else {
      this.setState({
        expanded: index,
        itemExpanded: []
      });
    }
  };

  handleIngredientsToggle = index => {
    if (this.state.itemExpanded.includes(index)) {
      const newItemExpanded = [...this.state.itemExpanded];
      newItemExpanded.splice(newItemExpanded.indexOf(index), 1);
      this.setState({
        itemExpanded: newItemExpanded
      });
    } else {
      const newItemExpanded = [...this.state.itemExpanded];
      newItemExpanded.push(index);
      this.setState({
        itemExpanded: newItemExpanded
      });
    }
  };

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
    this.setState({ events: temp,
      forceUpdateInResult:!this.state.forceUpdateInResult });
  };
  formatDate = time => {
    let date = new Date(time);
    let formatted_date =
      date.getMonth() +
      1 +
      "-" +
      date.getDate() +
      "-" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();
    return formatted_date;
  };
 
  print = () => { 
     window.print() 
  };
  render() {
    let printEvents =
    this.state.events.map((e, index) => {
      if (e.type === "meal") {
        return (
          <div key={index} className="print-container">
            <li className="meal">
              {e.name} at {this.formatDate(e.time)}
              <ul className="food-ingredient-print">
                {e.items.map((item, index) => {
                  return (
                    <li key={index} className="food-item-in-dash">
                      <p className="food-info-in-dash">{item.name}:{' '}
                        {item.ingredients
                          .map(ingredient => ingredient.toLowerCase())
                          .join(", ")}
                          
                      </p>
                    </li>
                  );
                })}
              </ul>
              
            </li>
          </div>
        );
      } else{
        return (
          <div key={index} className="print-container">
            <li className="symptom">
              {e.name} at {this.formatDate(e.time)}{" "}
              {e.type === "symptom" ? `Severity: ${e.severity}` : ""}
            </li>
          </div>
        );
      }
    });
    let events = this.state.events.map((e, index) => {
      if (e.type === "meal") {
        return (
          <div key={index} className="dash-event-container-meal">
            <li className={"meal"}>
              {e.name} at {this.formatDate(e.time)}
              <div className='meal-toggle-cont'>
              <button
                className="expand-toggle"
                onClick={() => this.handleExpandToggle(index)}
              >
                {this.state.expanded === index ? "-" : "+"}
              </button>
              <button
                className="delete-event"
                onClick={() => this.handleDelete(e.id, e.type, index)}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
              </div>
              {this.state.expanded === index && (
                <ul className="food-toggle">
                  {e.items.map((item, index) => {
                    return (<>
                      <li key={index} className="food-item-in-dash">
                        <p className="food-info-in-dash">{item.name}</p>
                        <p className="ingredients-list-in-dash">
                          {this.state.itemExpanded.includes(index) &&
                            item.ingredients
                              .map(ingredient => ingredient.toLowerCase())
                              .join(", ")}
                          
                        </p>
                      </li>
                      <div className='exp-hide-btn'>
                          <button
                            className="ingredients-expand"
                            onClick={() => this.handleIngredientsToggle(index)}
                          >
                            {this.state.itemExpanded.includes(index)
                              ? "Hide ingredients"
                              : "Show ingredients"}
                          </button>
                          </div>
                    </>);
                  })}
                </ul>
              )}
            </li>
          </div>
        );
      } else {
        return (
          <div key={index} className="dash-event-container-symptom">
            <li className="symptom">
              {e.name} at {this.formatDate(e.time)}{" "}
              {e.type === "symptom" ? `Severity: ${e.severity}` : ""}{' '}
              <button
                className="delete-event"
                onClick={() => this.handleDelete(e.id, e.type, index)}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </li>
           
          </div>
        );
      }
    });
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
          <Result refreshDash={this.updateAllEventsDueToResult} forceUpdate={this.state.forceUpdateInResult}/>
          <div className="log-container">
            <h2>My Log</h2>
            {this.state.error && <p className="error">There Was An Error!</p>}

            <div id="dash-button-container">
              <button
                className="user-button new-meal"
                onClick={e => this.openModal(e, "addMealModal")}
              >
                <img className="button-logo" src={Plate} alt=""></img>
                Log Meal
              </button>
              <button
                className="user-button new-symptom"
                onClick={e => this.openModal(e, "addSymptomsModal")}
              >
                <img className="button-logo" src={Symptom} alt=""></img>
                Log Symptom
              </button>
          <button className="user-button print-button" onClick={() => this.print()}>
            <img className="button-logo" src={Printer} alt=""></img>
            Print Logs
          </button>
          <div className=".print-container">

        {printEvents}
          </div>
            </div>
            <div className="events">
              <div className="events-list">
                {events == "" ? `Your log is empty` : events}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
