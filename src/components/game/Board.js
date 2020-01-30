// actual game board --- contains 2d array comprising the "board", game logic, game pieces, etc.



const spaceState = {
    0: "empty",
    1: "player1",
    2: "player2"
}
Object.freeze(spaceState)

const gameGrid = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
]

// on their turn player can drop a piece into a column --- unless column is full

// search the grid for win condition after each players turn 

const dropPiece = (columnIndex) => {
    // check if the bottom row @ columnIndex === 0 ---- if so, change it's value to whatever player's turn it is
    // if not, go to the one right above it and repeat the process  
    for (i = gameGrid.length; i > 0; i--) {
        if (gameGrid[i - 1][columnIndex] === 0) {
            // change value at that coordinate
            // break
        }
    }
    // toggle to other players turn
}