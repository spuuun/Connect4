import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { database } from "firebase"

const shortid = require('shortid');

// actual game board --- contains 2d array comprising the "board", game logic, game pieces, etc.





class Board extends React.Component {

     constructor(props){
        super(props);
        this.state = {
              gameGrid: [],
              player1: '',
              player2: '',
              turnNumber: 0,
              winner: ''
         };

     }

componentDidMount(){

     console.log('Board mounted');

     const gameGrid = [
         [0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0],
         [0, 1, 0, 0, 0, 0, 0],
         [0, 2, 1, 0, 0, 0, 0],
         [1, 2, 2, 1, 2, 0, 0],
         [1, 2, 1, 2, 2, 1, 0],
    ];

    //let turnNumber = 1
    this.setState({
             gameGrid: gameGrid,
             turnNumber: 1
           });

}

// on their turn player can drop a piece into a column --- unless column is full
whichPlayer = numTurns => {
    if (numTurns % 2 === 0) {
        return 2
    }
    else {
        return 1
    }
}

turnCountTester = () => {
     this.setState(prevState => ({
       turnNumber: prevState.turnNumber+1
      }));
}


dropPiece = (columnIndex) => {
     console.log("dropPiece");
    // check the bottom of column. if empty, change to value of whatever player's turn it is
    for (let i = this.state.gameGrid.length; i > 0; i--) {
        if (this.state.gameGrid[i - 1][columnIndex] === 0) {
            // change value at that coordinate
            this.state.gameGrid[i - 1][columnIndex] = this.whichPlayer(this.state.turnNumber)
            break
        }
    }

    this.setState(prevState => ({
      turnNumber: prevState.turnNumber+1
     }));
}


useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


render() {


     const classes = this.useStyles;

     //let turnNumber = 1

     // search the grid for win condition after each players turn
     const gameGrid = this.state.gameGrid;

    return (
      <div className="game-board-area">
          <h2>Connect4!</h2>
          <div>Turn number: {this.state.turnNumber}</div>
          <div>Who's turn? Player {this.whichPlayer(this.state.turnNumber)}</div>
          <div className="board">
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button className="play-button" onClick={() => this.dropPiece(0)}>&darr;</Button>
            <Button className="play-button" onClick={() => this.dropPiece(1)}>&darr;</Button>
            <Button className="play-button" onClick={() => this.dropPiece(2)}>&darr;</Button>
            <Button className="play-button" onClick={() => this.dropPiece(3)}>&darr;</Button>
            <Button className="play-button" onClick={() => this.dropPiece(4)}>&darr;</Button>
            <Button className="play-button" onClick={() => this.dropPiece(5)}>&darr;</Button>
            <Button className="play-button" onClick={() => this.dropPiece(6)}>&darr;</Button>
          </ButtonGroup>

          {gameGrid.map((row, index) => {
           return (
            <div key={index} className={"board-row row-"+ index}>
                 {row.map((cell) => {
                      let cellClass = 'empty';
                      if(cell === 1) { cellClass = 'player-1'; }
                      else if(cell === 2) { cellClass = 'player-2'; }
                  return (
                   <span key={shortid.generate()} className={"cell " + cellClass}>{cell}</span>
                  )
                 })}
            </div>
           )
          })}
          </div>

      </div>
     );

  }

}

export default Board
