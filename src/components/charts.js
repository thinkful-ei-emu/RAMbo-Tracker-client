import React from 'react';
import Chart from 'chart.js';
/* this is meant to be a base class for all charts to make building them easier */
//<chart type ="scatter" data={data}

export default class ChartComponent extends React.Component{
constructor(props){
  super(props);
  this.depth =  Array.isArray(this.props.data[0]) ? this.props.data.length : 1 ;// is th
  this.canvas_ref = React.createRef();
  
}
componentDidUpdate(){
  this.myChart.data.labels = this.props.data.map(d => d.label);
  for(let x = 0; x < this.depth;x++){
    this.myChart.data.datasets.data = this.props.data
  }
  this.myChart.data.datasets.forEach((d,i) => d[i].data.map(//.data = this.props.data.map(d => d.value);
  this.myChart.update();
}
componentDidMount() {
  this.myChart = new Chart(this.canvasRef.current, {
    type: this.props.type,
    options: {
      maintainAspectRatio: true,
      responsive: true
    },
    data: {
      labels: this.labels,
      datasets: [{
        data: this.props.data,
        backgroundColor: this.props.colors
      }]
    }
  });
}
render(){
  return (<canvas ref={this.canvas_ref}/>)
}
}