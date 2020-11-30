/* I followed the following tutorial to get the OpenWeatherMap API to work. 
Tutorial Links: 
https://rapidapi.com/blog/weather-app-react/
https://rapidapi.com/community/api/open-weather-map/endpoints 

API being used: https://openweathermap.org/ 
*/

import React, { useState } from "react";
import Conditions from "../components/Conditions";
import Dashboard from "../views/Dashboard"; //call dashboard.

var temp_data = [];
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
        if (temp_data) {
          temp_data = []; //reset data for chart.
        }
        console.log(response);
        for (var k in response.list) {
          temp_data.push(response.list[k].temp.max);
        }
        //console.log(max_temps);
        //console.log(min_temps);
        //console.log(days);
        console.log(temp_data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <div>
      <h2>Find Weather Conditions</h2>
      <form onSubmit={getForecast}>
        <input
          type="text"
          id="city"
          placeholder="Enter City"
          maxLength="50"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <label for="city"></label>
        <input
          type="text"
          id="lat"
          placeholder="Latitude"
          maxLength="50"
          value={lat}
          onChange={e => setlat(e.target.value)}
        />
        <label for="lat"></label>
        <input
          type="text"
          id="lon"
          placeholder="Longitude"
          maxLength="50"
          value={lon}
          onChange={e => setlon(e.target.value)}
        />
        <label for="lon"></label>
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
      <Dashboard data={temp_data} labels={days} />
    </div>
  );
};
export const days = [
  "day 1",
  "day 2",
  "day 3",
  "day 4",
  "day 5",
  "day 6",
  "day 7"
];
export { temp_data };
export default Forecast;
