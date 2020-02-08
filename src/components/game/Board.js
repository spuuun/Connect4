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
         [{value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}],
         [{value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}],
         [{value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}],
         [{value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}],
         [{value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}],
         [{value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}, {value: 0, turnNumber: 0}],
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


fullColumnCheck = (columnIndex) => {
     // use map to get an array of a single column
     const columnPieces = this.state.gameGrid.map(function(value,index) { return value[columnIndex].value; });

     // use vanilla 'includes' method to check if there are any zeros in column
     const columnPlayable = columnPieces.includes(0);

     // return true if still playable, false if column is full
     return columnPlayable;
}


dropPiece = (e) => {
     e.preventDefault();
     const columnIndex = e.currentTarget.value;
     console.log("dropPiece column: " + columnIndex);
    // check the bottom of column. if empty, change to value of whatever player's turn it is
    for (let i = this.state.gameGrid.length; i > 0; i--) {
        if (this.state.gameGrid[i - 1][columnIndex].value === 0) {
            // change value at that coordinate
            this.state.gameGrid[i - 1][columnIndex].value = this.whichPlayer(this.state.turnNumber);
            this.state.gameGrid[i - 1][columnIndex].turnNumber = this.state.turnNumber;
            break
        }
    }

    this.setState(prevState => ({
      turnNumber: prevState.turnNumber+1
     }));

     //find all the existing pieces and add a class so that they are not re-animated


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
     const turnNumber = this.state.turnNumber - 1;

     // search the grid for win condition after each players turn
     const gameGrid = this.state.gameGrid;
     const columnButtons = [];
     for (var i = 0; i <= 6; i++) {
          if( this.fullColumnCheck(i) )  {
               columnButtons.push( <Button id={"play-col-" + i} className="play-button" key={i} onClick={(e) =>{ this.dropPiece(e)}} value={i} >&darr;</Button> );
          } else {
               columnButtons.push( <Button id={"play-col-" + i} className="play-button" key={i} disabled>&darr;</Button> );
          }
     }
     //console.log(columnButtons);

     console.log(gameGrid);

    return (
      <div className="game-board-area">
          <h2>Connect4!</h2>
          <div>Turn number: {this.state.turnNumber}</div>
          <div>Who's turn? Player {this.whichPlayer(this.state.turnNumber)}</div>
          <div className="board">
          <div className="action-button-area">
          <ButtonGroup size="small" variant="contained" color="primary" aria-label="small contained primary button group">
               { columnButtons }
          </ButtonGroup>
          </div>
          {gameGrid.map((row, index) => {
           return (
            <div key={index} className={"board-row row-"+ index}>
                 {row.map((cell) => {
                      let animate = '';
                      if( cell.turnNumber+1 === this.state.turnNumber ) { animate = ' animate'; } else { animate = ''; }
                      let cellClass = 'empty';
                      let cellContent = <div className={"icon-area blank turn-" + turnNumber}><FontAwesomeIcon icon={faCircle} size='2x' /></div>;
                      if(cell.value === 1) {
                           cellClass = 'player-1' + animate;
                           cellContent = <div className={"icon-area dragon turn-" + turnNumber}><FontAwesomeIcon icon={faDragon} size='2x' /></div>;
                      } else if(cell.value === 2) {
                           cellClass = 'player-2' + animate;
                           cellContent = <div className={"icon-area axe turn-" + turnNumber}><FontAwesomeIcon icon={faAxeBattle} size='2x' /></div>;
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
