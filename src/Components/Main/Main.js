import React, { Component } from "react";
import "./Main.css";
import { connect } from "react-redux";
import { removeLoginView, getSession } from "../../redux/reducer";
import axios from "axios";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      user_id: this.props.user.user_id
    };
  }

  componentDidMount() {
    this.props.removeLoginView();
    // this.props.getSession();
    this.getUserPosts(this.props.user.user_id);
  }

  getUserPosts = () => {
    axios.get(`/api/posts/${this.props.user.user_id}`).then(posts => {
      this.setState({
        posts: posts.data
      });
    }).catch(err => console.log('catch error', err))
  };

  render() {
    const mappedPosts = this.state.posts.map(post => {
      return (
        <div className="postContainer">
          <div className="dashboardText">
          <h2>Species: {post.species}</h2>
          <h2>Edible: {post.edible}</h2>
          <h2>Date: {post.date}</h2>
          <p>Description: {post.description}</p>
          </div>
          <div>
          <img className="postPhoto" alt="mushroom" src={post.image_url} />
          </div>
        </div>
      );
    });
    return (
      <div className="postParent">
        {mappedPosts}
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  removeLoginView,
  getSession
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
