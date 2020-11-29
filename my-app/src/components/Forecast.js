/* I followed the following tutorial to get the OpenWeatherMap API to work. 
Tutorial Links: 
https://rapidapi.com/blog/weather-app-react/
https://rapidapi.com/community/api/open-weather-map/endpoints 

API being used: https://openweathermap.org/ 
*/

import React, { useState } from "react";
import Conditions from "../components/Conditions";
import { Chart } from "react-charts";

const Forecast = () => {
  let [city, setCity] = useState(""); //city input will need to be URI encoded.
  let [unit, setUnit] = useState("imperial"); //setting intial value to imperial as default.
  let [lat, setlat] = useState(""); //latitude input.
  let [lon, setlon] = useState(""); //longitude input.
  let [responseObj, setResponseObj] = useState({}); //creating the responseObj variable.
  const uriEncodedCity = encodeURIComponent(city); //URI encode our city.

  function getForecast(e) {
    e.preventDefault();
    fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}&lat=${lat}&lon=${lon}`, //using template literal
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "37e6f098d2mshdce7d369004075dp158e7djsn8d58d22f8a6f",
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
        }
      }
    )
      .then(response => response.json()) //convert response into a json object.
      .then(response => {
        //assign the response value to the responseobj variable in our state.
        setResponseObj(response);
      })
      .catch(err => {
        console.error(err);
      });
    get16Forecast(e); //call get16Forecast to set dashboard.
  }

  function get16Forecast(e) {
    /*var max_temps = [
        {
            "temp": "0", 
            "day": "0" 
        }
    ]; //max temps array that will hold all of our temps.
    var min_temps = [
        {
            "temp": "0", 
            "day": "0" 
        }
    ]; //min temps array that will hold all or our temps.
    */
    let days = 7; //days integer that will hold all of our # of days recorded (7).
    var max_series = []; //series for max.
    var min_Series = []; //sereis for min.
    var data = [
      {
        temp: "0",
        day: "0"
      }
    ]; //combination of both series as the full data input for the dashboard.
    //get 16 day forecast and use for dashboard.
    e.preventDefault();
    fetch(
      `https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=${uriEncodedCity}&lat=${lat}&lon=${lon}&units=${unit}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "37e6f098d2mshdce7d369004075dp158e7djsn8d58d22f8a6f",
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
        }
      }
    )
      .then(response => response.json()) //convert response into a json object.
      .then(response => {
        //assign the response value to the responseobj variable in our state.
        //var obj = JSON.parse(response);
        if (data) {
          //max_temps = []; //reset max_temps array to be empty before continuing.
          //min_temps = []; //reset min_temps array to be empty as well.
          data = []; //reset data for chart.
        }
        console.log(response);
        for (var k in response.list) {
          //max_temps.push(response.list[k].temp.max); //grab max temp for each day.
          //min_temps += response.list[k].temp.min + ","; //grab min temp for each day.
          data.push({ temp: response.list[k].temp.max, day: k });
        }
        //days = response.list.length; //if we ever were to grab more than a week of data use this to calculate days.
        //console.log(max_temps);
        //console.log(min_temps);
        console.log(days);
        console.log(data);

        //MyChart(responseObj2); //pass json object to MyChart function.
        //data = response.list.map(object => object.main.temp); //parse the json variable for temp
        //time = response.list.map(object => object.main.dt); //time of calculation
      })
      .catch(err => {
        console.error(err);
      });
  }

  function MyChart(obj) {
    console.log(obj.name);
  }
  /*
      Isn't working for some reason. Keep getting "TypeError can not read property of 'dirname' of undefined" error.
      No idea how to fix this issue so switching from chart.js to google charts. Hopefully this works better. 

    var ctx = document.getElementById("canvas").getContext("2d");
    var chart = new chart(ctx, {
      type: "line",

      data: {
        labels: labels, //use lables from api json response.
        datasets: [
          {
            label: "Graph Line",
            data: data, //use data from api json response.
            backgroundColor: "rgba(0, 119, 204, 0.3)"
          }
        ]
      },
      options: {}
    });
    // var chart = new chart(ctx, config); //create new chart.
    
  }
*/
  return (
    <div>
      <h2>Find Current Weather Conditions</h2>
      <form onSubmit={getForecast}>
        <input
          type="text"
          placeholder="Enter City"
          maxLength="50"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Latitude"
          maxLength="50"
          value={lat}
          onChange={e => setlat(e.target.value)}
        />
        <input
          type="text"
          placeholder="Longitude"
          maxLength="50"
          value={lon}
          onChange={e => setlon(e.target.value)}
        />
        <label>
          <input
            type="radio"
            name="units"
            checked={unit === "imperial"}
            value="imperial"
            onChange={e => setUnit(e.target.value)}
          />
          Fahrenheit
        </label>
        <label>
          <input
            type="radio"
            name="units"
            checked={unit === "metric"}
            value="metric"
            onChange={e => setUnit(e.target.value)}
          />
          Celcius
        </label>
        <button type="submit">Get Forecast</button>
      </form>
      <Conditions responseObj={responseObj} />
    </div>
  );
};
export default Forecast;
