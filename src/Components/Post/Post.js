import React, { Component } from "react";
import "./Post.scss";
import { connect } from "react-redux";
import { removeLoginView } from "../../redux/reducer";
import Calendar from "react-calendar";
import axios from "axios";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      species: "",
      location: "",
      edible: "",
      date: new Date(),
      description: "",
      image_url: "",
      user_id: this.props.user.user_id
    };
  }

  componentDidMount() {
    this.props.removeLoginView();
  }

  handleChange = date => this.setState({ date });

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitPost = async () => {
    const {
      species,
      location,
      edible,
      date,
      description,
      image_url,
      user_id
    } = this.state;
    let newPost = {
      species,
      location,
      edible,
      date,
      description,
      image_url
    };
    await axios.post(`/api/post/${user_id}`, newPost);
    this.props.history.push("/main");
  };

  render() {
    return (
      <div>
        <div id="spacer"></div>
        <div id="uberAlles">
          <div id="postParent">
            <div id="formParent">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  this.submitPost();
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
                <input className="postButton" type="submit" value="Submit Post" />
              </form>
            </div>
            <div id="calendarParent">
              <Calendar className="calendarInput" onChange={this.handleChange} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  removeLoginView
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
