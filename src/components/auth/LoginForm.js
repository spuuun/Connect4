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
    const [error, setError] = useState({
        isEmailError: false,
        isPasswordError: false,
        errorMessage: ''
    })

    function handleEmailChange(e) {
        e.preventDefault
        console.log('handle email change', e.target.value)
        setLoginEmail(e.target.value)
    }
    function handlePasswordChange(e) {
        e.preventDefault
        console.log('handle pwd change', e.target.value)
        setLoginPassword(e.target.value)
    }
    function handleRememberChange(e) {
        e.preventDefault
        console.log('handle remember change', e.target.value)
        setRemember(!remember)
    }

    // function validate(values) {
    //     let errors = {};
    //     if (!values.email) {
    //         errors.email = 'a valid email address is required'
    //     }

    //     return errors
    // }

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

    function doLoginWithEmail(email, password) {
        setIsLoading(true)
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then(r => {
                console.log('SIGNIN SUCCESS. RETURN VAL', r)
                authHandler(r.user)
                return r
            })
            .catch(function (err) {
                setIsLoading(false)
                const errorCode = err.code;

                // if (errorCode === 'auth/invalid-email') {
                //     setLoginEmail('');
                //     setLoginPassword('');
                //     setRemember(false);
                //     setError({ isEmailError: true, errorMessage: 'please enter a valid email address' })
                // }
                // if (errorCode === 'auth/user-disabled') {
                //     setLoginEmail('');
                //     setLoginPassword('');
                //     setRemember(false);
                //     setError({ isEmailError: true, errorMessage: 'this account has been disabled' })
                // }
                if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
                    setLoginEmail('');
                    setLoginPassword('');
                    setRemember(false);
                    setError({
                        isEmailError: true,
                        isPasswordError: true,
                        errorMessage: 'email &/or password are incorrect or not found --- please re-enter both. if error continues, try resetting your password or creating a new account with your email'
                    })
                }
                else {
                    console.log('unhandled error, ERROR VAL', error)
                }
                //   account exists with different auth provider ?????
                return err
            }
            );

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

    function CreateUUID() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16).split("-", 1)
        )
    }

    function continueAsGuest() {
        const user = {
            uid: `Guest-${CreateUUID}`,
            displayName: `Guest-${CreateUUID()}`
        }
        // authHandler(user)
        
        sessionStorage.setItem("guestUser", user)
        props.history.push('/')


        // create random guestUserName
        // username = 'Guest' + new random GUID
        // find external API for this (l8r)

        // store guest user credentials in local and session storage
        // redirect to home page
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <div id='email-login-container' className='login-option email-login'>
                    <Typography component='h1' variant='h5'>Log in w/Email</Typography>
                    <form className='login-form'>
                        {(error.isEmailError || error.isPasswordError) && <Typography id='login-error-message'>{error.errorMessage}</Typography>}
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
                            error={error.isEmailError}
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
                            error={error.isPasswordError}
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
                        <Typography id='forgot-password-link' component='h4' variant='h6'><Link to='/resetpassword'>Forgot Password?</Link></Typography>

                        <Typography id='register-new-account-link' component='h4' variant='h6'>Don't have and account? <Link to='/register'>Register here</Link></Typography>

                    </form>
                </div>
                <hr />
                <div id='external-login-container' className='login-option external-login'>
                    <div><Button variant="contained" color="primary" type="submit" onClick={authenticateWithGoogle}>Login with your Google Account</Button></div>
                    <div><Button variant="contained" color="primary" type="submit" onClick={authenticateWithGitHub}>Login with your Github Account</Button></div>
                </div>
                <hr />
                <div id='external-login-container' className='login-option external-login'>
                    <Button
                        type='button'
                        fullWidth
                        variant='contained'
                        color='secondary'
                        onClick={() => continueAsGuest()}
                    >
                        Continue as Guest
                    </Button>
                </div>
            </Container>
        </>
    )
}

export default Login