// App.js
/* 
Attempted to follow google maps platform "places search box" tutorial but couldn't get it to work with a 
react project. So i went with a different tutorial instead. More information can be found at the top of 
the "MyGoogleMap.js" file. 

Original Tutorial: https://developers.google.com/maps/documentation/javascript/examples/places-searchbox 

*/

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
