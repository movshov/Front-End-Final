// App.js
import React from "react";
import "./App.css";
import MyGoogleMap from "./components/MyGoogleMap";
import Forecast from "./components/Forecast";

function App() {
  return (
    <div className="main-wrapper">
      <Forecast />
      <MyGoogleMap />
    </div>
  );
}

export default App;
