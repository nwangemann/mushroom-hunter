import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import "./Map.scss";

const mapStyles = {
  width: "100%",
  height: "100%"
};

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loc_x: 45.5236111,
      loc_y: -122.675,
      activeMarker: {},
      selectedPlace: {},
      loc_rendered: false,
      showingInfoWindow: false,
      mushroomLocations: [
        { lat: 40.8187372, lng: -124.1864518 },
        { latitude: 41.7754084036633, longitude: -124.110145568848 },
        { latitude: 45.5236111, longitude: -122.675 },
        { latitude: 45.4609359, longitude: -123.9679079 },
        { latitude: 43.3666667, longitude: -124.2166667 },
        { latitude: 46.1880556, longitude: -123.83 },
        { latitude: 42.4391667, longitude: -123.3272222 },
        { latitude: 45.6956723, longitude: -121.8845241 },
        { latitude: 40.5762406, longitude: -124.2639442 }
      ]
    };
  }

  componentDidMount() {}

  showPosition = position => {
    this.setState({
      loc_x: position.coords.latitude,
      loc_y: position.coords.longitude,
      locRendered: true
    });
  };

  saveCoords = (mapProps, map, clickEven) => {
    this.setState({
      loc_x: clickEven.latLng.lat(),
      loc_y: clickEven.latLng.lng()
    });
    map.setCenter({ lat: clickEven.latLng.lat(), lng: clickEven.latLng.lng() });
    //   this.setState({
    //       loc_x: clickEven.Za.x,
    //       loc_y: clickEven.Za.y
    //   })
  };

  displayMarkers = () => {
    return this.state.mushroomLocations.map((location, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: location.latitude,
            lng: location.longitude
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  displayCurrentMarker = () => {
    return (
      <Marker
        position={{
          lat: this.state.loc_x,
          lng: this.state.loc_y
        }}
        onClick={() => console.log("You clicked me!")}
      />
    );
  };

  centerMoved = (mapProps, map) => {
    this.setState({
      loc_x: map.center.lat(),
      loc_y: map.center.lng()
    });
    console.log("state", this.state);
  };

  render() {
    return (
      <div className="mapContainer">
        <Map
          google={this.props.google}
          zoom={8}
          onClick={this.saveCoords}
          onDragend={this.centerMoved}
          style={mapStyles}
          initialCenter={{ lat: this.state.loc_x, lng: this.state.loc_y }}
        >
          <Marker
            position={{ lat: this.state.loc_x, lng: this.state.loc_y }}
            icon={{
              url:
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F86%2Ffd%2F17%2F86fd17769a3b2537d2b028601cda7b92.png&f=1&nofb=1",
              anchor: new this.props.google.maps.Point(48, 48),
              scaledSize: new this.props.google.maps.Size(48, 48)
            }}
          />
          {this.displayMarkers()}
          {/* {this.displayCurrentMarker()} */}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyClSup2EHLu9H1RPlkiQgYdEG2okknabUE"
})(MapContainer);
