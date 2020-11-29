import React, { Component } from "react";
import Chart from "chart.js";
import classes from "./LineGraph.module.css";
import { data, days } from "../Forecast";

export default class LineGraph extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: ["1", "2", "3", "4", "5", "6", "7"],
        datasets: [
          {
            label: "temperature",
            data: data
          }
        ]
      },
      options: {
        //Customize chart options
      }
    });
  }
  render() {
    return (
      <div className={classes.graphContainer}>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}
