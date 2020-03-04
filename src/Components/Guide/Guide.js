import React, { Component } from "react";
import "./Guide.scss";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { getSession } from "../../redux/reducer";

class Guide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guide: []
    };
  }

  componentDidMount() {
    this.getGuideSortName();
  }

  getGuideSortName = () => {
    axios.get("/api/guide").then(res => {
      this.setState({
        guide: res.data
      });
    });
  };

  render() {
    const mappedGuide = this.state.guide.map(entry => {
      return (
        <div className="entryParent">
          <div className="displayedTextParent">
          <h1>{entry.species}</h1>
          <p>Latin name: {entry.scientific_name}</p>
          <p>Edibility: {entry.edible}</p>
          <p>Eating Notes: {entry.eating_notes}</p>
          <p>Season: {entry.season}</p>
          <p>Frequency: {entry.frequency}</p>
          <p>
            Description:
            <div>{entry.description}</div>
          </p>
          </div>
          <div className="photoParent">
          <img
            src={entry.image_url}
            alt="mushroomIDExample"
            className="guidePhoto"
          />
          </div>
        </div>
      );
    });
    return <div className="guideContainer" >{mappedGuide}</div>;
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  getSession
};

export default connect(mapStateToProps, mapDispatchToProps)(Guide);
