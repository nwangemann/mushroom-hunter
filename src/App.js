import React from "react";
import './reset.css'
import "./App.css";
import Header from './Components/Header/Header'
import Main from './Components/Main/Main'
import Post from './Components/Post/Post'
import Login from './Components/Login/Login'
import Detail from './Components/Detail/Detail'
import { Switch, Route, Link, withRouter } from 'react-router-dom'


class App extends React.Component {
  render() {
    return <div className="App">
      <Header /> 
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/main" component={Main} />
        <Route path="/post" component={Post} />
        <Route path="/detail" component={Detail} />
      </Switch>
    </div>;
  }
}

export default withRouter(App);