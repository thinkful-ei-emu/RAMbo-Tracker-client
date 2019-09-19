import React from 'react';
import API from '../../services/Api-service';
import Modal from 'react-modal';
//components
import Symptoms from '../../components/Symptom/Symptom';
import Meal from '../MealRoute/MealRoute';

//to be removed for final product
import helper from '../../services/helper.services';

export default class DashBoard extends React.Component{
  state = {
    addMealModal : false,
    addSymptomsModal :false,
    
      user :{
          username:'testUser',
          display_name:'Jim Carey'},
      events: 
        [{
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
            symptom: '', 
            severity: 4, 
            time: Date.now()
          }
        ],
        symptoms: []
    }
  componentDidMount(){
   /*  API.doFetch('events')
      .then(res=>) */
      this.setState({
        user: helper.getUserEvents()
      })
  }

  closeModal = (modal)=>
  {
    this.setState({[modal]:false});
  }
  openModal = (e,modal)=>{
    e.preventDefault();
    this.setState({[modal]:true});
  }
  render(){
    return (
    <div>
      {/*add meal modal*/}
      <Modal isOpen={this.state.addMealModal} onRequestClose={(e)=>this.closeModal('addMealModal')}>
        <Meal/>
      </Modal>
      <Modal isOpen={this.state.addSymptomsModal} onRequestClose={()=>this.closeModal('addSymptomsModal')}>
      <Symptoms/>
      </Modal>
      Welcome back <strong>{this.state.user.display_name}</strong>
      <button onClick={(e)=>this.openModal(e,'addMealModal')}>New Meal</button>
      <button onClick={(e)=>this.openModal(e,'addSymptomsModal')}>New symptoms</button>
    </div>)
  }
}