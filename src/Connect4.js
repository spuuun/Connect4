// renamed App.js to Connect4.js
// we can change the name of the component if we want

import React from 'react';
import Navbar from './components/nav'
import ApplicationViews from './components/ApplicationViews'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <ApplicationViews />
    </>

  );
}

export default App;
