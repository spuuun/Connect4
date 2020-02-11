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

     // run winCheck here
     this.winCheck(this.state.gameGrid);

}



winCheck = (gameGrid) => {

     console.log("winCheck");
     console.log(gameGrid);
     let winner = '';

     // check rows
     gameGrid.forEach(
          row => {
               //console.log(row);
               //create new array with values only
               let rowArray = [];
               row.forEach( cell => rowArray.push(cell.value));
               //console.log(rowArray);
               let numZeros = rowArray.filter(z => z === 0).length;
               if( numZeros < 4 ) {

                    // Player 1 test
                    const playerOnePieceTotal = rowArray.filter(z => z === 1).length;
                    if( playerOnePieceTotal > 3 ) {
                         console.log("Player One Check (row): " + this.checkFourInARow(rowArray));
                         if( this.checkFourInARow(rowArray, 4) ) {
                              this.setState({
                                       winner: 'Player 1',
                                     });
                         }
                    }

                    // Player 2 test
                    const playerTwoPieceTotal = rowArray.filter(z => z === 2).length;
                    if( playerTwoPieceTotal > 3 ) {
                         console.log("Player Two Check (row): " + this.checkFourInARow(rowArray));
                         if( this.checkFourInARow(rowArray, 4) ) {
                              this.setState({
                                       winner: 'Player 2',
                                     });
                         }
                    }

               }
          }
     );

     // check columns
     for (let i = 0; i < 7; i++) {
          const column = this.state.gameGrid.map(function(value,index) { return value[i].value; });
          //console.log(column);
          let numZeros = column.filter(z => z === 0).length;
          if( numZeros < 3 ) {

               // Player 1 test
               const playerOnePieceTotal = column.filter(z => z === 1).length;
               if( playerOnePieceTotal > 3 ) {
                    console.log("Player One Check (col): " + this.checkFourInARow(column));
                    if( this.checkFourInARow(column) ) {
                         this.setState({
                                  winner: 'Player 1',
                               });
                    }
               }

               // Player 2 test
               const playerTwoPieceTotal = column.filter(z => z === 2).length;
               if( playerTwoPieceTotal > 3 ) {
                    console.log("Player Two Check (col): " + this.checkFourInARow(column));
                    if( this.checkFourInARow(column) ) {
                         this.setState({
                                  winner: 'Player 2',
                               });
                    }
               }

          }
     }


     // check Diagonals by converting each possible diagonal into an array
     this.transformDiagonalPhase1();
     this.transformDiagonalPhase2();
     this.transformDiagonalPhase3();
     this.transformDiagonalPhase4();
     this.transformDiagonalPhase5();
     this.transformDiagonalPhase6();


}


checkFourInARow = (array) => {
    var count = 0,
        value = array[0];

    return array.some(function (a) {
        if (value !== a) {
            count = 0;
            value = a;
        }
        return ++count === 4;
    });
}



// Checks 4 diagonals, from 0,5 to 3,5
transformDiagonalPhase1 = () => {

     let winCheckDiagonal = [];

     for (let xCoord = 0; xCoord <= 6; xCoord++) {
          let x = xCoord;
          let coordinateArray = [];

          for (let yCoord = 5; yCoord >= 0; yCoord--) {

               if( x > 6 ) break;
               let y = yCoord;
               //console.log(x + "," + y);
               //let x = updatedX;
               coordinateArray.push({x,y});
               x++;

          }

          if( coordinateArray.length < 4 ) break;
          console.log(coordinateArray);

          // get values from coordinate array
          winCheckDiagonal = [];
          coordinateArray.forEach(
               coordinate => {
                    //console.log(coordinate);
                    const getXColumnArray = this.state.gameGrid.map(function(value,index) { return value[coordinate.x].value; });
                    const getYRowValue = getXColumnArray[coordinate.y];
                    //console.log(getYRowValue);
                    winCheckDiagonal.push(getYRowValue);
                    console.log(winCheckDiagonal);

                    let numZeros = winCheckDiagonal.filter(z => z === 0).length;
                    if( numZeros < 3 ) {

                         // Player 1 test
                         const playerOnePieceTotal = winCheckDiagonal.filter(z => z === 1).length;
                         if( playerOnePieceTotal > 3 ) {
                              console.log("Player One Check (col): " + this.checkFourInARow(winCheckDiagonal));
                              if( this.checkFourInARow(winCheckDiagonal) ) {
                                   this.setState({
                                            winner: 'Player 1',
                                         });
                              }
                         }

                         // Player 2 test
                         const playerTwoPieceTotal = winCheckDiagonal.filter(z => z === 2).length;
                         if( playerTwoPieceTotal > 3 ) {
                              console.log("Player Two Check (col): " + this.checkFourInARow(winCheckDiagonal));
                              if( this.checkFourInARow(winCheckDiagonal) ) {
                                   this.setState({
                                            winner: 'Player 2',
                                         });
                              }
                         }

                    }

               }

          );

     }

}



// Checks 1 diagonal, from 0,4 to 4,0
transformDiagonalPhase2 = () => {

     let winCheckDiagonal = [];

     for (let xCoord = 0; xCoord <= 6; xCoord++) {
          let x = xCoord;
          let coordinateArray = [];

          for (let yCoord = 4; yCoord >= 0; yCoord--) {

               if( x > 6 ) break;
               let y = yCoord;
               //console.log(x + "," + y);
               //let x = updatedX;
               coordinateArray.push({x,y});
               x++;

          }

          if( coordinateArray.length < 4 ) break;
          console.log(coordinateArray);

          // get values from coordinate array
          winCheckDiagonal = [];
          coordinateArray.forEach(
               coordinate => {
                    //console.log(coordinate);
                    const getXColumnArray = this.state.gameGrid.map(function(value,index) { return value[coordinate.x].value; });
                    const getYRowValue = getXColumnArray[coordinate.y];
                    //console.log(getYRowValue);
                    winCheckDiagonal.push(getYRowValue);
                    console.log(winCheckDiagonal);

                    let numZeros = winCheckDiagonal.filter(z => z === 0).length;
                    if( numZeros < 3 ) {

                         // Player 1 test
                         const playerOnePieceTotal = winCheckDiagonal.filter(z => z === 1).length;
                         if( playerOnePieceTotal > 3 ) {
                              console.log("Player One Check (col): " + this.checkFourInARow(winCheckDiagonal));
                              if( this.checkFourInARow(winCheckDiagonal) ) {
                                   this.setState({
                                            winner: 'Player 1',
                                         });
                              }
                         }

                         // Player 2 test
                         const playerTwoPieceTotal = winCheckDiagonal.filter(z => z === 2).length;
                         if( playerTwoPieceTotal > 3 ) {
                              console.log("Player Two Check (col): " + this.checkFourInARow(winCheckDiagonal));
                              if( this.checkFourInARow(winCheckDiagonal) ) {
                                   this.setState({
                                            winner: 'Player 2',
                                         });
                              }
                         }

                    }

               }

          );

     }

}




// Checks 1 diagonal, from 0,3 to 3,0
transformDiagonalPhase3 = () => {

     let winCheckDiagonal = [];

     for (let xCoord = 0; xCoord <= 6; xCoord++) {
          let x = xCoord;
          let coordinateArray = [];

          for (let yCoord = 3; yCoord >= 0; yCoord--) {

               if( x > 6 ) break;
               let y = yCoord;
               //console.log(x + "," + y);
               //let x = updatedX;
               coordinateArray.push({x,y});
               x++;

          }

          if( coordinateArray.length < 4 ) break;
          console.log(coordinateArray);

          // get values from coordinate array
          winCheckDiagonal = [];
          coordinateArray.forEach(
               coordinate => {
                    //console.log(coordinate);
                    const getXColumnArray = this.state.gameGrid.map(function(value,index) { return value[coordinate.x].value; });
                    const getYRowValue = getXColumnArray[coordinate.y];
                    //console.log(getYRowValue);
                    winCheckDiagonal.push(getYRowValue);
                    console.log(winCheckDiagonal);

                    let numZeros = winCheckDiagonal.filter(z => z === 0).length;
                    if( numZeros < 3 ) {

                         // Player 1 test
                         const playerOnePieceTotal = winCheckDiagonal.filter(z => z === 1).length;
                         if( playerOnePieceTotal > 3 ) {
                              console.log("Player One Check (col): " + this.checkFourInARow(winCheckDiagonal));
                              if( this.checkFourInARow(winCheckDiagonal) ) {
                                   this.setState({
                                            winner: 'Player 1',
                                         });
                              }
                         }

                         // Player 2 test
                         const playerTwoPieceTotal = winCheckDiagonal.filter(z => z === 2).length;
                         if( playerTwoPieceTotal > 3 ) {
                              console.log("Player Two Check (col): " + this.checkFourInARow(winCheckDiagonal));
                              if( this.checkFourInARow(winCheckDiagonal) ) {
                                   this.setState({
                                            winner: 'Player 2',
                                         });
                              }
                         }

                    }

               }

          );

     }

}


// Checks 4 diagonals, from 0,0 to 6,0
transformDiagonalPhase4 = () => {

     let winCheckDiagonal = [];

     for (let xCoord = 0; xCoord <= 6; xCoord++) {
          let x = xCoord;
          let coordinateArray = [];

          for (let yCoord = 0; yCoord <= 5; yCoord++) {

               if( x > 6 ) break;
               let y = yCoord;
               console.log("transformDiagonalPhase4 - " + x + "," + y);
               //let x = updatedX;
               coordinateArray.push({x,y});
               x++;

          }

          if( coordinateArray.length < 4 ) break;
          console.log(coordinateArray);

          // get values from coordinate array
          winCheckDiagonal = [];
          coordinateArray.forEach(
               coordinate => {
                    //console.log(coordinate);
                    const getXColumnArray = this.state.gameGrid.map(function(value,index) { return value[coordinate.x].value; });
                    const getYRowValue = getXColumnArray[coordinate.y];
                    //console.log(getYRowValue);
                    winCheckDiagonal.push(getYRowValue);
                    console.log(winCheckDiagonal);

                    let numZeros = winCheckDiagonal.filter(z => z === 0).length;
                    if( numZeros < 3 ) {

                         // Player 1 test
                         const playerOnePieceTotal = winCheckDiagonal.filter(z => z === 1).length;
                         if( playerOnePieceTotal > 3 ) {
                              console.log("Player One Check (col): " + this.checkFourInARow(winCheckDiagonal));
                              if( this.checkFourInARow(winCheckDiagonal) ) {
                                   this.setState({
                                            winner: 'Player 1',
                                         });
                              }
                         }

                         // Player 2 test
                         const playerTwoPieceTotal = winCheckDiagonal.filter(z => z === 2).length;
                         if( playerTwoPieceTotal > 3 ) {
                              console.log("Player Two Check (col): " + this.checkFourInARow(winCheckDiagonal));
                              if( this.checkFourInARow(winCheckDiagonal) ) {
                                   this.setState({
                                            winner: 'Player 2',
                                         });
                              }
                         }

                    }

               }

          );

     }

}




// Checks 1 diagonal, from 0,1 to 4,0
transformDiagonalPhase5 = () => {

     let winCheckDiagonal = [];

     for (let xCoord = 0; xCoord <= 6; xCoord++) {
          let x = xCoord;
          let coordinateArray = [];

          for (let yCoord = 1; yCoord <= 5; yCoord++) {

               if( x > 6 ) break;
               let y = yCoord;
               //console.log(x + "," + y);
               //let x = updatedX;
               coordinateArray.push({x,y});
               x++;

          }

          if( coordinateArray.length < 4 ) break;
          console.log(coordinateArray);

          // get values from coordinate array
          winCheckDiagonal = [];
          coordinateArray.forEach(
               coordinate => {
                    //console.log(coordinate);
                    const getXColumnArray = this.state.gameGrid.map(function(value,index) { return value[coordinate.x].value; });
                    const getYRowValue = getXColumnArray[coordinate.y];
                    //console.log(getYRowValue);
                    winCheckDiagonal.push(getYRowValue);
                    console.log(winCheckDiagonal);

                    let numZeros = winCheckDiagonal.filter(z => z === 0).length;
                    if( numZeros < 3 ) {

                         // Player 1 test
                         const playerOnePieceTotal = winCheckDiagonal.filter(z => z === 1).length;
                         if( playerOnePieceTotal > 3 ) {
                              console.log("Player One Check (col): " + this.checkFourInARow(winCheckDiagonal));
                              if( this.checkFourInARow(winCheckDiagonal) ) {
                                   this.setState({
                                            winner: 'Player 1',
                                         });
                              }
                         }

                         // Player 2 test
                         const playerTwoPieceTotal = winCheckDiagonal.filter(z => z === 2).length;
                         if( playerTwoPieceTotal > 3 ) {
                              console.log("Player Two Check (col): " + this.checkFourInARow(winCheckDiagonal));
                              if( this.checkFourInARow(winCheckDiagonal) ) {
                                   this.setState({
                                            winner: 'Player 2',
                                         });
                              }
                         }

                    }

               }

          );

     }

}




// Checks 1 diagonal, from 0,2 to 3,0
transformDiagonalPhase6 = () => {

     let winCheckDiagonal = [];

     for (let xCoord = 0; xCoord <= 6; xCoord++) {
          let x = xCoord;
          let coordinateArray = [];

          for (let yCoord = 2; yCoord <= 5; yCoord++) {

               if( x > 6 ) break;
               let y = yCoord;
               //console.log(x + "," + y);
               //let x = updatedX;
               coordinateArray.push({x,y});
               x++;

          }

          if( coordinateArray.length < 4 ) break;
          console.log(coordinateArray);

          // get values from coordinate array
          winCheckDiagonal = [];
          coordinateArray.forEach(
               coordinate => {
                    //console.log(coordinate);
                    const getXColumnArray = this.state.gameGrid.map(function(value,index) { return value[coordinate.x].value; });
                    const getYRowValue = getXColumnArray[coordinate.y];
                    //console.log(getYRowValue);
                    winCheckDiagonal.push(getYRowValue);
                    console.log(winCheckDiagonal);

                    let numZeros = winCheckDiagonal.filter(z => z === 0).length;
                    if( numZeros < 3 ) {

                         // Player 1 test
                         const playerOnePieceTotal = winCheckDiagonal.filter(z => z === 1).length;
                         if( playerOnePieceTotal > 3 ) {
                              console.log("Player One Check (col): " + this.checkFourInARow(winCheckDiagonal));
                              if( this.checkFourInARow(winCheckDiagonal) ) {
                                   this.setState({
                                            winner: 'Player 1',
                                         });
                              }
                         }

                         // Player 2 test
                         const playerTwoPieceTotal = winCheckDiagonal.filter(z => z === 2).length;
                         if( playerTwoPieceTotal > 3 ) {
                              console.log("Player Two Check (col): " + this.checkFourInARow(winCheckDiagonal));
                              if( this.checkFourInARow(winCheckDiagonal) ) {
                                   this.setState({
                                            winner: 'Player 2',
                                         });
                              }
                         }

                    }

               }

          );

     }

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
          if( this.fullColumnCheck(i) && !this.state.winner )  {
               columnButtons.push( <Button id={"play-col-" + i} className="play-button" key={i} onClick={(e) =>{ this.dropPiece(e)}} value={i} >&darr;</Button> );
          } else {
               columnButtons.push( <Button id={"play-col-" + i} className="play-button" key={i} disabled>&darr;</Button> );
          }
     }
     //console.log(columnButtons);

     //console.log(gameGrid);

     let winner = null;
     if(  this.state.winner ) {
          winner = <div className="announcement winner"><h3>WINNER: {this.state.winner}</h3></div>;
     }

    return (
      <div className="game-board-area">
          <h2>Connect4!</h2>
               {winner}
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
