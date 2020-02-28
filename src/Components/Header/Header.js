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
      loginView: this.props.loginView,
      toggleMenu: false
    };
  }

  logout = async () => {
    await axios.get("/auth/logout");
    this.props.history.push("/");
  };

  toggleMenuFunc = () => {
    this.setState({
      toggleMenu: !this.state.toggleMenu
    });
  }

  render() {
    return (
      <div id="headerParent">
        {this.props.loginView ? (
          <div className="welcomeBox" >
            <img className="headerLogo mobile" alt="logo" src="./favicon.ico" />
            <h1 className="headerPerm notMobile" >Mushroom Hunter</h1>
          </div>
        ) : (
          <div className="welcomeBox">
             <img className="headerLogo mobile" alt="logo" src="./favicon.ico" />
             <div className="welcomeText notMobile">
            <h1 className="headerPerm" >Mushroom Hunter</h1>
            </div>
            <div className="welcomeText">
            <h3 className="headerWelcome notMobile">Welcome, {this.props.user.username}</h3>
            </div>
          </div>
        )}
        {this.props.loginView ? null : (
          <div id="buttonParent">
            <div className="headerElem notMobile">
              <Link to="/post" className="subnav_links">
                <p className="headerText" >Create New Post</p>
              </Link>
            </div>
            <div className="headerElem notMobile">
              <Link to="/main" className="subnav_links">
                <p className="headerText" >My Posts</p>
              </Link>
            </div>
            <div className="headerElem notMobile">
              <Link to="/" className="subnav_links">
                <p className="headerText"  onClick={this.props.logout}>Logout</p>
              </Link>
            </div>
            <img
            className="hamburger"
            alt="hammy"
            src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png"
            onClick={() => this.toggleMenuFunc()}
          />
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
