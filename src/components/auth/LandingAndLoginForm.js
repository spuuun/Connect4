import React, { Component } from 'react'

class LandingAndLoginForm extends Component {

    render() {
        return (
            <>
                <h1>hi</h1>
                <p>
                    this is the LandingAndLogin compnent
                </p>
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