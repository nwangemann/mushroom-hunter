import React, { Component } from "react";
import './Post.css'
import { connect } from "react-redux";
import { removeLoginView } from "../../redux/reducer";


class Post extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.removeLoginView()
  }

  render() {
    return (
      <div>
        <h1>Post!</h1>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  removeLoginView
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);

