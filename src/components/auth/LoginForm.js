import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, FormControlLabel, Typography, Checkbox, Container, TextField } from '@material-ui/core'
import { firebaseApp } from '../../base'
import firebase from 'firebase';


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

    function validate(values) {
        let errors = {};
        if (!values.email) {
            errors.email = 'a valid email address is required'
        }

        return errors
    }

    function authHandler(user) {
        sessionStorage.setItem(
            "activeUser",
            JSON.stringify({
                email: user.email,
                displayName: user.displayName,
                accountCreatedOn: user.metadata.creationTime,
                lastSignIn: user.metadata.lastSignInTime,
                photoURL: user.photoURL,
                providerData: user.providerData,
                uid: user.uid,
            })
        )

        remember === true && localStorage.setItem(
            "activeUser",
            JSON.stringify({
                email: user.email,
                displayName: user.displayName,
                accountCreatedOn: user.metadata.creationTime,
                lastSignIn: user.metadata.lastSignInTime,
                photoURL: user.photoURL,
                providerData: user.providerData,
                uid: user.uid,
            })
        )

        props.history.push('/')
    }

    async function doLoginWithEmail(email, password) {
        setIsLoading(true)
        const userLoginResponse = await firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .catch(function (error) {
                setIsLoading(false)
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("ERROR ON LOGIN", error)
                // ...
            });
        console.log('LOGIN RESPONSE OBJ', userLoginResponse.user);
        authHandler(userLoginResponse.user)

        // attempt firebase login with email
        // change error state if email and/or password are:
        //   incorrect,
        //   account doesn't exist, 
        //   account exists with different auth provider
    }

    // MAYBE IMPORT THESE FROM REGISTER COMPONENT
    async function authenticateWithGitHub() {
        console.log("Authenticate with Github");
        const authProviderGithub = new firebase.auth.GithubAuthProvider();
        const authUser = await firebaseApp.auth().signInWithPopup(authProviderGithub)
        console.log('AUTH W/GITHUB USER OBJ', authUser)
        authHandler(authUser.user);
    };

    async function authenticateWithGoogle() {
        console.log("Authenticate with Google");
        const authProviderGoogle = new firebase.auth.GoogleAuthProvider();
        const authUser = await firebaseApp.auth().signInWithPopup(authProviderGoogle)
        console.log('AUTH W/GOOGLE USER OBJ', authUser)

        authHandler(authUser.user);
    }

    function continueAsGuest() {
        // create random guestUserName --- look for external API for this
        // store guest user credentials in local and session storage
        // redirect to home page
    }

    return (
        // login with google
        // login with github

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
                    <Button
                        type='button'
                        fullWidth
                        variant='contained'
                        color='secondary'
                        onClick={() => continueAsGuest()}
                    >
                        Continue as Guest
                    </Button>
                </form>
            </Container>
            <Container>
                <div><Button variant="contained" color="primary" type="submit" onClick={authenticateWithGoogle}>Login with your Google Account</Button></div>
                <div><Button variant="contained" color="primary" type="submit" onClick={authenticateWithGitHub}>Login with your Github Account</Button></div>
            </Container>
        </>
    )
}

export default Login