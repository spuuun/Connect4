import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import Register from './auth/RegistrationForm';
import LoginForm from './auth/LoginForm';
import Board from './game/Board';
import OpenGameList from './game/OpenGameList'
import { faHome } from '@fortawesome/pro-solid-svg-icons';
import Home from './home/Home'
import ResetPassword from './auth/ResetPassword';

// FUNCTION TO SET AN OBSERVER ON USER OBJ --- CHECKS FOR SIGNED IN USER
    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //       // User is signed in.
    //     } else {
    //       // No user is signed in.
    //     }
    //   });

// ACCESS CURRENT USER --- IF NO USER IS SIGNED IN user === null
    // var user = firebase.auth().currentUser;

    // if (user) {
    //   // User is signed in.
    // } else {
    //   // No user is signed in.
    // }

// GET USER'S PROFILE/AUTHPROVIDER DATA
    // var user = firebase.auth().currentUser;

    // if (user != null) {
    //   user.providerData.forEach(function (profile) {
    //     console.log("Sign-in provider: " + profile.providerId);
    //     console.log("  Provider-specific UID: " + profile.uid);
    //     console.log("  Name: " + profile.displayName);
    //     console.log("  Email: " + profile.email);
    //     console.log("  Photo URL: " + profile.photoURL);
    //   });
    // }

// UPDATE USER PROFILE
    // var user = firebase.auth().currentUser;

    // user.updateProfile({
    // displayName: "Jane Q. User",
    // photoURL: "https://example.com/jane-q-user/profile.jpg"
    // }).then(function() {
    // // Update successful.
    // }).catch(function(error) {
    // // An error happened.
    // });

// UPDATE USER EMAIL
    // var user = firebase.auth().currentUser;

    // user.updateEmail("user@example.com").then(function() {
    //   // Update successful.
    // }).catch(function(error) {
    //   // An error happened.
    // });

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