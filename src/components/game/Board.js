import React from 'react';
import Timer from '../timer/Timer'
//import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import {  } from '@fortawesome/pro-solid-svg-icons';
import { faAxeBattle, faCircle, faChevronDown } from '@fortawesome/pro-solid-svg-icons'
import { faDragon } from "@fortawesome/pro-duotone-svg-icons";
import DM from '../../modules/DataManager'
//import { database } from "firebase"

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
              winner: null
         };

     }

componentDidMount(){
     // const openGames = DM.getOpenGames();
     // console.log('OPEN GAMES', openGames)
     // console.log('Board mounted');

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
     const gameGrid = this.state.gameGrid;
     const columnIndex = e.currentTarget.value;
     //console.log("dropPiece column: " + columnIndex);
    // check the bottom of column. if empty, change to value of whatever player's turn it is
    for (let i = gameGrid.length; i > 0; i--) {
        if (gameGrid[i - 1][columnIndex].value === 0) {
            // change value at that coordinate
            gameGrid[i - 1][columnIndex].value = this.whichPlayer(this.state.turnNumber);
            gameGrid[i - 1][columnIndex].turnNumber = this.state.turnNumber;
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

     //console.log("winCheck");
     console.log(gameGrid);

     let fullRows = [];

     // check rows
     gameGrid.forEach(
          row => {
               let rowArray = [];

               row.forEach( cell => rowArray.push(cell.value));
               let numZeros = rowArray.filter(z => z === 0).length;

               // check if the row is full
               if( numZeros === 0 ) { fullRows.push('full'); console.log( fullRows ); console.log( fullRows.length ); }
               // check if the number of full rows = 6, if so, call it a draw
               if(  fullRows.length === 6 ) {
                    console.log("DRAW NO WINNER");
                    this.setState({
                        winner: { name: 'Draw', player: 'draw'},
                      });
               }

               if( numZeros < 4 ) {

                    // Player 1 test
                    const playerOnePieceTotal = rowArray.filter(z => z === 1).length;
                    if( playerOnePieceTotal > 3 ) {
                         if( this.checkFourInARow(rowArray) ) {
                              this.setState({
                                       winner: { name: 'Dragons', player: 'player1'},
                                     });
                         }
                    }

                    // Player 2 test
                    const playerTwoPieceTotal = rowArray.filter(z => z === 2).length;
                    if( playerTwoPieceTotal > 3 ) {
                         if( this.checkFourInARow(rowArray) ) {
                              this.setState({
                                       winner: { name: 'Axes', player: 'player2'},
                                     });
                         }
                    }

               }
          }
     );

     // check columns
     for (let i = 0; i < 7; i++) {
          const column = this.state.gameGrid.map(function(value,index) { return value[i].value; });
          this.submitForTesting(column);
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

submitForTesting = (array) => {

     let numZeros = array.filter(z => z === 0).length;
     if( numZeros < 3 ) {

          // Player 1 test
          const playerOnePieceTotal = array.filter(z => z === 1).length;
          if( playerOnePieceTotal > 3 ) {
               //console.log("Player One Check (col): " + this.checkFourInARow(winCheckDiagonal));
               if( this.checkFourInARow(array) ) {
                    this.setState({
                             winner: { name: 'Dragons', player: 'player1'},
                         });
               }
          }

          // Player 2 test
          const playerTwoPieceTotal = array.filter(z => z === 2).length;
          if( playerTwoPieceTotal > 3 ) {
               //console.log("Player Two Check (col): " + this.checkFourInARow(winCheckDiagonal));
               if( this.checkFourInARow(array) ) {
                    this.setState({
                             winner: { name: 'Axes', player: 'player2'},
                         });
               }
          }

     } else { return; }
}

// Checks 4 diagonals, from 0,5 to 3,5
// Y-0    0 0 0 0 0 / /
// Y-1    0 0 0 0 / / /
// Y-2    0 0 0 / / / /
// Y-3    0 0 / / / / 0
// Y-4    0 / / / / 0 0
// Y-5    / / / / 0 0 0
//
// X       0 1 2 3 4 5 6
transformDiagonalPhase1 = () => {
     for (let xCoord = 0; xCoord <= 6; xCoord++) {
          let x = xCoord;
          let coordinateArray = [];

          for (let yCoord = 5; yCoord >= 0; yCoord--) {
               if( x > 6 ) break;
               let y = yCoord;
               coordinateArray.push({x,y});
               x++;
          }

          if( coordinateArray.length < 4 ) break;

          // get values from coordinate array, then submitForTesting
          let winCheckDiagonal = [];
          coordinateArray.forEach(
               coordinate => {
                    const getXColumnArray = this.state.gameGrid.map(function(value,index) { return value[coordinate.x].value; });
                    const getYRowValue = getXColumnArray[coordinate.y];
                    winCheckDiagonal.push(getYRowValue);

                    this.submitForTesting(winCheckDiagonal);

               }
          );
     }
}

// Checks 1 diagonal, from 0,4 to 4,0
// Y-0    0 0 0 0 / 0 0
// Y-1    0 0 0 / 0 0 0
// Y-2    0 0 / 0 0 0 0
// Y-3    0 / 0 0 0 0 0
// Y-4    / 0 0 0 0 0 0
// Y-5    0 0 0 0 0 0 0
//
// X       0 1 2 3 4 5 6

transformDiagonalPhase2 = () => {
     for (let xCoord = 0; xCoord <= 6; xCoord++) {
          let x = xCoord;
          let coordinateArray = [];

          for (let yCoord = 4; yCoord >= 0; yCoord--) {
               if( x > 6 ) break;
               let y = yCoord;
               coordinateArray.push({x,y});
               x++;
          }

          if( coordinateArray.length < 4 ) break;

          // get values from coordinate array, then submitForTesting
          let winCheckDiagonal = [];
          coordinateArray.forEach(
               coordinate => {
                    const getXColumnArray = this.state.gameGrid.map(function(value,index) { return value[coordinate.x].value; });
                    const getYRowValue = getXColumnArray[coordinate.y];
                    winCheckDiagonal.push(getYRowValue);

                    this.submitForTesting(winCheckDiagonal);

               }
          );
     }
}

// Checks 1 diagonal, from 0,3 to 3,0
// Y-0    0 0 0 / 0 0 0
// Y-1    0 0 / 0 0 0 0
// Y-2    0 / 0 0 0 0 0
// Y-3    / 0 0 0 0 0 0
// Y-4    0 0 0 0 0 0 0
// Y-5    0 0 0 0 0 0 0
//
// X       0 1 2 3 4 5 6

transformDiagonalPhase3 = () => {
     for (let xCoord = 0; xCoord <= 6; xCoord++) {
          let x = xCoord;
          let coordinateArray = [];

          for (let yCoord = 3; yCoord >= 0; yCoord--) {
               if( x > 6 ) break;
               let y = yCoord;
               coordinateArray.push({x,y});
               x++;
          }

          if( coordinateArray.length < 4 ) break;

          // get values from coordinate array, then submitForTesting
          let winCheckDiagonal = [];
          coordinateArray.forEach(
               coordinate => {
                    const getXColumnArray = this.state.gameGrid.map(function(value,index) { return value[coordinate.x].value; });
                    const getYRowValue = getXColumnArray[coordinate.y];
                    winCheckDiagonal.push(getYRowValue);

                    this.submitForTesting(winCheckDiagonal);

               }
          );
     }
}

// Checks 4 diagonals, from 0,0 to 6,3
// Y-0    \ \ \ \ 0 0 0
// Y-1    0 \ \ \ \ 0 0
// Y-2    0 0 \ \ \ \ 0
// Y-3    0 0 0 \ \ \ \
// Y-4    0 0 0 0 \ \ \
// Y-5    0 0 0 0 0 \ \
//
// X       0 1 2 3 4 5 6

transformDiagonalPhase4 = () => {
     for (let xCoord = 0; xCoord <= 6; xCoord++) {
          let x = xCoord;
          let coordinateArray = [];

          for (let yCoord = 0; yCoord <= 5; yCoord++) {
               if( x > 6 ) break;
               let y = yCoord;
               coordinateArray.push({x,y});
               x++;
          }

          if( coordinateArray.length < 4 ) break;

          // get values from coordinate array, then submitForTesting
          let winCheckDiagonal = [];
          coordinateArray.forEach(
               coordinate => {
                    const getXColumnArray = this.state.gameGrid.map(function(value,index) { return value[coordinate.x].value; });
                    const getYRowValue = getXColumnArray[coordinate.y];
                    winCheckDiagonal.push(getYRowValue);

                    this.submitForTesting(winCheckDiagonal);

               }
          );
     }
}

// Checks 1 diagonal, from 0,1 to 4,0
// Y-0    0 0 0 0 0 0 0
// Y-1    \ 0 0 0 0 0 0
// Y-2    0 \ 0 0 0 0 0
// Y-3    0 0 \ 0 0 0 0
// Y-4    0 0 0 \ 0 0 0
// Y-5    0 0 0 0 \ 0 0
//
// X       0 1 2 3 4 5 6

transformDiagonalPhase5 = () => {
     for (let xCoord = 0; xCoord <= 6; xCoord++) {
          let x = xCoord;
          let coordinateArray = [];

          for (let yCoord = 1; yCoord <= 5; yCoord++) {
               if( x > 6 ) break;
               let y = yCoord;
               coordinateArray.push({x,y});
               x++;
          }

          if( coordinateArray.length < 4 ) break;

          // get values from coordinate array, then submitForTesting
          let winCheckDiagonal = [];
          coordinateArray.forEach(
               coordinate => {
                    const getXColumnArray = this.state.gameGrid.map(function(value,index) { return value[coordinate.x].value; });
                    const getYRowValue = getXColumnArray[coordinate.y];
                    winCheckDiagonal.push(getYRowValue);

                    this.submitForTesting(winCheckDiagonal);

               }
          );
     }
}

// Checks 1 diagonal, from 0,2 to 3,0
// Y-0    0 0 0 0 0 0 0
// Y-1    0 0 0 0 0 0 0
// Y-2    \ 0 0 0 0 0 0
// Y-3    0 \ 0 0 0 0 0
// Y-4    0 0 \ 0 0 0 0
// Y-5    0 0 0 \ 0 0 0
//
// X       0 1 2 3 4 5 6

transformDiagonalPhase6 = () => {
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

          // get values from coordinate array, then submitForTesting
          let winCheckDiagonal = [];
          coordinateArray.forEach(
               coordinate => {
                    const getXColumnArray = this.state.gameGrid.map(function(value,index) { return value[coordinate.x].value; });
                    const getYRowValue = getXColumnArray[coordinate.y];
                    winCheckDiagonal.push(getYRowValue);

                    this.submitForTesting(winCheckDiagonal);

               }
          );
     }
}

render() {

     //const turnNumber = this.state.turnNumber - 1;
     const gameGrid = this.state.gameGrid;
     const columnButtons = [];

     for (var i = 0; i <= 6; i++) {
          if( this.fullColumnCheck(i) && !this.state.winner )  {
               columnButtons.push( <Button id={"play-col-" + i} className="play-button" key={i} onClick={(e) =>{ this.dropPiece(e)}} value={i} ><FontAwesomeIcon icon={faChevronDown} /></Button> );
          } else {
               columnButtons.push( <Button id={"play-col-" + i} className="play-button" key={i} disabled><FontAwesomeIcon icon={faChevronDown} /></Button> );
          }
     }

     let winner = null;
     let winnerBoardClass = ' winner-none';
     if( this.state.winner ) {
          winner = <div className="announcement winner"><h3>WINNER: {this.state.winner.name}! 🎉🎉🎉</h3></div>;
          winnerBoardClass = ' winner-' + this.state.winner.player;

          // custom message for a draw
          if( this.state.winner.player === 'draw' ) {
               winner = <div className="announcement winner draw"><h3>This game was a draw.</h3></div>;
               winnerBoardClass = ' winner-draw';
          }
     }

    return (
      <div className="game-board-area">
          <h2>Connect4!</h2>
               {winner}
          <div className="game-meta-area">
               <div className="game-meta turn-number">Turn number: {this.state.turnNumber}</div>
               <div className="game-meta whose-turn">Who's turn? Player {this.whichPlayer(this.state.turnNumber)}</div>
          </div>
          <div className={"board" + winnerBoardClass}>
          <div className="action-button-area">
          { !this.state.winner &&
               <ButtonGroup size="small" variant="contained" color="primary" aria-label="small contained primary button group">
                    { columnButtons }
               </ButtonGroup>
          }
          </div>
          
          {gameGrid.map((row, index) => {
           return (
            <div key={index} className={"board-row row-"+ index}>
                 {row.map((cell) => {
                      let animate = '';
                      if( cell.turnNumber+1 === this.state.turnNumber ) { animate = ' animate'; } else { animate = ''; }
                      let cellClass = 'empty';
                      let cellContent = <div className={"icon-area blank"}><FontAwesomeIcon icon={faCircle} size='2x' /></div>;
                      if(cell.value === 1) {
                           cellClass = 'player-1' + animate;
                           cellContent = <div className={"icon-area dragon turn-" + cell.turnNumber }><FontAwesomeIcon icon={faDragon} size='2x' /></div>;
                      } else if(cell.value === 2) {
                           cellClass = 'player-2' + animate;
                           cellContent = <div className={"icon-area axe turn-" + cell.turnNumber }><FontAwesomeIcon icon={faAxeBattle} size='2x' /></div>;
                      }

                  return (
                   <span key={shortid.generate()} className="board-single-container"><span key={shortid.generate()} className={"cell " + cellClass}>{cellContent}</span></span>
                  )
                 })}
            </div>
           )
          })}
          </div>
          <Timer/>
      </div>
     );

  }

}

export default Board