import React, { useState } from "react";
import Conditions from "../components/Conditions";

const Forecast = () => {
  let [responseObj, setResponseObj] = useState({}); //creating the responseObje variable.
  function getForecast() {
    fetch(
      "https://community-open-weather-map.p.rapidapi.com/weather?q=Portland",
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
      <button onClick={getForecast}>Get Forecast</button>
      <Conditions responseObj={responseObj} />
    </div>
  );
};
export default Forecast;
