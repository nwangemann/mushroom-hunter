import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import "./Map.scss";
import { connect } from 'react-redux'
import {setLocationMarker, removeMarkerStyle} from '../../redux/reducer'
import axios from 'axios';


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
      selectedLocation: {},
      loc_rendered: false,
      showingInfoWindow: false,
      mushroomLocations: [
        { latitude: 40.8187372, longitude: -124.1864518 },
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

  componentDidMount() {
    // this.getCoordinates();
  }

  componentWillUnmount(){
    this.props.removeMarkerStyle();
  }

  showPosition = position => {
    this.setState({
      loc_x: position.coords.latitude,
      loc_y: position.coords.longitude,
      locRendered: true
    });
  };

  getCoordinates = () => {
    let user_id = this.props.user.user_id
    axios.get(`/api/coordinates/${user_id}`).then(coordinates => {
        console.log(coordinates)
        let coordsArray = []
        let workingArray = coordinates.data
        for (let i = 0; i < coordsArray.length; i++){
            let objectConstruct = {
                loc_x: workingArray[i].loc_x,
                loc_y: workingArray[i].loc_y
            }
            coordsArray.push(objectConstruct)
        }
        console.log('coordsArray', coordsArray)
        this.setState({
            mushroomLocations: coordsArray
        })
    }).catch(err => console.log(err))
  }

  saveCoords = (mapProps, map, clickEven) => {
    this.setState({
      loc_x: clickEven.latLng.lat(),
      loc_y: clickEven.latLng.lng()
    });
    // map.setCenter({ lat: clickEven.latLng.lat(), lng: clickEven.latLng.lng() });
    this.setState({
        selectedLocation: {
            loc_x: clickEven.latLng.lat(),
            loc_y: clickEven.latLng.lng()
          }
    })
    this.props.setLocationMarker(this.state.selectedLocation)
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
    // this.setState({
    //   loc_x: map.center.lat(),
    //   loc_y: map.center.lng()
    // });
    // this.setState({
    //     selectedLocation: {
    //         loc_x: map.center.lat(),
    //         loc_y: map.center.lng()
    //       }
    // })
    // this.props.setLocationMarker(this.state.selectedLocation)
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
          {this.displayMarkers()}
          {this.displayCurrentMarker()}
        </Map>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  setLocationMarker,
  removeMarkerStyle
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    GoogleApiWrapper({
        apiKey: ``
    })(MapContainer)
)
