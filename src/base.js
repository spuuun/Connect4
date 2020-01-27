import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
     apiKey: "AIzaSyDa1da68KtIY3pJ9uL5aU-oMlhL1ePKBvU",
     authDomain: "connect4-4a167.firebaseapp.com",
     databaseURL: "https://connect4-4a167.firebaseio.com",
     projectId: "connect4-4a167",
     storageBucket: "connect4-4a167.appspot.com",
     messagingSenderId: "272799635692",
     appId: "1:272799635692:web:0d267d9354a572b817edc9"
})

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;
