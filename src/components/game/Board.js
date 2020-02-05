import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faAxeBattle } from '@fortawesome/pro-solid-svg-icons';
import { faCircle } from '@fortawesome/pro-light-svg-icons'
import { faFlame, faAngry, faBowlingBall, faBat, faDragon } from "@fortawesome/pro-duotone-svg-icons";
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
         [0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0],
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

fullColumnCheck = (columnIndex) => {
     // use map to get an array of a single column
     const columnPieces = this.state.gameGrid.map(function(value,index) { return value[columnIndex]; });

     // use vanilla 'includes' method to check if there are any zeros in column
     const columnPlayable = columnPieces.includes(0);

     // return true if still playable, false if column is full
     return columnPlayable;
}


dropPiece = (columnIndex) => {
     console.log("dropPiece column: " + columnIndex);
    // check the bottom of column. if empty, change to value of whatever player's turn it is
    for (let i = this.state.gameGrid.length; i > 0; i--) {
        if (this.state.gameGrid[i - 1][columnIndex] === 0) {
            // change value at that coordinate
            this.state.gameGrid[i - 1][columnIndex] = this.whichPlayer(this.state.turnNumber);
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

     // search the grid for win condition after each players turn
     const gameGrid = this.state.gameGrid;

    return (
      <div className="game-board-area">
          <h2>Connect4!</h2>
          <div>Turn number: {this.state.turnNumber}</div>
          <div>Who's turn? Player {this.whichPlayer(this.state.turnNumber)}</div>
          <div className="board">
          <div className="action-button-area">
          <ButtonGroup size="small" variant="contained" color="primary" aria-label="small contained primary button group">
            {this.fullColumnCheck(0) ? ( <Button id="play-col-0" className="play-button" onClick={() => this.dropPiece(0)}>&darr;</Button> )
               : ( <Button id="play-col-0" className="play-button" disabled>&darr;</Button> )}
            {this.fullColumnCheck(1) ? ( <Button id="play-col-1" className="play-button" onClick={() => this.dropPiece(1)}>&darr;</Button> )
               : ( <Button id="play-col-1" className="play-button" disabled>&darr;</Button> )}
            {this.fullColumnCheck(2) ? ( <Button id="play-col-2" className="play-button" onClick={() => this.dropPiece(2)}>&darr;</Button> )
               : ( <Button id="play-col-2" className="play-button" disabled>&darr;</Button> )}
            {this.fullColumnCheck(3) ? ( <Button id="play-col-3" className="play-button" onClick={() => this.dropPiece(3)}>&darr;</Button> )
               : ( <Button id="play-col-3" className="play-button" disabled>&darr;</Button> )}
            {this.fullColumnCheck(4) ? ( <Button id="play-col-4" className="play-button" onClick={() => this.dropPiece(4)}>&darr;</Button> )
               : ( <Button id="play-col-4" className="play-button" disabled>&darr;</Button> )}
            {this.fullColumnCheck(5) ? ( <Button id="play-col-5" className="play-button" onClick={() => this.dropPiece(5)}>&darr;</Button> )
               : ( <Button id="play-col-5" className="play-button" disabled>&darr;</Button> )}
            {this.fullColumnCheck(6) ? ( <Button id="play-col-6" className="play-button" onClick={() => this.dropPiece(6)}>&darr;</Button> )
               : ( <Button id="play-col-6" className="play-button" disabled>&darr;</Button> )}
          </ButtonGroup>
          </div>
          {gameGrid.map((row, index) => {
           return (
            <div key={index} className={"board-row row-"+ index}>
                 {row.map((cell) => {
                      let cellClass = 'empty';
                      let cellContent = <div className="icon-area blank"><FontAwesomeIcon icon={faCircle} size='2x' /></div>;
                      if(cell === 1) {
                           cellClass = 'player-1';
                           cellContent = <div className="icon-area dragon"><FontAwesomeIcon icon={faDragon} size='2x' /></div>;
                      } else if(cell === 2) {
                           cellClass = 'player-2';
                           cellContent = <div className="icon-area axe"><FontAwesomeIcon icon={faAxeBattle} size='2x' /></div>;
                      }

                  return (
                   <span key={shortid.generate()} className={"cell " + cellClass}>{cellContent}</span>
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
