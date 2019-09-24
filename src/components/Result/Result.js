import React from 'react';
import Api from '../../services/api-service';
import './Result.css';
import chart from 'chart.js';

let scatter;
export default class Result extends React.Component{

    state = {
        results:
        [{symptomType: '', mostCommonFoods: [], mostCommonIngredients: []}]
    }
    refreshResuls= ()=>{
        Api.doFetch('/results').then(res=>{
            this.setState({results:res});
            //res.map(item=>{})
            scatter = new chart(document.getElementById('result_chart').getContext('2d'),{
                type:'scatter',
                data:{
                    datasets:[{
                        data:[{x:10,y:new Date().getHours()}]
                    }]
                }
            });

        }).catch(console.log)
    }
    render(){
        let results = this.state.results.length < 2 ? <p>click refresh to see correlation</p> : this.state.results.map((item,key)=>{
            return <li key={key}><strong>{item.symptomType.type}</strong> <i>triggered by:</i> {item.mostCommonFoods.map(food=>food.name).join(',')}</li>
        });
    return (
    <div className="results">
         <ul>
             {results}
         </ul>

         <button onClick={(e)=>this.refreshResuls(e)}>refresh</button>
         <canvas id="result_chart"></canvas>
        
        
        </div>)
}
}