import React, { Component } from "react";
import Chart from "chart.js";
import classes from "./LineGraph.module.css";
import { temp_data, days } from "../Forecast";
let myLineChart;

export default class LineGraph extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    this.buildChart();
  }
  componentDidUpdate() {
    this.buildChart();
  }

  buildChart = () => {
    const myChartRef = this.chartRef.current.getContext("2d");
    //const { temp_data, days } = this.props;

    var ctx = document.getElementById("myChart").getContext("2d");
    var gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.6");
    gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.6");
    if (typeof myLineChart !== "undefined") myLineChart.destroy(); //destroy old chart and build new one.
    //console.log(temp_data);
    myLineChart = new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: days, //[0,1,...6]  7 days of the week.
        datasets: [
          {
            label: "temperature",
            data: temp_data, //[53.12, 53.1,...]  max temp of each day of the week.
            fill: true,
            borderColor: "#98B9AB",
            backgroundColor: gradientFill
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
    console.log(temp_data);
  };
  render() {
    return (
      <div className={classes.graphContainer}>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}
