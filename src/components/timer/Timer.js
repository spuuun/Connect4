import React, {useState} from 'react';

function Timer() {
  return (
    <div className='app'>
      <div className='time'>
        seconds
      </div>
    <div className='row'>
      <button className='button-primary'>
        Start
      </button>
      <button className='button-secondary'>
        Reset
      </button>
    </div>
    </div>
  );
};

export default Timer;