import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Connect4';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'

const UserContext = React.createContext('defaultUser')
const ThemeContext = React.createContext('light')


// TODO
// initalize firebase here and create a new context with authenticated user for the whole application to consume


ReactDOM.render(
    <UserContext.Provider value="defaultValue">
        <Router>
            <App />
        </Router>
    </UserContext.Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
