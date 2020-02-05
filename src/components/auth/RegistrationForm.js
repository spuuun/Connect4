// Register new user form

// include:
    //  1. registration form --- creates new user in firebase storage; redirects to home page

import React from 'react';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { firebaseApp } from '../../base';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
 root: {
   '& .MuiTextField-root': {
     margin: theme.spacing(1),
     width: 200,
   },
 },
}));


class Register extends React.Component {
    constructor(props) {
         super(props);
         this.state = {
           email: '',
           password: '',
           passwordConfirm: '',
           username: '',
           error: null,
         };

         console.log(this.props);
    }


handleInputChange = (event) => {
     this.setState({ [event.target.name]: event.target.value });
     //console.log(event.target.value);
};

handleEmailSubmit = (event) => {
     event.preventDefault();
     console.log('Registration submitted');
     const { email, password } = this.state;
     console.log(this.state);
firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
         // add new user to App-->state and Firebase
         //this.props.registerNewUser(user);
         console.log(user)
    })
    .catch((error) => {
      this.setState({ error: error });
    });
};



authHandler = async (authData) => {
     console.log(authData);
};


authenticateGithub = () => {
     console.log("Authenticate with Github");
     const authProviderGithub = new firebase.auth.GithubAuthProvider();
     firebaseApp
          .auth()
          .signInWithPopup(authProviderGithub)
          .then(this.authHandler);
};


authenticateGoogle = () => {
     console.log("Authenticate with Google");
     const authProviderGoogle = new firebase.auth.GoogleAuthProvider();
     firebaseApp
          .auth()
          .signInWithPopup(authProviderGoogle)
          .then(this.authHandler);
};



    render() {

         const { email, password, error } = this.state;
         //console.log(this.props.registerNewUser);

         return (
              <div className="login-form-area">
              <h2><div>Enter your information below</div><div>to register for your free Connect4 account:</div></h2>
              {error ? (
                    <div>{error.message}</div>
              ) : null}

              <div><Button variant="contained" color="primary" type="submit" onClick={this.authenticateGoogle}>Login with your Google Account</Button></div>
              <div><Button variant="contained" color="primary" type="submit" onClick={this.authenticateGithub}>Login with your Github Account</Button></div>


              <p>... or enter your email and password below to register:</p>
              <form id="registration-form" onSubmit={this.handleEmailSubmit}>
                   <div className="registration-area">
                        <TextField
                            id="login-form-email"
                            name="email"
                            label="Email"
                            required
                            value={this.email}
                            onChange={this.handleInputChange}
                            />
                        <TextField
                            id="login-form-username"
                            name="username"
                            label="Username"
                            required
                            value={this.username}
                            onChange={this.handleInputChange}
                            />
                       </div>
                       <div className="registration-area">
                         <TextField
                         id="login-form-password"
                         type="password"
                         name="password"
                         label="Password"
                         required
                         placeholder="Password"
                         value={this.password}
                         onChange={this.handleInputChange}
                         />
                         <TextField
                         id="login-form-passwordConfirm"
                         type="password"
                         name="passwordConfirm"
                         label="Password Confirmation"
                         required
                         placeholder="enter your password again to confirm"
                         value={this.passwordConfirm}
                         onChange={this.handleInputChange}
                         />
                      </div>
                      <Button variant="contained" color="secondary" type="submit">Register Now</Button>
                      </form>
            </div>
         );

    }

}

export default Register;
