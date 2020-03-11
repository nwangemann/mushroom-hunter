import React, { Component } from "react";
import "./Detail.scss";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import {
  getSession,
  setLocationMarker,
  removeMarkerStyle,
  addMarkerStyle
} from "../../redux/reducer";
import Calendar from "react-calendar";
import MapContainer from "../Map/Map";

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: [],
      species: "",
      loc_x: "",
      loc_y: "",
      edible: "",
      previousDate: "",
      date: "",
      description: "",
      image_url: "",
      user_id: this.props.user.user_id,
      editPostToggle: false,
      toggleMap: false,
      markerSet: false
    };
  }

  componentDidMount() {
    this.getPostDetail();
  }

  handleChange = date => this.setState({ date });

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  editToggle = () => {
    this.setState({
      editPostToggle: true
    });
  };

  cancelToggle = () => {
    this.props.removeMarkerStyle();
    this.setState({
      editPostToggle: false,
      markerSet: false
    });
  };

  editPost = () => {
    const {
      species,
      edible,
      date,
      loc_x,
      loc_y,
      description,
      image_url,
      previousDate
    } = this.state;
    let finalDate;
    let finalLocX;
    let finalLocY;
    if (date.length < 1) {
      finalDate = previousDate;
    } else {
      finalDate = date;
    }
    let post_id = this.state.post[0].post_id;
    if (this.props.selectedLocationMarker.loc_x) {
      finalLocX = this.props.selectedLocationMarker.loc_x;
      finalLocY = this.props.selectedLocationMarker.loc_y;
    } else {
      finalLocX = loc_x;
      finalLocY = loc_y;
    }
    let updatedPost = {
      species,
      loc_x: finalLocX,
      loc_y: finalLocY,
      edible,
      date: finalDate,
      description,
      image_url
    };
    axios
      .put(`/api/edit/${post_id}`, updatedPost)
      .then(res => {
        this.setState({
          post: res.data
        });
      })
      .catch(err => console.log(err));
    this.setState({
      editPostToggle: false,
      markerSet: false
    });
  };

  getPostDetail = () => {
    let id = this.props.detailViewPostID;
    axios
      .get(`/api/detail/${id.detailViewPostID}`)
      .then(post => {
        this.setState({
          post: post.data,
          species: post.data[0].species,
          loc_x: post.data[0].loc_x,
          loc_y: post.data[0].loc_y,
          edible: post.data[0].edible,
          previousDate: post.data[0].date,
          description: post.data[0].description,
          image_url: post.data[0].image_url
        });
      })
      .catch(err => console.log(err));
  };

  deletePost = async e => {
    let id = e.target.value;
    await axios.delete(`/api/delete/${id}`);
    this.props.history.push("/main");
  };

  toggleLocation = () => {
    this.setState({
      toggleMap: !this.state.toggleMap
    });
  };

  setLocation = () => {
    this.props.addMarkerStyle();
    this.setState({
      toggleMap: !this.state.toggleMap,
      markerSet: true
    });
  };

  render() {
    const mappedPost = this.state.post.map(post => {
      return (
        <div key={post.post_id} className="detailContainer">
          <div className="flexForText">
            <div className="dashboardText">
              <h2 className="dashboardElement"><span className="categoryHeader">Species: </span>{post.species}</h2>
              <h2 className="dashboardElement"><span className="categoryHeader">Edible:</span> {post.edible}</h2>
              <h2 className="dashboardElement" id="locationElem">
              <span className="categoryHeader">Location: latitude:</span>{post.loc_x}°, <span className="categoryHeader">longitude:</span>{post.loc_y}°
              </h2>
              <h2 className="dashboardElement"><span className="categoryHeader">Date:</span> {post.date}</h2>
              <p className="dashboardElement" id="descriptionElem">
              <span className="categoryHeader">Description:</span> {post.description}
              </p>
            </div>
            <div className="buttonFlexContain">
              <button
                className="detailButton"
                onClick={this.deletePost}
                value={post.post_id}
              >
                Delete
              </button>
              <button className="detailButton" onClick={this.editToggle}>
                Edit Post
              </button>
              <Link to="/main">
                <div className="flexParent">
                  <button className="detailButton" id="exitButton">
                    Exit Detail View
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div>
            <img className="postPhoto" alt="mushroom" src={post.image_url} />
          </div>
        </div>
      );
    });
    return (
      <div>
        {this.props.user ? (
          <div className="detailParent">
            {this.state.editPostToggle ? (
              <div className="uberAlles">
                {this.state.toggleMap ? (
                  <div className="mapHouser">
                    <button onClick={this.setLocation} className="mapButton">
                      Set Location!
                    </button>
                    <MapContainer setLocation={this.setLocation} />
                  </div>
                ) : (
                  <div id="detailParent">
                    <div className="detailFormParent">
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          this.editPost();
                        }}
                      >
                        <div className="formElem">
                          <label>Species:</label>
                          <input
                            onChange={this.changeHandler}
                            type="text"
                            name="species"
                            value={this.state.species}
                          />
                        </div>
                        <div className="formElem">
                          <label>Location:</label>
                          {this.state.markerSet ? (
                            <div className="animationContain">
                              <p
                                onClick={this.setLocation}
                                className="mapToggle inPostLinkButton animationRunner"
                              >
                                Location Set!
                              </p>
                            </div>
                          ) : (
                            <p
                              onClick={this.toggleLocation}
                              className="mapToggle inPostLinkButton"
                            >
                              Select Location From Map!
                            </p>
                          )}
                        </div>
                        <div className="formElem">
                          <label>Edibility:</label>
                          <input
                            onChange={this.changeHandler}
                            type="text"
                            name="edible"
                            value={this.state.edible}
                          />
                        </div>
                        <div className="formElem">
                          <label>Image URL:</label>
                          <input
                            onChange={this.changeHandler}
                            type="text"
                            name="image_url"
                            value={this.state.image_url}
                          />
                        </div>
                        <div className="formElem">
                          <label>Description:</label>
                          <br></br>
                          <textarea
                            id="descriptionInputField"
                            onChange={this.changeHandler}
                            type="text"
                            name="description"
                            value={this.state.description}
                          />
                        </div>
                        <div id="buttonContain">
                          <input
                            className="detailButton"
                            type="submit"
                            value="Submit Post"
                          />
                          <button
                            className="detailButton"
                            onClick={this.cancelToggle}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                      <div className="calendarParent">
                        <Calendar onChange={this.handleChange} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flexParent">{mappedPost}</div>
            )}
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  getSession,
  setLocationMarker,
  removeMarkerStyle,
  addMarkerStyle
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
