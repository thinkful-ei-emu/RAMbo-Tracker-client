import React from 'react';
import API from '../../services/Api-service';
import helper from '../../services/helper.services';

export default class DashBoard extends React.Component{
  state = {
    
      user :{
          username:'testUser',
          display_name:'Jim Carey'},

      events: 
        [
          {
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
            time: 2134234
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
  render(){
    return (
    <div>
      Welcome back <strong>{this.state.user.display_name}</strong>
    </div>)
  }
}