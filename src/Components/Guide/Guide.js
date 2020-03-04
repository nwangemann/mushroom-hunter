import React, { Component } from "react";
import "./Guide.scss";
import axios from "axios";
import { connect } from "react-redux";
import { getSession } from "../../redux/reducer";

class Guide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guide: [],
      search: ""
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

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log('state', this.state)
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
    return (
      <div className="guideContainer">
        <div className="searchBar">
          <div className="searchBarInner">
            <label>Search:</label>
            <input
              onChange={this.changeHandler}
              placeholder="Try searching by species name, edibility, etc!"
              type="text"
              name="search"
              value={this.state.search}
            />
          </div>
        </div>
        {mappedGuide}
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  getSession
};

export default connect(mapStateToProps, mapDispatchToProps)(Guide);
