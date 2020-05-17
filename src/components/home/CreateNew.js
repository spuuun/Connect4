import React from 'react';
import Button from '@material-ui/core/Button';

// could be as simple as a button that creates a new instance of a game in Firebase,
// with the userId of the user who clicked it as "player 1" (or some such)

// only made it a separate component in case we want to add a "search for other players" feature or something
// maybe put any future chat component here

function Home(props) {

  console.log('PROPS OBJ in HOME component: ', props)

  return (
    <>
      <h1>CONNECT 4!</h1>

      <Button variant="contained" color="primary">
        Start A New Game
      </Button>

      {/* INCLUDE ACTIVE GAMES COMPONENT HERE */}

    </>
  )
}

export default Home;