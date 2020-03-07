import React, { Component } from "react";
import "./Header.scss";
import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getSession, logout } from "../../redux/reducer";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginView: this.props.loginView,
      toggleMenu: false,
      guideView: this.props.guideView
    };
    this.logout = this.logout.bind(this);
  }

  logout = () => {
    this.setState({
      toggleMenu: !this.state.toggleMenu
    });
    axios.get("/auth/logout");
    this.props.history.push("/");
  };

  redirectToCreate = () => {
    this.props.history.push("/post");
  };

  redirectToGuide = () => {
    this.props.history.push("/guide");
  };

  redirectToMyPosts = () => {
    this.props.history.push("/main");
  };

  toggleMenuFunc = () => {
    this.setState({ toggleMenu: !this.state.toggleMenu }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  };

  closeMenu = () => {
    this.setState({ toggleMenu: false }, () => {
      document.removeEventListener("click", this.closeMenu);
    });
  };

  render() {
    return (
      <div id="headerParent">
        {this.props.loginView ? (
          <div className="welcomeBox">
            <img className="headerLogo" alt="logo" src="./favicon.ico" />
            <h1 className="headerPerm notMobile">Mushroom Hunter</h1>
          </div>
        ) : (
          <div className="welcomeBox">
            <img
              className={
                this.state.toggleMenu ? "headerLogoShowing" : "headerLogo"
              }
              alt="logo"
              src="./favicon.ico"
            />
            <div className="welcomeText notMobile">
              <h1 className="headerPerm">Mushroom Hunter</h1>
            </div>
            <div className="welcomeText">
              <h3 className="headerWelcome notMobile">
                Welcome, {this.props.user.username}
              </h3>
            </div>
          </div>
        )}
        {this.props.loginView ? null : (
          <div id="buttonParent">
            <div className="headerElem notMobile">
              <Link to="/map" className="subnav_links">
                <p className="headerText">My Map</p>
              </Link>
            </div>
            <div className="headerElem notMobile">
              <Link to="/guide" className="subnav_links">
                <p className="headerText">Identification Guide</p>
              </Link>
            </div>
            <div className="headerElem notMobile">
              <Link to="/post" className="subnav_links">
                <p className="headerText">Create New Post</p>
              </Link>
            </div>
            <div className="headerElem notMobile">
              <Link to="/main" className="subnav_links">
                <p className="headerText">My Posts</p>
              </Link>
            </div>
            <div className="headerElem notMobile">
              <Link to="/" className="subnav_links">
                <p className="headerText" onClick={this.props.logout}>
                  Logout
                </p>
              </Link>
            </div>
            <img
              className={
                this.state.toggleMenu ? "hamburgerShowing" : "hamburger"
              }
              alt="hammy"
              src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png"
              onClick={() => this.toggleMenuFunc()}
            />
          </div>
        )}
        {this.props.guideView ? (
          <div id="buttonParent">
            <div className="headerElem notMobile">
              <Link to="/main" className="subnav_links">
                <p className="headerText">Exit Guide</p>
              </Link>
            </div>
            <div className="headerElem notMobile">
              <Link to="/" className="subnav_links">
                <p className="headerText" onClick={this.props.logout}>
                  Logout
                </p>
              </Link>
            </div>
            <img
              className={
                this.state.toggleMenu ? "hamburgerShowing" : "hamburger"
              }
              alt="hammy"
              src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png"
              onClick={() => this.toggleMenuFunc()}
            />
          </div>
        ) : null}
        <div
          className={
            this.state.toggleMenu ? "mobile-menu-show" : "mobile-menu-hide"
          }
        >
          <button onClick={this.redirectToCreate} className="navButton">
            New Post
          </button>

          <button onClick={this.redirectToMyPosts} className="navButton">
            My Posts
          </button>

          <button onClick={this.redirectToGuide} className="navButton">
            Identification Guide
          </button>

          <button className="navButton" onClick={this.logout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  getSession,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
