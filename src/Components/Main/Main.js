import React, { Component } from "react";
import "./Main.css";
import { connect } from "react-redux";
import { removeLoginView, getSession } from "../../redux/reducer";
import axios from "axios";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.props.removeLoginView();
    this.props.getSession();
    console.log('userid', this.props.user.user_id)
    this.getUserPosts(this.props.user.user_id);
    console.log(this.state.posts)
  }

  getUserPosts = user_id => {
    axios.get(`/api/posts/${user_id}`).then(posts => {
      console.log('inside getuserposts', posts)
      this.setState({
        posts: posts.data
      });
    }).catch(err => console.log('catch error', err))
  };

  render() {
    const mappedPosts = this.state.posts.map(post => {
      return (
        <div className="postContainer">
          <h2>Species: {post.species}</h2>
          <h2>Edible: {post.edible}</h2>
          <h2>Date: {post.date}</h2>
          <p>Description: {post.description}</p>
          <img className="postPhoto" alt="mushroom" src={post.image_url} />
        </div>
      );
    });
    return (
      <div>
        <h1>Main!</h1>
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
