import React, { Component } from "react";
import "./Detail.css";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Calendar from "react-calendar";
import { getSession } from "../../redux/reducer";

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: [],
      species: "",
      location: "",
      edible: "",
      date: "",
      description: "",
      image_url: "",
      user_id: this.props.user.user_id,
      editPostToggle: false
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
    console.log("state on toggle", this.state);
  };

  cancelToggle = () => {
    this.setState({
      editPostToggle: false
    });
  };

  editPost = () => {
    const { species, location, edible, date, description, image_url} = this.state;
    let post_id = this.state.post[0].post_id
    let updatedPost = {
      species,
      location,
      edible,
      date,
      description,
      image_url
    };
    console.log('pre-submit post body', updatedPost)
    console.log('pre-submit post_id', post_id)
    console.log('this.state.post', this.state.post)

    axios
      .put(`/api/edit/${post_id}`, updatedPost)
      .then(res => {
        console.log("updated post response", res);
        this.setState({
          post: res.data
        });
      })
      .catch(err => console.log(err));
    this.setState({
      editPostToggle: false
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
          location: post.data[0].location,
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
    this.getUserPosts(this.props.user.user_id);
    this.props.history.push("/main");
  };

  render() {
    //   console.log('state', this.state)
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
            {this.state.editPostToggle ? (
              <div id="uberAlles">
                <div id="postParent">
                  <div id="formParent">
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
                        <input
                          onChange={this.changeHandler}
                          type="text"
                          name="location"
                          value={this.state.location}
                        />
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
                      <input type="submit" value="Submit Post" />
                    </form>
                    <button onClick={this.cancelToggle}>Cancel</button>
                  </div>
                  <div id="calendarParent">
                    <Calendar onChange={this.handleChange} />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {mappedPost}
                <button onClick={this.editToggle}>Edit Post</button>
                <Link to="/main">
                  <button>Exit Detail View</button>
                </Link>
              </div>
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
  getSession
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
