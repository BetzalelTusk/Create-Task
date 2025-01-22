let BOARD = [];
const DIMENSION = 4; // 4x4 board
let gameStat = true;
let score;

const MOVES = {
  // Tzarich Iyun
  UP: "up",
  DOWN: "down",
  RIGHT: "right",
  LEFT: "left",
};

// If there are no possible moves - gameStat = false. Ends game
/*    if(gameStat === false){
        displayScore();
        dont allow anymore user input (although this is unneccasary because the unserinput wont work as there are no more possible moves);
      }
*/

// Main Game Logic - Where we call the functions
//while (gameStat === true) {

//}
//-----------------Functions from here and down-----------------

/**
 * initBoard resets the game board. (fills it with 0's)
 * It is not being used anywhere at the moment.
 */
function initBoard() {
  for (let i = 0; i < DIMENSION; i++) {
    if (BOARD[i] !== undefined) {
      BOARD[i] = [];
    } else {
      BOARD.push([]); // Into the 2nd dimension!!
    }
    for (let j = 0; j < DIMENSION; j++) {
      BOARD[i].push(Math.floor(Math.random() * DIMENSION));
    }
  }
  // This is where we are going to push the new random tiles
  /*let rnpY = Math.floor(Math.random() * DIMENSION); // random num placement
  let rnpX = Math.floor(Math.random() * DIMENSION); // random num placement
  if (BOARD[rnpX][rnpY] !== 0) {
    BOARD[rnpX][rnpY] = Math.floor(Math.random() * DIMENSION);
  }*/
  updateHTML();
}

let userInput = 0;
function buttonClickR() {
  userInput = 1;
  userMove(userInput);
  console.log(userInput);
  updateHTML();
}
function buttonClickL() {
  userInput = 2;
  userMove(userInput);
  console.log(userInput);
  updateHTML();
}
function buttonClickD() {
  userInput = 3;
  userMove(userInput);
  console.log(userInput);
  updateHTML();
}
function buttonClickU() {
  userInput = 4;
  userMove(userInput);
  console.log(userInput);
  updateHTML();
}

function userMove(userInput) {
  for (let i = 0; i < DIMENSION; i++) {
    // To filter through each row - BOARD[i](with an eventual[j])
    if (userInput == 1) {
      //right
      for (let j = DIMENSION - 1; j >= 0; j--) {
        for (let k = 0; k < 4; k++) {
          zeroSwap(i, j, userInput);
        }
      }
    } else if (userInput == 2) {
      //left
      for (let j = 0; j < DIMENSION; j++) {
        // Start from leftmost non-edge cell
        for (let k = 0; k < 4; k++) {
          zeroSwap(i, j, userInput);
        }
      }
    } else if (userInput == 3) {
      //down
      // Introduce the transpose function and apply right logic
      BOARD = transpose(BOARD);
      for (let j = DIMENSION - 1; j >= 0; j--) {
        for (let k = 0; k < 4; k++) {
          zeroSwap(i, j, userInput);
        }
      }
      BOARD = transpose(BOARD);
    } else if (userInput == 4) {
      //up
      // Introduce the transpose function and apply left logic
      BOARD = transpose(BOARD);
      for (let j = 0; j < DIMENSION; j++) {
        // Start from leftmost non-edge cell
        for (let k = 0; k < 4; k++) {
          zeroSwap(i, j, userInput);
        }
      }
      BOARD = transpose(BOARD);
    }
  }
  updateHTML();
}

//  ---------->> Fix bug that requires "K" loop above <<----------
// -- dont call program finished until figure out what the bug is --

function zeroSwap(i, j, userInput) {
  if (userInput === MOVES.RIGHT || userInput === MOVES.DOWN) {
    // Move non-zero value to the right as long as there's a zero to its right
    while (j + 1 < DIMENSION && BOARD[i][j + 1] === 0) {
      [BOARD[i][j], BOARD[i][j + 1]] = [BOARD[i][j + 1], BOARD[i][j]];
      j++;
    }
  } else if (userInput === MOVES.LEFT || userInput === MOVES.UP) {
    //As it is the same brains for left and up, we make the condition for this statement either left or up
    // Move non-zero value to the left as long as there's a zero to its left
    while (j < DIMENSION - 1 && BOARD[i][j] === 0) {
      //Make sure to look over this while statement. i dont think its the right logic.
      [BOARD[i][j], BOARD[i][j + 1]] = [BOARD[i][j + 1], BOARD[i][j]];
      j++;
    }
  }
}

function merge(i, j, userInput) {
  //we must convert up and down to right and left, because at the end of the day up and down are just right and left but transposed.
  if (userInput === MOVES.RIGHT && j === j - 1) {
    // j + 1 will = j * 2, and j becomes 0. Don't forget to move this zero to the left after the merge occurs.
  } else if (userInput === MOVES.LEFT) {
    // j - 1 will = j * 2, and j becomes 0. Don't forget to move this zero to the right after the merge occurs.
  } else if (userInput === MOVES.UP) {
    //uses MOVES.LEFT logic + -- DO NOT -- transpose before and after merge as we alerady transpose in userMove() function
  } else if (userInput === MOVES.DOWN) {
    //uses MOVES.RIGHT logic + -- DO NOT -- transpose before and after merge as we alerady transpose in userMove() function
  }
}

function updateHTML() {
  document.getElementById("row_0").innerHTML = BOARD[0];
  document.getElementById("row_1").innerHTML = BOARD[1];
  document.getElementById("row_2").innerHTML = BOARD[2];
  document.getElementById("row_3").innerHTML = BOARD[3];
}

function addTile() {
  let randomInsert = Math.floor(Math.random() * DIMENSION); // we need to make sure that this number is only a 2 or 4
  let randomLocation = Math.floor(Math.random() * DIMENSION);
  // we have this new let to determine where the "randomInsert" is going to go.
  //keep in mind that the location that were will be putting the "randomInsert" in MUST be a 0, as a 0 is a placeholder.
  //will work on the location part of the function later.
  return randomInsert;
}

function transpose(BOARD) {
  return BOARD[0].map((_, colIndex) => BOARD.map((row) => row[colIndex]));
}

// Pulled from createTask_3.js
function merge(i, j) {
  // Check if the next cell is the same and not already merged
  if (
    j + 1 < grid[i].length &&
    grid[i][j] === grid[i][j + 1] &&
    grid[i][j] !== 0
  ) {
    grid[i][j + 1] = grid[i][j] + grid[i][j]; // Merge the values
    grid[i][j] = 0; // Clear the original cell
    zeroSwap(i, j); // Ensure the tiles are in the correct positions after merging
  }
}
