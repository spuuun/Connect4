// renamed App.js to Connect4.js
// we can change the name of the component if we want

import React from 'react';
import logo from './logo.svg';
import './App.css';

import RegistrationForm from './components/auth/RegistrationForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/Connect4.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Starting to work on Connect4
        </a>
      </header>
      <RegistrationForm />
    </div>
  );
}

export default App;
