import React from 'react';
import Rebase from 're-base';
import firebase from 'firebase';
import 'firebase/database'

const config = {
     apiKey: process.env.REACT_APP_API_KEY,
     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
     databaseURL: process.env.REACT_APP_DATABASE_URL,
     projectId: process.env.REACT_APP_PROJECT_ID,
     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
     appId: process.env.REACT_APP_ID
   };

// const firebaseApp {
//      constructor() {
//      firebase.initializeApp(config);

//      this.auth = firebase.auth();
//      }
// }

const firebaseApp = firebase.initializeApp(config)

const base = Rebase.createClass(firebaseApp.database());

const FirebaseContext = React.createContext(null);

const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

// This is a named export
export { firebaseApp, FirebaseContext, withFirebase };

// This is a default export
export default base;
