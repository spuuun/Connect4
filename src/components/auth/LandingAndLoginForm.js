import React, { Component } from 'react'
import {withFirebase} from '../../base'
import {withRouter} from 'react-router-dom'

// TODO
// 1. create user with google
// 2. create user with github
// 3. add link to 'forgot password'
// 4. add link to 'register new account with email and password'
// 

// for reference - firebase methods
//  firebase.auth.sendPasswordResetEmail(email);
//  firebase.auth.currentUser.updatePassword(password);

const initialState = {
    username: '',
    email: '',
    password: '',
    //passwordTwo: '',
    error: null,
    isRememberMeChecked: false
};

class LandingAndLoginForm extends Component {

    state = initialState

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // create user with email & password
    logInWithEmailAndPassword = event => {
        const { username, email, password } = this.state;
        this.props.firebase.auth.signInWithEmailAndPassword(email, password)
            .then(authUser => {
                // DO some post operation on new user data - post to our storage db
                // save user info in session storage
                // check this.state.isRememberMeChecked --- if so: save user info in local storage too

                this.setState({ ...this.initialState });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };

    render() {
        return (
            <>
            <h2>Log in to your account</h2>
                <form onSubmit={this.logInWithEmailAndPassword} >
                    <button>Log in with Google</button>
                    <button>Log in with Github</button>
                    <hr>or</hr>
                    <h6>log in with email and password</h6>
                    <input>email</input>
                    <input>password</input>
                    <input type='submit'>log in!</input>
                    {/* remember me */}
                </form>
                <a>forgot your password?</a>
                <p>dont have an account? <a>create one!</a></p>
                <hr>or</hr>
                <button>continue as guest</button>
            </>
        )
    }
}

const LandingAndLoginFormBase = withRouter(withFirebase(LandingAndLoginForm)) 

export default LandingAndLoginFormBase








    // this is where non-logged-in users (and users not saved in local/session storage) will be directed

// include:
    // 1. email and password fields 
    // 2. "Login" button                --- triggers authentication logic and redirects to Home page
    // 3. "Register New Account" button --- redirects to RegistrationForm
    // 4. "Continue as Guest" button    --- assigns userId and default username; redirects to Home page
    // 5. "Forgot Password" link        --- triggers firebase to send reset password email