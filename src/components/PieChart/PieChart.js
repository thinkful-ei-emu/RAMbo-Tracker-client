import React from 'react'
import Chart from "chart.js";

export default class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.screenSize!==this.props.screenSize){
      if(nextProps.screenSize===2){
        console.log('screensize 2');
        this.myChart.canvas.parentNode.style.height='600px';
        this.myChart.canvas.parentNode.style.width='700px';
      }
      else if(nextProps.screenSize===1){
        console.log('screensize 1');
        this.myChart.canvas.parentNode.style.height='600px';
        this.myChart.canvas.parentNode.style.width='400px';
      }
      else if(nextProps.screenSize===0){
        console.log('screensize 0');
        this.myChart.canvas.parentNode.style.height='500px';
        this.myChart.canvas.parentNode.style.width='300px';
      }
    }
  }
  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map(d => d.label);
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
    this.myChart.update();
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'doughnut',
      options: {
        maintainAspectRatio: false,
        responsive: true,
      
      },
      data: {
        labels: this.props.data.map(d => d.label),
        datasets: [{
          data: this.props.data.map(d => d.value),
          backgroundColor: this.props.colors
        }]
      }
    });
    if(this.props.screenSize===2){
      console.log('screensize 2 in mount');
      this.myChart.canvas.parentNode.style.height='600px';
      this.myChart.canvas.parentNode.style.width='700px';
    }
    else if(this.props.screenSize===1){
      console.log('screensize 1 in mount');
      this.myChart.canvas.parentNode.style.height='600px';
      this.myChart.canvas.parentNode.style.width='400px';
    }
    else if(this.props.screenSize===0){
      console.log('screensize 0 in mount');
      this.myChart.canvas.parentNode.style.height='500px';
      this.myChart.canvas.parentNode.style.width='300px';
    }

  }


  render() {
    return <canvas className="chart-canvas" ref={this.canvasRef} />;
  }
}