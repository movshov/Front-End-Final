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
            fill: false
          }
        ]
      },
      options: {
        //Customize chart options
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
