import React from 'react';
import DM from '../../modules/DataManager'
import Button from '@material-ui/core/Button';

function joinGame(gameId) {
  // notify player1 that game has been joined
  DM.addPlayerToOpenGame(gameId, 'newPlayer')
  // redirect to new active game
}

function OpenGameEntry(props) {
  console.log("game entry", props)



  return (
    <>
      <p>
        <div>
          {props.player1}
        </div>

      <Button
        variant="contained"
        color="primary"
        onClick={() => joinGame(props.key, 'newPlayer')}
        >
        Join Game 
    </Button>
    </p>
    </>
  )
}

export default OpenGameEntry;