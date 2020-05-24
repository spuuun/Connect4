import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, FormControlLabel, Typography, Checkbox, Container, TextField } from '@material-ui/core'
import {firebaseApp} from '../../base'

function Login(props) {

    const [loginValues, setLoginValues] = useState({});

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [remember, setRemember] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    function handleEmailChange(e) {
        console.log(e.target.value)
        setLoginEmail(e.target.value)
    }
    function handlePasswordChange(e) {
        console.log(e.target.value)
        setLoginPassword(e.target.value)
    }
    function handleRememberChange(e) {
        console.log(e.target.value)
        setRemember(!remember)
    }

    function validate (values) {
        let errors = {};
        if (!values.email) {
            errors.email = 'a valid email address is required'
        }

        return errors
    }

    async function doLoginWithEmail(email, password) {
        setIsLoading(true)
        const userLoginResponse = await firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("ERROR ON LOGIN", error)
            // ...
          });
          console.log('LOGIN RESPONSE OBJ', userLoginResponse);
        // attempt firebase login with email
        // change error state if email and/or password are:
        //   incorrect,
        //   account doesn't exist, 
        //   account exists with different auth provider
    }

    // MAYBE IMPORT THESE FROM REGISTER COMPONENT
    function authenticateWithGitHub() {

    }
    function authenticateWithGoogle() {

    }

    function doLoginWithExternalAuthProvider(provider) {
        // make sure to store user credentials in local and session storage
        provider === 'GitHub'
            ? authenticateWithGitHub()
            : authenticateWithGoogle()
        // redirect to home page
    }

    function continueAsGuest() {
        // create random guestUserName --- look for external API for this
        // store guest user credentials in local and session storage
        // redirect to home page
    }

    return (
        // login with google
        // login with github
        // login with email/password

        // no accout? --- register new OR continue as guest
        // forgot password?
        <>
            <Container component="main" maxWidth="xs">
                <Typography component='h1' variant='h5'>Log in w/Email</Typography>
                <form className='login-form' noValidate>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='login-email'
                            label='email'
                            name='email'
                            value={loginEmail || ''}
                            autoComplete='email'
                            onChange={e => handleEmailChange(e)}
                            type='email'
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='login-password'
                            label='password'
                            name='password'
                            value={loginPassword || ''}
                            onChange={e => handlePasswordChange(e)}
                            type='password'
                        />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        onClick={() => doLoginWithEmail(loginEmail, loginPassword)}
                        disabled={isLoading}
                    >
                        Login
                    </Button>
                    <FormControlLabel
                        control={<Checkbox value={remember} onChange={(e) => handleRememberChange(e)} color='primary' />}
                        label='Remember Me'
                    />
                <Typography component='h4' variant='h6'><Link to='/reset-password'>Forgot Password?</Link></Typography>

                <Typography component='h4' variant='h6'>Don't have and account? <Link to='/register'>Register here</Link></Typography>

                <Typography component='h4' variant='h6'>Or</Typography>
                <Button onClick={() => continueAsGuest()}>Continue as Guest</Button>
                </form>
            </Container>
        </>
    )
}

export default Login