import React from "react";
import './reset.css'
import "./App.scss";
import Header from './Components/Header/Header'
import Main from './Components/Main/Main'
import Post from './Components/Post/Post'
import Login from './Components/Login/Login'
import Detail from './Components/Detail/Detail'
import Guide from './Components/Guide/Guide'
import Filter from './Components/Filter/Filter'
import MapContainer from './Components/Map/Map'

import { Switch, Route, withRouter } from 'react-router-dom'

class App extends React.Component {
  render() {
    return <div className="App">
      <Header /> 
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/main" component={Main} />
        <Route path="/post" component={Post} />
        <Route path="/detail" component={Detail} />
        <Route path="/guide" component={Guide} />
        <Route path="/filter" component={Filter} /> 
        <Route path="/map" component={MapContainer} /> 
      </Switch>
    </div>;
  }
}

export default withRouter(App);