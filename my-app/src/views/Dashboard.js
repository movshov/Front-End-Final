import React, { Component } from "react";
import classes from "../views/Dashboard.module.css";
import LineGraph from "../components/Dashboard/LineGraph";
//import chartIcon from "../../assets/chart-icon.svg";
import { data, days } from "../components/Forecast";

export default class Dashboard extends Component {
  state = {
    data: data,
    labels: days
  };

  render() {
    const { data, days } = this.state;
    return (
      <div className={classes.container}>
        <header>
          <h1>Max Temperature Dashboard</h1>
        </header>
        <LineGraph data={data} labels={days} />
      </div>
    );
  }
}
