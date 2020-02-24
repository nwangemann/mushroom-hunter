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
    this.getUserPosts(this.props.user.user_id)
  }

  getUserPosts = (user_id) => {
    axios.get(`/api/posts/${user_id}`).then(posts => {
      this.setState({
        posts: posts.data
      })
    })
  };

  render() {
    const mappedPosts = this.state.posts.map(post => {
      return <div key={post.post_id} className="postContainer">
    <h2>Species: {post.species}</h2>
    <h2>Species: {post.edible}</h2>
    <h2>Species: {post.date}</h2>
    <p>Description: {post.description}</p>
    <img className="postPhoto" alt="mushroom" src={post.image_url} />
      </div>
    })
    return (
      <div>
        <h1>Main!</h1>
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
