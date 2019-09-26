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
            let data = res.map(item=>{
                let datasets= {};
                datasets.data =item.mostCommonFoods.map(food=>{
                    return food.frequency;
                });
                datasets.stack = item.symptomType.type;
                return datasets;
            })
            scatter = new chart(document.getElementById('result_chart').getContext('2d'),{
                type:'bar',
                data:{
                    datasets:[{
                        data:[...data]
                    }]
                },
                options:{
                    scales:[{
                        xAxes:[{stacked:true}]
                }
            });

        }).catch(console.log)
    }
    render(){
        let results = this.state.results.length < 2 ? <p>click refresh to see correlation</p> : this.state.results.map((item,key)=>{
            return <li id='result-list' key={key}><strong>{item.symptomType.type}</strong> <i>triggered by:</i> {item.mostCommonFoods.map(food=>food.name).join(',')}</li>
        });
    return (
    <div className="results">
         <ul>
             {results}
         </ul>
        <div id='results-button'>
         <button  onClick={(e)=>this.refreshResuls(e)}>Refresh Results</button>
        </div>
        <canvas id="result_chart"></canvas>
        
        </div>)
}
}