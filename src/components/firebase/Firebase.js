import React from 'react';
import app from 'firebase/app';
import 'firebase/database'
import 'firebase/auth'

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.database = app.database();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // create user w/ github
        //
        //
        //

    // sign in user w/ github
    authenticateGithub = () => {
        console.log("Authenticate with Github");
        const authProviderGithub = new this.auth.GithubAuthProvider();
        this
            .auth()
            .signInWithPopup(authProviderGithub);
            //  .then(this.authHandler);
   };
   

    // create user w/ google
        //
        //
        //
    
    // sign in user w/ google
    authenticateGoogle = () => {
        console.log("Authenticate with Google");
        const authProviderGoogle = new this.auth.GoogleAuthProvider();
        this
            .auth()
            .signInWithPopup(authProviderGoogle);
            //  .then(this.authHandler);
   };

    // create guest user???
}

const FirebaseContext = React.createContext(null);

const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export { FirebaseContext, withFirebase };

export default Firebase;

