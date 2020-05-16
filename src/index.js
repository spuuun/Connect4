import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Connect4';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { FirebaseContext } from './components/firebase/Firebase'
import Firebase from './components/firebase/Firebase';

// TODO
// initalize firebase here and create a new context with authenticated user for the whole application to consume

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase}>
        <Router>
            <App />
        </Router>
    </FirebaseContext.Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
