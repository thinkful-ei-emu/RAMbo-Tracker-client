import React from 'react';
import API from '../../services/Api-service';
import Modal from 'react-modal';
//components
import Symptoms from '../../components/Symptom/Symptom';
import Meal from '../MealRoute/MealRoute';
//css
import './Dashboard.css';
//to be removed for final product
import helper from '../../services/helper.services';

Modal.setAppElement('#root')
export default class DashBoard extends React.Component{
  state = {
    addMealModal : false,
    addSymptomsModal :false,
    
      user :{
          username:'',
          display_name:''},
      events: 
        [{
            name:'',
            time: 2134234,
            type: '', 
            items: [
              {
                name: '',
                ingredients: []
              },
              {
                name: '',
                ingredients: []
              }
            ],
          }, 
          {
            type: '', 
            name: '', 
            severity: 0, 
            time: null
          }
        ],
    }
  componentDidMount(){
    API.doFetch('/event')
      .then(res=>{
        this.setState({
          user: {username : res.username,display_name: res.display_name},
          events: res.events
        })
      })
      .catch(e=>this.setState({error:e}));
  }

  closeModal = (modal)=>
  {
    this.setState({[modal]:false});
  }
  openModal = (e,modal)=>{
    e.preventDefault();
    this.setState({[modal]:true});
  }
  updateEvents= (e)=>{
    this.setState({events:[e,...this.state.events]})
  }
  render(){
    let events = this.state.events.map((e,index)=>{
      return (<li key={index} className={e.type === 'meal'? 'meal': 'symptom'}>{e.name}@ {new Date(e.time).toDateString()} | {e.severity}</li>)
    })
    return (
    <div>
      {/*add meal modal*/}
      <Modal isOpen={this.state.addMealModal} onRequestClose={(e)=>this.closeModal('addMealModal')}>
        <Meal closeModal={this.closeModal} updateEvents={this.updateEvents}/>
      </Modal>
      <Modal isOpen={this.state.addSymptomsModal} onRequestClose={()=>this.closeModal('addSymptomsModal')}>
      <Symptoms closeModal={this.closeModal} prevSymptoms = {this.state.events.filter(e=>e.type==='symptom')} updateEvents={this.updateEvents}/>
      </Modal>
      Welcome back <strong>{this.state.user.display_name}</strong>
      <div className="events">
        {events}
      </div>
      <button onClick={(e)=>this.openModal(e,'addMealModal')}>New Meal</button>
      <button onClick={(e)=>this.openModal(e,'addSymptomsModal')}>New symptoms</button>
    </div>)
  }
}