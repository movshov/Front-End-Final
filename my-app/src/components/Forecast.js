/* I followed the following tutorial to get the OpenWeatherMap API to work. 
Tutorial Link: https://rapidapi.com/blog/weather-app-react/
All credit for the following code shown below should go towards them.
*/

import React, { useState } from "react";
import Conditions from "../components/Conditions";

const Forecast = () => {
  let [city, setCity] = useState(""); //city input will need to be URI encoded.
  let [unit, setUnit] = useState("imperial"); //setting intial value to imperial as default.
  let [lat, setlat] = useState(""); //latitude input.
  let [lon, setlon] = useState(""); //longitude input.
  let [responseObj, setResponseObj] = useState({}); //creating the responseObje variable.
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
  }

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
