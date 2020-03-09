import React, { Component } from "react";
import "./Login.scss";
import axios from "axios";
import { connect } from "react-redux";
import { submitUser, addLoginView, logout } from "../../redux/reducer";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      register: false,
      registerFail: false,
      loginFail: false
    };
  }

  componentDidMount() {
    this.props.logout();
    this.props.addLoginView();
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  login = (email, password) => {
    let body = { email, password };
    axios
      .post("/auth/login", body)
      .then(res => {
        this.props.submitUser(res.data);
        this.props.history.push("/main");
      })
      .catch(err => {
        this.setState({
          loginFail: true
        });
        console.log(err);
      });
  };

  register = (username, email, password) => {
    let newUser = { username, email, password };
    axios
      .post("/auth/register", newUser)
      .then(res => {
        this.props.submitUser(res.data);
        this.props.history.push("/main");
      })
      .catch(err => {
        this.setState({
          registerFail: true
        });
        console.log(err);
      });
  };

  toggleViewToRegister = () => {
    this.setState({
      register: true,
      username: "",
      email: "",
      password: "",
      registerFail: false,
      loginFail: false
    })
  }

  toggleViewToLogin = () => {
    this.setState({
      register: false,
      username: "",
      email: "",
      password: "",
      loginFail: false,
      registerFail: false
    })
  }

  render() {
    return (
      <div className="loginBoundaryFlex">
        {!this.state.register ? (
          <div className="loginParent">
            <h1 className="loginTitleText">Login</h1>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.login(this.state.email, this.state.password);
              }}
            >
              <div className="formElem">
                <label>Email:</label>
                <input
                  onChange={this.changeHandler}
                  type="text"
                  name="email"
                  value={this.state.email}
                />
              </div>
              {this.state.loginFail ? (
                <div className="formElem failBox">
                  <div>
                  <label>Password:</label>
                  <input
                    onChange={this.changeHandler}
                    type="password"
                    name="password"
                    value={this.state.password}
                  />
                  </div>
                  <div className="errorMsgParent">
                  <p className="errorFail">
                    Incorrect username and/or password
                  </p>
                  </div>
                </div>
              ) : (
                <div className="formElem">
                  <label>Password:</label>
                  <input
                    onChange={this.changeHandler}
                    type="password"
                    name="password"
                    value={this.state.password}
                  />
                </div>
              )}

              <div className="formElem">
                <input type="submit" value="Login" className="loginButton" />
              </div>
            </form>
            <label>Don't have an account?</label>
            <div className="formElem">
              <button
                className="loginButton"
                onClick={this.toggleViewToRegister}
              >
                Register
              </button>
            </div>
          </div>
        ) : (
          <div className="loginParent">
            <h1 className="loginTitleText" >Register</h1>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.register(
                  this.state.username,
                  this.state.email,
                  this.state.password
                );
              }}
            >
              <div className="formElem">
                <label>Username:</label>
                <input
                  onChange={this.changeHandler}
                  type="text"
                  name="username"
                  value={this.state.username}
                />
              </div>
              <div className="formElem">
                <label>Email:</label>
                <input
                  onChange={this.changeHandler}
                  type="text"
                  name="email"
                  value={this.state.email}
                />
              </div>
              {this.state.registerFail ? (
                <div className="failBox">
                  <div className="formElem">
                    <label>Password:</label>
                    <input
                      onChange={this.changeHandler}
                      type="password"
                      name="password"
                      value={this.state.password}
                    />
                  </div>
                  <div className="errorMsgParent">
                  <p className="errorFail">
                    This email already exists. Please register with an alternate
                    email.
                  </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="formElem">
                    <label>Password:</label>
                    <input
                      onChange={this.changeHandler}
                      type="password"
                      name="password"
                      value={this.state.password}
                    />
                  </div>
                </div>
              )}
              <div className="formElem">
                <input className="loginButton" type="submit" value="Register" />
              </div>
            </form>
            <label>Already have an account?</label>
            <div className="formElem">
            <button
              className="loginButton"
              onClick={this.toggleViewToLogin}
            >
              Login
            </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  submitUser,
  addLoginView,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
