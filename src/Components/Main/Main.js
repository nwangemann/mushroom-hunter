import React, { Component } from "react";
import './Main.css'
import { connect } from "react-redux";
import { removeLoginView, getSession } from "../../redux/reducer";

class Main extends Component {
  constructor(props) {
    super(props);

  
  }

  componentDidMount(){
    console.log('this.props', this.props)
    this.props.removeLoginView()
    this.props.getSession()
    console.log('this.props.user post seshhhh', this.props.user)
  }




  render() {
    return (
      <div >
        <h1>Main!</h1>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  removeLoginView,
  getSession
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
