import React, { Component } from "react";
import "./Main.scss";
import { connect } from "react-redux";
import logo2 from "../../images/logo4.png";
// import { Redirect } from "react-router-dom";
import {
  removeLoginView,
  getSession,
  getDetailViewID
} from "../../redux/reducer";
import axios from "axios";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      user_id: this.props.user.user_id,
      defaultDisplay: false
    };
  }

  componentDidMount() {
    this.props.getSession();
    this.props.removeLoginView();
    this.getUserPosts(this.props.user.user_id);
    this.triggerDefault();
  }

  getUserPosts = () => {
    axios
      .get(`/api/posts/${this.props.user.user_id}`)
      .then(posts => {
        this.setState({
          posts: posts.data
        });
      })
      .catch(err => console.log("catch error", err));
  };

  deletePost = async e => {
    let id = e.target.value;
    await axios.delete(`/api/delete/${id}`);
    this.getUserPosts(this.props.user.user_id);
  };

  setDetail = e => {
    let id = e.target.value;
    console.log("setdetail ID", id);
    this.props.getDetailViewID(id);
    this.props.history.push("/detail");
  };

  triggerDefault = () => {
    setTimeout(
      function() {
          this.setState({defaultDisplay: true});
      }
      .bind(this),
      1000
  );
  }

  render() {
    console.log('this.state.posts', this.state.posts)
    console.log('this.state.posts.length', this.state.posts.length)
    const mappedPosts = this.state.posts.map(post => {
      return (
        <div key={post.post_id} className="postContainer">
          <div className="dashboardText">
            <div>
              <h2 className="textBoxElem">
                <span className="categoryHeader">Species:</span> {post.species}
              </h2>
              <h2 className="textBoxElem">
                <span className="categoryHeader">Edible:</span> {post.edible}
              </h2>
              <h2 className="textBoxElem locationElement">
                <span className="categoryHeader">
                  Location: <br></br>
                </span>
                <span className="categoryHeaderMulti">latitude: </span>{" "}
                {post.loc_x}°, <br></br>
                <span className="categoryHeaderMulti">longitude: </span>{" "}
                {post.loc_y}°
              </h2>
              <h2 className="textBoxElem">
                <span className="categoryHeader">Date:</span> {post.date}
              </h2>
              <p className="textBoxElem">
                <span className="categoryHeader">Description: </span>
                {post.description}
              </p>
            </div>

            <div className="textBoxElem">
              <button
                className="mainViewButton"
                onClick={this.deletePost}
                value={post.post_id}
              >
                Delete
              </button>
              <button
                className="mainViewButton"
                value={post.post_id}
                onClick={this.setDetail}
              >
                Post Details
              </button>
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
        {(this.state.posts.length > 0) ? (
          <div>
            <div id="spaceTaker"></div>
            <div className="postParent">{mappedPosts}</div>
          </div>
        ) : (
          <div className={
            this.state.defaultDisplay ?
            "defaultLanding"
            :
            "defaultHide"
          }>
            <h1 className="defaultLandingText">Create a post to get started!</h1>
            {/* <h1 className="defaultLandingText">Or check out:</h1>
            <h1 className="defaultLandingText">   Identification Guide</h1>
            <h1 className="defaultLandingText">Location map</h1> */}
            <img src={logo2} alt="logo" />
          </div> 
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  removeLoginView,
  getSession,
  getDetailViewID
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
