import { database } from "firebase"

// actual game board --- contains 2d array comprising the "board", game logic, game pieces, etc.


// implementation of an enum --- but i don't think we need it
// const spaceState = {
//     0: "empty",
//     1: "player1",
//     2: "player2"
// }
// Object.freeze(spaceState)
state = {
    gameGrid: [],
    player1: '',
    player2: '',
    turnNumber: 0,
    winner: ''
}


const gameGrid = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
]

// on their turn player can drop a piece into a column --- unless column is full
let turnNumber = 1

const whichPlayer = numTurns => {
    if (numturns % 2 === 0) {
        return 2
    }
    else {
        return 1
    }
}

const dropPiece = (columnIndex) => {
    // check the bottom of column. if empty, change to value of whatever player's turn it is
    for (i = gameGrid.length; i > 0; i--) {
        if (gameGrid[i - 1][columnIndex] === 0) {
            // change value at that coordinate
            gameGrid[i - 1][columnIndex] = whichPlayer(turnNumber)
            break
        }
    }

    turnNumber++
}

// search the grid for win condition after each players turn 