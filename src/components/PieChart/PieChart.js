import React from 'react'
import Chart from "chart.js";

export default class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
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
        }],
       
      },
      onResize: function(myChart, size){
        console.log('RESIZING')

        if(size.width > 1000){
         myChart.canvas.parentNode.style.height = '800px';
          myChart.canvas.parentNode.style.width = '800px';
          this.update()
        }
      }
    });

  }



  render() {
    return <canvas className="chart-canvas" ref={this.canvasRef} />;
  }
}