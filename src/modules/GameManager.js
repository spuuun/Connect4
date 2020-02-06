// responsible for games resource in firebase db -- accesible at `${remoteURL}/games.json`
const remoteURL = process.env.REACT_APP_DATABASE_URL

const mapFBData = (data) => {
    return Object.keys(data)
        .map(key => {
            return { id: key, ...data[key] }
        });
}

export default {
// get all pending games
getAllGames() {
    return fetch(`${remoteURL}/games.json`)
    .then(result => result.json())
    .then(r => mapFBData(r))
},

// get all previous games for a given user
// getAllGamesForOneUser() {
//     return fetch(`${remoteURL}/games.json`)
// }

// create new 'pending' game --- takes a userId as arg
createNewGame(userId) {
    const newGame = {
        datetimeCreated: Date.now(),
        numTurns: 0,
        player1: userId,
        player2: "",
        winner: ""
    }
    return fetch(`${remoteURL}/games.json`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(newGame)})
        .then(res => res.json())
}

// update pending game with a second player --- takes a userId as arg

// update active game --- when win conditions are met, declare and save userId of winner
}