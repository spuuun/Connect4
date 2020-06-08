import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import Register from './auth/RegistrationForm';
import LoginForm from './auth/LoginForm';
import Board from './game/Board';
import OpenGameList from './game/OpenGameList'
import { faHome } from '@fortawesome/pro-solid-svg-icons';
import Home from './home/Home'
import ResetPassword from './auth/ResetPassword';

export default class ApplicationViews extends Component {
    render() {
        return (
            <>
                <Route exact path="/" render={(props) => {
                    return <Home />
                }} />
                <Route path='/board' render={(props) => {
                    return <Board/>
                }}/>
                <Route exact path='/register' render={(props) => {
                    return <Register />
                }} />
                <Route path="/login" component={LoginForm} />
                <Route path="/resetpassword" component={ResetPassword} />
            </>
        )
    }
}



// sort of the parent component of the whole application
// contains routes to all other components except for those pertaining to auth 
    // --- i.e. besides auth, all components are children of this one 

// in practice, Connect4.js will render the Navbar, ApplicationViews