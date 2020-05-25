import base,{ firebaseApp } from '../../base'
import React, { Component } from 'react'
import CreateNewGame from './CreateNewGame'
import OpenGameEntry from '../game/openGameEntry'
import DM from '../../modules/DataManager'
import {Button} from '@material-ui/core'

export default class OpenGameList extends Component {
  
state = {
  openGames: []
}

  componentDidMount() {
    base.listenTo('games', {
      context: this,
      asArray: true,
      then(gamesList) {
        console.log("GAMES LIST UPDATED");
        console.log("VALUES OF gamesList PARAMETER",gamesList);

        const openGamesList = gamesList.filter(game => game.player2 === '')
        this.setState({openGames: openGamesList})
        // write and call a funtion to update the list of open games 
        
      },
      onFailure() {
        console.log('failed to read list of open games')
      }
    })
  }
  
 joinGame = id => {
  var newPlayer = 'newPlayer' // set equal to WHOEVER THE ACTIVE USER IS
  DM.addPlayerToOpenGame(id, newPlayer)
  // notify other user and redirect both players to new active game page
 }

  render() {
    console.log('OGL STATE', this.state)

    return (
      <>
      <h2>
        Open Games
      </h2>
      {this.state.openGames.map(g => OpenGameEntry(g))}
      </>
    )
  }
}

// function OpenGameEntry(game, player2) {
//   console.log("game entry", game)

//   const joinGame = id => {

//   }

//   return (
//     <>
//       <p>
//         <div>
//           {game.player1}
//         </div>

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => this.joinGame(game.id)}
//         // id={game.key}
//         >
//         Join Game 
//     </Button>
//     </p>
//     </>
//   )
// }