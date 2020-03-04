import React, { Component } from "react";
import "./Guide.scss";
import axios from "axios";
import { connect } from "react-redux";
import { getSession } from "../../redux/reducer";
import logo1 from '../../images/logo1.png'

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
            <p><span>Latin name:</span> {entry.scientific_name}</p>
            <p><span>Edibility:</span> {entry.edible}</p>
            <p><span>Eating Notes:</span> {entry.eating_notes}</p>
            <p><span>Season:</span> {entry.season}</p>
            <p><span>Frequency:</span> {entry.frequency}</p>
            <p>
            <span>Description:</span>
              <div className="description">{entry.description}</div>
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
          <img
              src={logo1}
              alt="mushroomIDExample"
              className="guideLogo"
            />
            <label>Search:</label>
            <input
              onChange={this.changeHandler}
              placeholder="Try searching by species name, edibility, etc!"
              type="text"
              name="search"
              value={this.state.search}
            />
             <img
              src={logo1}
              alt="mushroomIDExample"
              className="guideLogo"
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
