import React from 'react';
import DM from '../../modules/DataManager'
import Button from '@material-ui/core/Button';

// could be as simple as a button that creates a new instance of a game in Firebase,
// with the userId of the user who clicked it as "player 1" (or some such)

// only made it a separate component in case we want to add a "search for other players" feature or something
// maybe put any future chat component here

function CreateNewGame(props) {

  const newGame = {
    datetimeCreated: 0,
    player1: 'loggedInUser OR Guest',
    player2: '',
    winner: null,
    numTurns: 0
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => DM.createNewGame(newGame)}>
        Start A New Game
      </Button>
    </>
  )
}

export default CreateNewGame;