import React from 'react'
import Chart from "chart.js";

export default class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  state={
    screenSize:0
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
    });
    window.addEventListener('resize', this.resize);
    this.resize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }
  resize = () => {
    let currentscreenSize =
      window.innerWidth >= 1000 ? (window.innerWidth >= 1400 ? 2 : 1) : 0;
      if(currentscreenSize!==this.state.screenSize){
        if(currentscreenSize===2){
          this.myChart.canvas.parentNode.style.height='600px';
          this.myChart.canvas.parentNode.style.width='700px';
        }
        else if(currentscreenSize===1){
          this.myChart.canvas.parentNode.style.height='600px';
          this.myChart.canvas.parentNode.style.width='400px';
        }
        else if(currentscreenSize===0){
          this.myChart.canvas.parentNode.style.height='500px';
          this.myChart.canvas.parentNode.style.width='300px';
        }
        this.setState({
          screenSize:currentscreenSize
        })
      }
  };

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map(d => d.label);
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
    this.myChart.update();
  }

 


  render() {
    return <canvas className="chart-canvas" ref={this.canvasRef} />;
  }
}