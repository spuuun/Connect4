import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import Register from './auth/RegistrationForm';
import LandingAndLoginFormBase from './auth/LandingAndLoginForm';
import Board from './game/Board';
import PasswordReset from './auth/PasswordReset'
import AccountDetails from './auth/AccountDetails'

// import LandingAndLoginForm from './auth/LandingAndLoginForm';

export default class ApplicationViews extends Component {
    render() {
        return (
            <>
                {/* For the '/' path:
                    we'll want to replace board with <Home /> component or something later - once we have it */}
                <Route exact path="/" render={(props) => {
                    return <Board />
                }} />
                <Route path='/board' render={(props) => {
                    return <Board/>
                }}/>
                <Route exact path='/register' render={(props) => {
                    return <Register />
                }} />
                <Route path='/login' component={LandingAndLoginFormBase} />
                <Route path='/password-reset' render={(props) => {
                    return <PasswordReset />
                }} />
                <Route path='/account-details' render={(props) => {
                    return <AccountDetails />
                }} />
            </>
        )
    }
}



// sort of the parent component of the whole application
// contains routes to all other components except for those pertaining to auth 
    // --- i.e. besides auth, all components are children of this one 

// in practice, Connect4.js will render the Navbar, ApplicationViews