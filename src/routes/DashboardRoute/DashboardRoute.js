import React from "react";
import API from "../../services/api-service";
import Modal from "react-modal";
import Symptoms from "../../components/Symptom/Symptom";
import Meal from "../MealRoute/MealRoute";
import "./Dashboard.css";
import Result from "../../components/Result/Result";
import Plate from "../../Media/plate.png";
import Symptom from "../../Media/symptom.png";
import Printer from "../../Media/print.png";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");
export default class DashBoard extends React.Component {
  state = {
    addMealModal: false,
    addSymptomsModal: false,
    expanded: false,
    itemExpanded: [],
    forceUpdateInResult: false,

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
  clearErrors = () => {
    this.setState({ error: null });
  };
  componentDidMount() {
    this.clearErrors();
    API.doFetch("/event")
      .then(res => {
        this.setState({
          user: { username: res.username, display_name: res.display_name },
          events: res.events
        });
      })
      .catch(res => this.setState({ error: res.error }));
  }

  updateAllEventsDueToResult = () => {
    this.clearErrors();
    API.doFetch("/event")
      .then(res => {
        this.setState({
          user: { username: res.username, display_name: res.display_name },
          events: res.events
        });
      })
      .catch(res => this.setState({ error: res.error }));
  };

  handleDelete = (id, type, index) => {
    this.clearErrors();

    API.doFetch("/event", "DELETE", {
      id,
      type
    })
      .then(() => {
        const newEvents = [...this.state.events];
        newEvents.splice(index, 1);
        this.setState({
          events: newEvents,
          forceUpdateInResult: !this.state.forceUpdateInResult
        });
      })
      .catch(res => this.setState({ error: res.error }));
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
    this.setState({
      events: temp,
      forceUpdateInResult: !this.state.forceUpdateInResult
    });
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
      "at " +
      date.getHours() +
      ":" +
      // eslint-disable-next-line eqeqeq
      (date.getMinutes() === 0
        ? "00"
        : date.getMinutes() < 10
        ? `0${date.getMinutes()}`
        : date.getMinutes());
    return formatted_date;
  };

  print = () => {
    window.print();
  };
  render() {
    let prevSymptoms = this.state.events
              .filter(e => e.type === "symptom")
              .map(e => e.name);
    let prevSymptomsMap = {}
    for (let i = 0; i < prevSymptoms.length; i++) {
      if (!prevSymptomsMap[prevSymptoms[i]]) {
        prevSymptomsMap[prevSymptoms[i]] = 1;
      }
    }

    prevSymptoms = Object.keys(prevSymptomsMap);
    let printEvents = this.state.events.map((e, index) => {
      if (e.type === "meal") {
        return (
          <div key={index} className="print-container">
            <li className="meal">
              {e.name} on {this.formatDate(e.time)}
              <ul className="food-ingredient-print">
                {e.items.map((item, index) => {
                  return (
                    <li key={index} className="food-item-in-dash">
                      <p className="food-info-in-dash">
                        {item.name}:{" "}
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
      } else {
        return (
          <div key={index} className="print-container">
            <li className="symptom">
              {e.name} on {this.formatDate(e.time)}{" "}
              {e.type === "symptom" ? `Severity: ${e.severity}` : ""}
            </li>
          </div>
        );
      }
    });
    let events = this.state.events.map((e, index) => {
      if (e.type === "meal") {
        return (
          <li key={index} className={"meal dash-event-container-meal"}>
            <div className="dash-event-text">
              <div className="event-text-section">{e.name}</div>{" "}
              <div className="event-text-section">
                on {this.formatDate(e.time)}
              </div>
            </div>
            <div className="meal-toggle-cont">
              <button
                className="expand-toggle"
                onClick={() => this.handleExpandToggle(index)}
              >
                {this.state.expanded === index ? "-" : "+"}
              </button>
              <button
                className="delete-event"
                aria-label="Delete item"
                onClick={() => this.handleDelete(e.id, e.type, index)}
              >
                <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
              </button>
            </div>
            {this.state.expanded === index && (
              <div className="expanded-food-event">
                <ul className="food-toggle">
                  {e.items.map((item, index) => {
                    return (
                      <>
                        <li key={index} className="food-item-in-dash">
                          <p className="food-info-in-dash">{item.name}</p>
                          <p className="ingredients-list-in-dash">
                            {this.state.itemExpanded.includes(index) &&
                              item.ingredients
                                .map(ingredient => ingredient.toLowerCase())
                                .join(", ")}
                          </p>
                        </li>
                        <div className="exp-hide-btn">
                          <button
                            className="ingredients-expand"
                            onClick={() => this.handleIngredientsToggle(index)}
                          >
                            {this.state.itemExpanded.includes(index)
                              ? "Hide ingredients"
                              : "Show ingredients"}
                          </button>
                        </div>
                      </>
                    );
                  })}
                </ul>
              </div>
            )}
          </li>
        );
      } else {
        return (
          <li key={index} className="symptom dash-event-container-symptom">
            <div className="dash-event-text">
              <div className="event-text-section">{e.name}</div>{" "}
              <div className="event-text-section">
                on {this.formatDate(e.time)};
              </div>{" "}
              <div className="event-text-section">{`Severity: ${e.severity}`}</div>{" "}
            </div>
            <div className="meal-toggle-cont">
              <button
                className="delete-event"
                aria-label="Delete item"
                onClick={() => this.handleDelete(e.id, e.type, index)}
              >
                <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
              </button>
            </div>
          </li>
        );
      }
    });

    return (
      <div className="entire-dashboard-div">
        <Modal
          className="Modal"
          overlayClassName="Modal_Overlay"
          isOpen={this.state.addMealModal}
          onRequestClose={e => this.closeModal("addMealModal")}
        >
          <Meal closeModal={this.closeModal} updateEvents={this.updateEvents} />
        </Modal>
        <Modal
          className="Modal"
          overlayClassName="Modal_Overlay"
          isOpen={this.state.addSymptomsModal}
          onRequestClose={() => this.closeModal("addSymptomsModal")}
        >
          <Symptoms
            closeModal={this.closeModal}
            prevSymptoms={prevSymptoms}
            updateEvents={this.updateEvents}
          />
        </Modal>
        <div id="user-welcome">
          {" "}
          <h2>Welcome back, {this.state.user.display_name}</h2>
        </div>
        <div className="dashboard-content">
          <Result
            refreshDash={this.updateAllEventsDueToResult}
            forceUpdate={this.state.forceUpdateInResult}
          />
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
              <button
                className="user-button print-button"
                onClick={() => this.print()}
              >
                <img className="button-logo" src={Printer} alt=""></img>
                Print Logs
              </button>
              <div className=".print-container">{printEvents}</div>
            </div>
            <div className="events">
              <div className="events-list">
                <ul>{events === "" ? `Your log is empty` : events}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
