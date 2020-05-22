import React from 'react';
import CreateNewGame from '../game/CreateNewGame';
import OpenGameList from '../game/OpenGameList';

function Home(props) {

  // if user not logged in && no preference in localStorage to 'continue as Guest'
  //   redirect to login page
  // else
  return (
    <>
      <CreateNewGame />
      <OpenGameList />
    </>
  )
}

export default Home