import React from 'react';
import Api from '../../services/api-service';
import './Result.css';


export default class Result extends React.Component{

    state = {
        results:
        [{symptomType: '', mostCommonFoods: [], mostCommonIngredients: []}]
    }
    refreshResuls= ()=>{
        Api.doFetch('/results').then(res=>{
            this.setState({results:res});

        }).catch(console.log)
    }
    render(){
        let results = this.state.results.length < 2 ? <h3>Click Refresh To See Correlation</h3> : this.state.results.map((item,key)=>{
            return <li key={key}><strong>{item.symptomType.type}</strong> <i>triggered by:</i> {item.mostCommonFoods.map(food=>food.name).join(',')}</li>
        });
    return (
    <div className="results">
         <ul>
             {results}
         </ul>
{' '}
         <button onClick={(e)=>this.refreshResuls(e)}>refresh</button>
        
        
        </div>)
}
}