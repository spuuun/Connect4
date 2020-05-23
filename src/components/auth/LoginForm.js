import React, { Component } from 'react'
// import Link from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'

function Login(props) {

    function handleChange() {
        // handle textfield input change
    }

    return (
        // login with google
        // login with github
        // login with email/password

        // no accout? --- register new OR continue as guest
        // forgot password?
        <>
            <h1>Log in w/Email</h1>
            <form className={classes.root} noValidate>
                <TextField>

                </TextField>
                <TextField>

                </TextField>
                <Button
                // onClick={doLogin}
                />
            </form>

            {/* <Link to='/register'/> */}
        </>
    )
}

export default Login

    // this is where non-logged-in users (and users not saved in local/session storage) will be directed

// include:
    // 1. email and password fields 
    // 2. "Login" button                --- triggers authentication logic and redirects to Home page
    // 3. "Register New Account" button --- redirects to RegistrationForm
    // 4. "Continue as Guest" button    --- assigns userId and default username; redirects to Home page
    // 5. "Forgot Password" link        --- triggers firebase to send reset password email