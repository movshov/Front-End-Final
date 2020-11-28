// MyGoogleMaps.js

/* The google maps API was a HUGE pain in the ass to get working. It can be implemeted
using a simple version of the API but it doesn't yield much information that way. 
EX:
This would yield our simple google map api with very little information. 

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

So instead I followed a tutorial which makes use of several api's working consecutively 
with the goolge map API. The following code will make use of the "Places, Geocoder, Maps Javascript, 
Maps Embeded, and Geolocation" APIS to give us a google map with a moveable marker, longitude and
latitude location, and an address with a city, state, country, and zipcode. 

Tutorial Link: https://www.freakyjolly.com/google-maps-in-react-example-application/#.X8HHnRNKhJV

All credit for the following code shown below should go towards them. ^ 
*/
import React, { Component } from "react";

import GoogleMapReact from "google-map-react";

import styled from "styled-components";

import AutoComplete from "./Autocomplete";
import Marker from "./Marker";

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

class MyGoogleMap extends Component {
  state = {
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
    geoCoder: null,
    places: [],
    center: [],
    zoom: 9,
    address: "",
    draggable: true,
    lat: null,
    lng: null
  };

  componentWillMount() {
    this.setCurrentLocation();
  }

  onMarkerInteraction = (childKey, childProps, mouse) => {
    this.setState({
      draggable: false,
      lat: mouse.lat,
      lng: mouse.lng
    });
  };
  onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
    this.setState({ draggable: true });
    this._generateAddress();
  };

  _onChange = ({ center, zoom }) => {
    this.setState({
      center: center,
      zoom: zoom
    });
  };

  _onClick = value => {
    this.setState({
      lat: value.lat,
      lng: value.lng
    });
  };

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps
    });

    this._generateAddress();
  };

  /* Tried to get marker placements to be persistent. Ran out of time. 
  markers = [];
  _addMarkersToMap = place => {
    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
    const icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    markers.push(
      new google.maps.Marker({
        mapInstance,
        icon,
        title: place.name,
        position: place.geometry.location
      })
    );
  };
*/
  addPlace = place => {
    this.setState({
      places: [place],
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    });
    //this._addMarkersToMap(); //call our add marker function.
    this._generateAddress();
  };

  _generateAddress() {
    const { mapApi } = this.state;

    const geocoder = new mapApi.Geocoder();

    geocoder.geocode(
      { location: { lat: this.state.lat, lng: this.state.lng } },
      (results, status) => {
        console.log(results);
        console.log(status);
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.setState({ address: results[0].formatted_address });
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  // Get Current Location Coordinates
  setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          center: [position.coords.latitude, position.coords.longitude],
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
  }

  render() {
    const { places, mapApiLoaded, mapInstance, mapApi } = this.state;

    return (
      <Wrapper>
        {mapApiLoaded && (
          <div>
            <AutoComplete //generates our map.
              map={mapInstance}
              mapApi={mapApi}
              addplace={this.addPlace}
            />
          </div>
        )}
        <GoogleMapReact
          center={this.state.center}
          zoom={this.state.zoom}
          draggable={this.state.draggable}
          onChange={this._onChange}
          onChildMouseDown={this.onMarkerInteraction}
          onChildMouseUp={this.onMarkerInteractionMouseUp}
          onChildMouseMove={this.onMarkerInteraction}
          onChildClick={() => console.log("child click")}
          onClick={this._onClick}
          bootstrapURLKeys={{
            key: "AIzaSyBbgQMlI3WkrNhWsJkgm9BSBylz2e9XyH4",
            libraries: ["places", "geometry"]
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
          <Marker
            text={this.state.address}
            lat={this.state.lat}
            lng={this.state.lng}
          />
        </GoogleMapReact>

        <div className="info-wrapper">
          <div className="map-details">
            Latitude: <span>{this.state.lat}</span>, Longitude:{" "}
            <span>{this.state.lng}</span>
          </div>
          <div className="map-details">
            Zoom: <span>{this.state.zoom}</span>
          </div>
          <div className="map-details">
            Address: <span>{this.state.address}</span>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default MyGoogleMap;
