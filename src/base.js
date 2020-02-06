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

const firebaseApp = firebase.initializeApp(config);

const base = Rebase.createClass(firebaseApp.database());

const FirebaseContext = React.createContext(null);

// This is a named export
export { firebaseApp, FirebaseContext };

// This is a default export
export default base;
