import React, { Component } from "react";
import "./Guide.scss";
import axios from "axios";
import { connect } from "react-redux";
import { getSession, addGuideView, removeGuideView } from "../../redux/reducer";
import logo2 from "../../images/logo2.png";

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
    this.props.addGuideView();
  }

  componentWillUnmount(){
    this.props.removeGuideView();
  }
 
  getGuideSortName = () => {
    axios.get("/api/guide").then(res => {
      this.setState({
        guide: res.data
      });
    });
  };

  search = () => {
    let { search } = this.state;
    console.log("search", search);
    axios
      .get(`/api/search/${search}`)
      .then(res => {
        this.setState({
          guide: res.data,
          search: ''
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  toFilter = () => {
    this.props.history.push('/filter')
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log("state", this.state);
  };

  render() {
    const mappedGuide = this.state.guide.map(entry => {
      return (
        <div className="entryParent" key={entry.id}>
          <div className="displayedTextParent">
            <h1>{entry.species}</h1>
            <p>
              <span className="categoryHead">Latin name:</span> {entry.scientific_name}
            </p>
            <p>
              <span className="categoryHead">Edibility:</span> {entry.edible}
            </p>
            <p>
              <span className="categoryHead">Eating Notes:</span> {entry.eating_notes}
            </p>
            <p>
              <span className="categoryHead">Season:</span> {entry.season}
            </p>
            <p>
              <span className="categoryHead">Frequency:</span> {entry.frequency}
            </p>
            <div>
              <p>
                <span className="categoryHead">Description:</span>
              </p>
              <div className="description">{entry.description}</div>
            </div>
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
            <img src={logo2} alt="mushroomIDExample" className="guideLogo" />
            <div>
            <form
             onSubmit={e => {
              e.preventDefault();
              this.search();
            }}>
              <div className="flexContain">
              <div>
              <input
              className="inputField"
                onChange={this.changeHandler}
                placeholder="Enter species name or try a filtered search!"
                type="text"
                name="search"
                value={this.state.search}
              />
              </div>
              <div>
              <input
                className="submitButton"
                type="submit"
                value="Search"
              ></input>
              <button onClick={this.toFilter}
              className="submitButton" >Show Filters</button>
              </div>
              </div>
            </form>
            </div>
              <img src={logo2} alt="mushroomIDExample" className="guideLogo" />
          </div>
        </div>
        {mappedGuide}
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  getSession,
  addGuideView,
  removeGuideView
};

export default connect(mapStateToProps, mapDispatchToProps)(Guide);
