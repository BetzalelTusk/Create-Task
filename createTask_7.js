let BOARD = [];
const DIMENSION = 4; // 4x4 board
let gameStat = true;
let score = 0;

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
    score = 0;
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
  //RIGHT
  userInput = MOVES.RIGHT;
  for (let i = 0; i < DIMENSION; i++) {
    for (let j = DIMENSION - 1; j >= 0; j--) {
      for (let k = 0; k < 4; k++) {
        zeroSwap(i, j, userInput);
      }
      merge(i, j);
    }
  }
  console.log(userInput);
  console.log(BOARD);
  updateHTML();
}
function buttonClickL() {
  //LEFT
  userInput = MOVES.LEFT;
  for (let i = 0; i < DIMENSION; i++) {
    for (let j = 0; j < DIMENSION; j++) {
      for (let k = 0; k < 4; k++) {
        zeroSwap(i, j, userInput);
      }
      merge(i, j);
    }
  }
  console.log(userInput);
  updateHTML();
}
function buttonClickD() {
  //DOWN
  userInput = MOVES.DOWN;
  for (let i = 0; i < DIMENSION; i++) {
    BOARD = transpose(BOARD);
    for (let j = DIMENSION - 1; j >= 0; j--) {
      for (let k = 0; k < 4; k++) {
        zeroSwap(i, j, userInput);
      }
      merge(i, j);
    }
    BOARD = transpose(BOARD);
  }
  console.log(userInput);
  updateHTML();
}
function buttonClickU() {
  //UP
  userInput = MOVES.UP;
  for (let i = 0; i < DIMENSION; i++) {
    BOARD = transpose(BOARD);
    for (let j = 0; j < DIMENSION; j++) {
      for (let k = 0; k < 4; k++) {
        zeroSwap(i, j, userInput);
      }
      merge(i, j);
    }
    BOARD = transpose(BOARD);
  }
  console.log(userInput);
  updateHTML();
}

/*function userMove(userInput) {
  for (let i = 0; i < DIMENSION; i++) {
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
*/

//  ---------->> Fix bug that requires "K" loop above <<----------
// -- dont call program finished until figure out what the bug is --

function zeroSwap(i, j, userInput) {
  if (userInput === MOVES.RIGHT || userInput === MOVES.DOWN) {
    // Move non-zero value to the right as long as there's a zero to its right
    while (j + 1 < DIMENSION && BOARD[i][j + 1] === 0) {
      [BOARD[i][j], BOARD[i][j + 1]] = [BOARD[i][j + 1], BOARD[i][j]];
      j++;
    }
    merge(i, j);
  } else if (userInput === MOVES.LEFT || userInput === MOVES.UP) {
    //As it is the same brains for left and up, we make the condition for this statement either left or up
    // Move non-zero value to the left as long as there's a zero to its left
    while (j < DIMENSION - 1 && BOARD[i][j] === 0) {
      //Make sure to look over this while statement. i dont think its the right logic.
      [BOARD[i][j], BOARD[i][j + 1]] = [BOARD[i][j + 1], BOARD[i][j]];
      j++;
    }
    merge(i, j);
  }
}

function updateHTML() {
  document.getElementById("score").innerHTML = score;
  document.getElementById("row_0").innerHTML = BOARD[0];
  document.getElementById("row_1").innerHTML = BOARD[1];
  document.getElementById("row_2").innerHTML = BOARD[2];
  document.getElementById("row_3").innerHTML = BOARD[3];
}

function addTile() {
  let randomInsert = Math.floor(Math.random() * 3) * 2; // we need to make sure that this number is only a 2 or 4
  while (randomInsert == 0) {
    //Prevents random number from resulting in 0
    randomInsert = Math.floor(Math.random() * 3) * 2;
  }
  console.log(randomInsert + " :Insert");

  // Keep in mind that the location that were will be putting the "randomInsert" in MUST be a 0, as a 0 is a placeholder.

  let randomLocation_X = Math.floor(Math.random() * DIMENSION);
  let randomLocation_Y = Math.floor(Math.random() * DIMENSION);
  console.log(randomLocation_X + " :Locatio_X");
  console.log(randomLocation_Y + " :Location_Y");

  if (BOARD[randomLocation_Y][randomLocation_X] == 0) {
    BOARD[randomLocation_Y][randomLocation_X] = randomInsert;
    updateHTML();
  }
}

function transpose(BOARD) {
  return BOARD[0].map((_, colIndex) => BOARD.map((row) => row[colIndex]));
}

// Pulled from createTask_3.js
function merge(i, j) {
  // Check if the next cell is the same and not already merged
  if (
    j + 1 < BOARD[i].length &&
    BOARD[i][j] === BOARD[i][j + 1] &&
    BOARD[i][j] !== 0
  ) {
    BOARD[i][j + 1] = BOARD[i][j] + BOARD[i][j]; // Merge the values
    BOARD[i][j] = 0; // Clear the original cell
    zeroSwap(i, j); // Ensure the tiles are in the correct positions after merging
    score = score + BOARD[i][j] + BOARD[i][j];
  }
}

/* NOTES ----> 
 - Remove errors that revolve around user input
 - Fix scoring mech
 - Impliment randTile into init, and after every move

 --------------------------------------------------------------------
          BIG BRAIN MOOOOOVEEEE (ISNERT COW) MOOOOOOOOO
 --------------------------------------------------------------------
 
 - For random tile, we can make a list of the locations of all the 0's and chose from that list randomly. - with the help of chatGPT:
    function insertRandomTile(board) {
      // Find all empty spots (indices where the value is 0)
      const emptySpots = [];
      for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
          if (board[row][col] === 0) {
            emptySpots.push([row, col]);
          }
        }
      }

      // If no empty spots, do nothing
      if (emptySpots.length === 0) {
        return;
      }

  const randomIndex = Math.floor(Math.random() * emptySpots.length);
  const [randomRow, randomCol] = emptySpots[randomIndex];


*/
