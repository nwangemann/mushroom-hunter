import React, { Component } from "react";
import "./Detail.css";
import axios from "axios";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getSession } from "../../redux/reducer";

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: []
    };
  }

  componentDidMount() {
    this.getPostDetail();
  }

  getPostDetail = () => {
    let id = this.props.detailViewPostID;
    axios.get(`/api/detail/${id.detailViewPostID}`).then(post => {
      console.log("post.data", post.data);
      this.setState({
        post: post.data
      });
    });
  };

  deletePost = async e => {
    let id = e.target.value;
    await axios.delete(`/api/delete/${id}`);
    this.getUserPosts(this.props.user.user_id);
    this.props.history.push("/main");
  };

  render() {
    console.log("post from render", this.state.post);
    const mappedPost = this.state.post.map(post => {
      return (
        <div key={post.post_id} className="postContainer">
          <div className="dashboardText">
            <h2>Species: {post.species}</h2>
            <h2>Edible: {post.edible}</h2>
            <h2>Date: {post.date}</h2>
            <p>Description: {post.description}</p>
            <button
              className="deleteButton"
              onClick={this.deletePost}
              value={post.post_id}
            >
              Delete
            </button>
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
          <div id="detailParent">
            {mappedPost}
            mappedPost placeholder
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
  getSession
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
