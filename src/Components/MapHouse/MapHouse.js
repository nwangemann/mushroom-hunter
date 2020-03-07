import React, { Component } from "react";
import "./MapHouse.scss";
import { connect } from "react-redux";
import MapContainer from "../Map/Map";
import {removeMarkerStyle} from '../../redux/reducer'

class MapHouse extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.removeLoginView();
  }

  componentWillUnmount(){
    this.props.removeMarkerStyle();
  }

  cancel = () => {
    this.props.history.push("/main");
  };



  render() {
    return (
      <div className="mapHouseContainer">
       
              <MapContainer />
             <button onClick={this.cancel}>Exit</button>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  removeMarkerStyle
};

export default connect(mapStateToProps, mapDispatchToProps)(MapHouse);
