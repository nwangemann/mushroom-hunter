import React, { Component } from "react";
import "./Filter.scss";
import axios from "axios";
import { connect } from "react-redux";
import { getSession } from "../../redux/reducer";
import logo1 from "../../images/logo1.png";

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guide: [],
      search: "",
      filterBySpecies: true,
      filterByScientific: false,
      filterByEdible: false
    };
  }

  searchBy = () => {
    let { search } = this.state;
    console.log("search", search);
    if(this.state.filterBySpecies){
        axios
        .get(`/api/search/${search}`)
        .then(res => {
          this.setState({
            guide: res.data
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else if(this.state.filterByScientific){
        axios
        .get(`/api/search_scientific/${search}`)
        .then(res => {
          this.setState({
            guide: res.data
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else if (this.state.filterByEdible){
        axios
        .get(`/api/search_edible/${search}`)
        .then(res => {
          this.setState({
            guide: res.data,
            search: ''
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
   
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log("state", this.state);
  };

  toggleSpecies = () => {
      this.setState({
        filterBySpecies: true,
        filterByScientific: false,
        filterByEdible: false
      })
  }
  toggleScientific = () => {
      this.setState({
        filterBySpecies: false,
        filterByScientific: true,
        filterByEdible: false
      })
  }
  toggleEdible = () => {
      this.setState({
        filterBySpecies: false,
        filterByScientific: false,
        filterByEdible: true
      })
  }

  render() {
    const mappedGuide = this.state.guide.map(entry => {
      return (
        <div className="entryParent" key={entry.id}>
          <div className="displayedTextParent">
            <h1>{entry.species}</h1>
            <p>
              <span>Latin name:</span> {entry.scientific_name}
            </p>
            <p>
              <span>Edibility:</span> {entry.edible}
            </p>
            <p>
              <span>Eating Notes:</span> {entry.eating_notes}
            </p>
            <p>
              <span>Season:</span> {entry.season}
            </p>
            <p>
              <span>Frequency:</span> {entry.frequency}
            </p>
            <div>
              <p>
                <span>Description:</span>
              </p>
              <div className="description">{entry.description}</div>
            </div>
          </div>
          <div className="photoParent">
            <img
              src={entry.image_url}
              alt="mushroomIDExample"
              className="filterPhoto"
            />
          </div>
        </div>
      );
    });
    return (
      <div className="filterContainer">
        <div className="filterSearchBar">
          <div className="filterSearchBarInner">
            <img src={logo1} alt="mushroomIDExample" className="guideLogo" />
            <div>
            <form
             onSubmit={e => {
              e.preventDefault();
              this.searchBy();
            }}>
              <div className="flexContain">
            <div>
            <p id="searchHeader">Filter By:</p>
            <div className="buttonFlex">
            <button onClick={this.toggleSpecies}
              className={
                  this.state.filterBySpecies
                  ?
                  "currentFilterButton"
                  :
                  "toggleButton"
              } >Species</button>
            <button onClick={this.toggleScientific}
                className={
                    this.state.filterByScientific
                    ?
                    "currentFilterButton"
                    :
                    "toggleButton"
                } >Latin Name</button>
            <button onClick={this.toggleEdible}
               className={
                this.state.filterByEdible
                ?
                "currentFilterButton"
                :
                "toggleButton"
            } >Edibility</button>
              </div>
            </div>
              <div>
              {/* <label>Search:</label> */}
              <input
              className="inputField"
                onChange={this.changeHandler}
                placeholder="Try searching by species name, edibility, etc!"
                type="text"
                name="search"
                value={this.state.search}
              />
              </div>
              <div>
              <input
                id="mainSubmitButton"
                type="submit"
                value="Search"
              ></input>
              </div>
              </div>
            </form>
            </div>
              <img src={logo1} alt="mushroomIDExample" className="guideLogo" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
