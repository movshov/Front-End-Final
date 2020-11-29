/*
import React, {Component } from "react";
import classes from "./Da"
import { Chart } from "react-chart";




import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import styled from "styled-components";

// Ref : https://developers.google.com/chart/interactive/docs/gallery/histogram



NOT WORKING. 


class Dashboard extends Component {
  constructor(props) {
    super(props);
    var unit = Forecast.unit;
    var uriEncodedCity = Forecast.uriEncodedCity;
  }

  render() {
    return (
      <Dashboard
        initialState={{ dataLoadingStatus: "loading", chartData: [] }}
        didMount={async function(Dashboard) {
          const response = await fetch(
            `https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}` //using template literal
          );
          const json = await response.json();
          const [metadata, data] = json;
          {
            console.log(data, metadata);
          }
          const columns = [
            { type: "date", label: "time" },
            { type: "temp", label: "temperature" }
          ];
          let rows = [];
          const nonNullData = data.filter(row => row.value !== null);
          for (let row of nonNullData) {
            const { date, value } = row;
            rows.push([new Date(Date.parse(date)), value]);
          }
          Dashboard.setState({
            chartData: [columns, ...rows],
            dataLoadingStatus: "ready"
          });
        }}
      >
        {Dashboard => {
          return Dashboard.state.dataLoadingStatus === "ready" ? (
            <Chart
              chartType="LineChart"
              data={Dashboard.state.chartData}
              options={{
                hAxis: {
                  format: ""
                },
                vAxis: {
                  format: ""
                },
                title: "Temperature"
              }}
              rootProps={{ "data-testid": "2" }}
            />
          ) : (
            <div>Fetching data from API</div>
          );
        }}
      </Dashboard>
    );
  }
}

export default Dashboard;



const data = [
  ["Year", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2007", 1030, 540]
];
const options = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" }
};
const Dashboard = () => {
  return (
    <div className="App">
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default Dashboard;

*/
