import React, { Component } from "react";
import "./Guide.scss";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { getSession } from "../../redux/reducer";

class Guide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foundInfo: [],
    };
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  getSession
};

export default connect(mapStateToProps, mapDispatchToProps)(Guide);
