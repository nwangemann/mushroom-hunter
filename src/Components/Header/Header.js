import React, { Component } from "react";
import "./Header.css";
import axios from 'axios';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {getSession} from '../../redux/reducer'

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginView: this.props.loginView
    };
  }

  logout = () => {
    console.log(this.props)
    axios.get("/auth/logout")
  };

  render() {
    return (
      <div id="headerParent">
        <h1>Header!</h1>
        {this.props.loginView ? (
          <h1>Login</h1>
        ) : (
          <div id="buttonParent">
            <div className="headerElem">
              <Link to="/post" className="subnav_links">
                <button>Create New Post</button>
              </Link>
            </div>
            <div className="headerElem">
              <Link to="/main" className="subnav_links">
                <button>My Posts</button>
              </Link>
            </div>
            <div className="headerElem">
              <Link to="/" className="subnav_links">
                <button
                onClick={this.props.logout} >Logout</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = {
  getSession
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
