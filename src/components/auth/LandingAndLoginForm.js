import React, { Component } from 'react'
import { withFirebase } from '../firebase/Firebase'
import { withRouter } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

// TODO
// 1. create user with google
// 2. create user with github
// firebase.auth().signInWithPopup().then(result => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
//     // ...
//   }).catch(error => {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });

// for reference - firebase methods
//  firebase.auth.sendPasswordResetEmail(email);
//  firebase.auth.currentUser.updatePassword(password);

const initialState = {
    username: '',
    email: '',
    password: '',
    externalProvider: '',
    error: null,
    isFormInvalidOnSubmit: false,
    isLoginButtonDisabled: false,
    isRememberMeChecked: false
};

class LandingAndLoginForm extends Component {

    state = initialState

    componentDidMount() {
        const provider = this.props.firebase
        console.log(provider)
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // create user with email & password
    logInWithEmailAndPassword = event => {
        this.setState({ isLoginButtonDisabled: true })
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
                this.setState({
                    error: error,
                    isLoginButtonDisabled: false
                });
            });
        event.preventDefault();

    };

    // log in with google 
    logInWithExternalService = event => {

    }

    render() {
        return (
            <>
                <h2>Log in to your account</h2>
                <form onSubmit={this.logInWithEmailAndPassword} >
                    <Button>Log in with Google</Button>
                    <Button>Log in with Github</Button>
                    <div>---or---</div>
                    <h6>log in with email and password</h6>
                    <input
                        type='email'
                        name='email'
                        value={this.state.email}
                        placeholder='enter your email address'
                        onChange={this.onChange}
                    />
                    <input
                        type='password'
                        name='password'
                        value={this.state.password}
                        placeholder='enter your password'
                        onChange={this.onChange}
                    />
                    
                    <Button disabled={this.state.isLoginButtonDisabled} type='submit'>log in!</Button>
                    {/* remember me */}
                </form>
                <Link to='/password-reset'>forgot your password?</Link>
                <p>dont have an account? <Link to='/register'>create one!</Link></p>
                {/* <hr>or</hr> */}
                {/* need to implement redirect to main page with 'guest' credentials features for this
                    <Button>
                        continue as guest
                    </Button> */}
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