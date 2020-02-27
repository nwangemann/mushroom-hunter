import React, { Component } from "react";
import "./Header.scss";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSession, logout } from "../../redux/reducer";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginView: this.props.loginView
    };
  }

  logout = async () => {
    await axios.get("/auth/logout");
    this.props.history.push("/");
  };

  render() {
    return (
      <div id="headerParent">
        {this.props.loginView ? (
          <div className="welcomeBox" >
            <img className="headerLogo" alt="logo" src="./favicon.ico" />
            <h1 className="headerPerm" >Mushroom Hunter</h1>
          </div>
        ) : (
          <div className="welcomeBox">
             <img className="headerLogo" alt="logo" src="./favicon.ico" />
             <div className="welcomeText">
            <h1 className="headerPerm" >Mushroom Hunter</h1>
            </div>
            <div className="welcomeText">
            <h3 className="headerPerm">Welcome, {this.props.user.username}</h3>
            </div>
          </div>
        )}
        {this.props.loginView ? null : (
          <div id="buttonParent">
            <div className="headerElem">
              <Link to="/post" className="subnav_links">
                <p className="headerText" >Create New Post</p>
              </Link>
            </div>
            <div className="headerElem">
              <Link to="/main" className="subnav_links">
                <p className="headerText" >My Posts</p>
              </Link>
            </div>
            <div className="headerElem">
              <Link to="/" className="subnav_links">
                <p className="headerText"  onClick={this.props.logout}>Logout</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  getSession,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
