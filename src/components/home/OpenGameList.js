import base,{ firebaseApp } from '../../base'
import React, { Component } from 'react'
import CreateNewGame from '../home/CreateNew'

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
  


  render() {
    console.log('OGL STATE', this.state)

    // one open gameItem === player1 name, 'Join Game' button
    // render: list of open gameItems 

    return (
      <>
      {/* for testing purposes: */}
      <CreateNewGame/>

      <div>
        openGames
    {this.state.openGames.forEach(g => <p>{g.player1}</p>)}
      </div>
      </>
    )
  }
}



// a list of open (aka pending) games --- ones waiting on a second player to join
// i'm envisioning a simple list of pending games, with the username of the game creator and an affordance to join on each
// to be rendered somewhere on the Home page
