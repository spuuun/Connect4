import React, { Component } from 'react'
import {withFirebase} from '../../base'

const initialState = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class LandingAndLoginForm extends Component {

    state = initialState

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = event => {
        const { username, email, passwordOne } = this.state;
        this.props.firebase.auth.createUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // DO some post operation on new user data - post to our storage db
                    //here                
                this.setState({ ...this.initialState });
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };

    render() {
        return (
            <>
                <form onSubmit={this.onSubmit} >

                </form>
            </>
        )
    }
}

export default withFirebase(LandingAndLoginForm)


    // this is where non-logged-in users (and users not saved in local/session storage) will be directed

// include:
    // 1. email and password fields 
    // 2. "Login" button                --- triggers authentication logic and redirects to Home page
    // 3. "Register New Account" button --- redirects to RegistrationForm
    // 4. "Continue as Guest" button    --- assigns userId and default username; redirects to Home page
    // 5. "Forgot Password" link        --- triggers firebase to send reset password email