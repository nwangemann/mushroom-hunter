import React, {Component} from 'react';
import './Login.css'
import axios from 'axios';
import {connect} from 'react-redux';
import {submitUser} from '../../redux/reducer';

class Login extends Component{
    constructor(){
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
            register: false
        }
    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = async (email, password) => {
        let body = {email, password}
        const res = await axios.post('/auth/login', body)
        this.props.submitUser(res.data)
        this.props.history.push('/main')
    }

    register = async (username, email, password) => {
        let newUser = {username, email, password}
        const res = await axios.post('/auth/register', newUser)
        this.props.submitUser(res.data)
        this.props.history.push('/main')
    }

    render(){
        console.log(this.props.user)
        return(
            <div className="loginBoundaryFlex">
                {!this.state.register
                ?
                <div className="loginParent">
                <h1>Login</h1>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    this.login(this.state.email, this.state.password)
                    }}>
                    <label>Email:</label>
                    <input onChange={this.changeHandler} type='text' name='email' value={this.state.email}/>
                    <label>Password:</label>
                    <input onChange={this.changeHandler} type='password' name='password' value={this.state.password}/>
                    <input type='submit' value='Login'/>
                </form>
                {/* <label>Don't have an account?</label> */}
                <button onClick={() => this.setState({register: true})}>Register</button>
                </div>
                :
                <div className="loginParent">
                <h1>Register</h1>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    this.register(this.state.username,this.state.email, this.state.password)
                    }}>
                    <label>Username:</label>
                    <input onChange={this.changeHandler} type='text' name='username' value={this.state.username}/>
                    <label>Email:</label>
                    <input onChange={this.changeHandler} type='text' name='email' value={this.state.email}/>
                    <label>Password:</label>
                    <input onChange={this.changeHandler} type='password' name='password' value={this.state.password}/>
                    <input type='submit' value='Register'/>
                </form>
                <label>Already have an account?</label>
                <button onClick={() => this.setState({register: false})}>Login</button>
                </div>} 
            </div>
        )
    } 
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
    submitUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);