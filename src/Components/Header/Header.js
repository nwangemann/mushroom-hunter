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
        {this.props.loginView ? 
        <h1>Mushroom Hunter</h1>
        :
        <div id="welcomeBox" >
           <h1>Mushroom Hunter</h1>
        <h3>Welcome, {this.props.user.username}</h3>
        </div>
        }
        {this.props.loginView ? (
          <h1>Login</h1>
        ) : (
          <div id="buttonParent">
            <div className="headerElem">
              <Link to="/post" className="subnav_links">
               Create New Post
              </Link>
            </div>
            <div className="headerElem">
              <Link to="/main" className="subnav_links">
                My Posts
              </Link>
            </div>
            <div className="headerElem">
              <Link to="/" className="subnav_links">
                <p
                onClick={this.props.logout} >Logout</p>
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
