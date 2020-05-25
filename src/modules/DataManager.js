import firebaseApp from '../base'
const remoteURL = firebaseApp.databaseURL

export default {
  async getOpenGames() {
    const r = await fetch(`https://connect4-4a167.firebaseio.com/games.json`)
    const data = await r.body.getReader()
    // console.log("value after getreader", data)
    return r
    // data.
      // .then(allGames => allGames.map(game => game.player2 === null))
  },
  async createNewGame(newGame) {
    const r = await fetch(`https://connect4-4a167.firebaseio.com/games.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newGame)
    })
    return await r.json()
  },
  async addPlayerToOpenGame(gameId, player) {
    const r = await fetch(`https://connect4-4a167.firebaseio.com/games/${gameId}.json` ,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({'player2': player})
    })
    return 
  }
}


// module that's responsible for all data operations
// all database calls and functions live here
