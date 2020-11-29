import React, { Component } from "react";
import classes from "../views/Dashboard.module.css";
import LineGraph from "../components/Dashboard/LineGraph";
//import chartIcon from "../../assets/chart-icon.svg";
import { temp_data, days } from "../components/Forecast";

export default class Dashboard extends Component {
  state = {
    data: temp_data,
    labels: days
  };

  render() {
    const { data, labels } = this.state;
    return (
      <div className={classes.container}>
        <header>
          <h1>Max Temperature Dashboard</h1>
        </header>
        <LineGraph data={data} labels={labels} />
      </div>
    );
  }
}
