import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, FormControl, Input, InputLabel, Typography, Checkbox, Container } from '@material-ui/core'

function Login(props) {

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [isValid, setIsValid] = useState(false);

    function handleChange(e) {
        setLoginEmail(e.target.value)
        setLoginPassword(e.target.value)
    }

    function doLoginWithEmail(email, password) {
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
                    <FormControl required='true' variant='outlined'>
                        <InputLabel htmlFor='login-email'>email</InputLabel>
                        <Input
                            id='login-email'
                            value={loginEmail}
                            onChange={e => handleChange(e)}
                            type='email'
                        />
                    </FormControl>
                    <FormControl required='true' variant='outlined'>
                        <InputLabel htmlFor='login-password'>password</InputLabel>
                        <Input
                            id='login-password'
                            value={loginPassword}
                            onChange={e => handleChange(e)}
                            type='password'
                        />
                    </FormControl>
                    <Button
                        onClick={doLoginWithEmail}
                        disabled={!isValid}
                    />
                    <FormControl
                        control={<Checkbox value='remember' color='primary' />}
                        label='Remember Me'
                    />
                </form>
                <Typography component='h4' variant='h6'><Link to='/reset-password'>Forgot Password?</Link></Typography>

                <Typography component='h4' variant='h6'>Don't have and account? <Link to='/register'>Register here</Link></Typography>

                <Typography component='h4' variant='h6'>Or</Typography>
                <Button onClick={() => continueAsGuest()}>Continue as Guest</Button>
            </Container>
        </>
    )
}

export default Login