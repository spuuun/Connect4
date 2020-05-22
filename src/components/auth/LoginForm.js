import React, { Component } from 'react'
// import Link from 'react-router-dom'
import {Button} from '@material-ui/core'

class LandingAndLoginForm extends Component {

    render() {
    // login with google
    // login with github
    // login with email/password

    // no accout? --- register new OR continue as guest
    // forgot password?
        return (
            <>
                <h1>Login to Your Account</h1>


                <Button 
                    // onClick={doLogin}
                />
                {/* <Link to='/register'/> */}
            </>
        )
    }
}
export default LandingAndLoginForm

    // this is where non-logged-in users (and users not saved in local/session storage) will be directed

// include:
    // 1. email and password fields 
    // 2. "Login" button                --- triggers authentication logic and redirects to Home page
    // 3. "Register New Account" button --- redirects to RegistrationForm
    // 4. "Continue as Guest" button    --- assigns userId and default username; redirects to Home page
    // 5. "Forgot Password" link        --- triggers firebase to send reset password email