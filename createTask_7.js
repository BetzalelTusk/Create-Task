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
  // remove all "row" class elements
  const rows = document.getElementsByClassName("row");
  while (rows.length > 0) {
    rows[0].parentNode.removeChild(rows[0]);
  }
  // add `DIMENSION` rows to the '#board' element
  for (let i = 0; i < DIMENSION; i++) {
    const row = document.createElement("div");
    row.className = "row";
    row.id = "row_" + i;
    document.getElementById("board").appendChild(row);
  }

  for (let i = 0; i < DIMENSION; i++) {
    if (BOARD[i] !== undefined) {
      BOARD[i] = [];
    } else {
      BOARD.push([]); // Into the 2nd dimension!!
    }
    for (let j = 0; j < DIMENSION; j++) {
      BOARD[i].push(0);
    }
    score = 0;
  }
  // This is where we are going to push the new random tiles
  addTile(); // NOTE - We need to make sure that the two random tiles we add are not going to be in the same location. Maybe make a list of all the cordinates and subtract the cordinates each time we add a tile?
  addTile();
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
  insertRandomTile(BOARD);
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
  console.log(BOARD);
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
  console.log(BOARD);
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
  console.log(BOARD);
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
  for (let i = 0; i < DIMENSION; i++) {
    document.getElementById("row_" + i).innerHTML = BOARD[i];
  }
}

function addTile() {
  const emptySpots = [];
  for (let row = 0; row < DIMENSION; row++) {
    for (let col = 0; col < DIMENSION; col++) {
      if (BOARD[row][col] === 0) {
        emptySpots.push([row, col]);
      }
    }
  }
  // If no empty spots, do nothing
  if (emptySpots.length === 0) {
    return;
  }

  let randomInsert = Math.floor(Math.random() * 3) * 2; // we need to make sure that this number is only a 2 or 4
  while (randomInsert === 0) {
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
  }

  let randomNum = Math.floor(Math.random() * 3) * 2; // we need to make sure that this number is only a 2 or 4
  const randomIndex = Math.floor(Math.random() * emptySpots.length);
  const [randomRow, randomCol] = emptySpots[randomIndex];
  BOARD[emptySpots[randomIndex]] = randomNum;
  updateHTML();
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
 - ISSUES: it seems that the randomTile is only being inserted when the cordinates are a zero, which is what we want, but the random
   cordinates should constantly be a selection from the emptySpots[] list.
 ---------------------------------->>>>>
 */

function insertRandomTile(BOARD) {
  // Find all empty spots (indices where the value is 0)
  const emptySpots = [];
  for (let row = 0; row < DIMENSION; row++) {
    for (let col = 0; col < DIMENSION; col++) {
      if (BOARD[row][col] === 0) {
        emptySpots.push([row, col]);
      }
    }
  }
  // --------------------------------------------------------
  // If no empty spots, do nothing
  if (emptySpots.length === 0) {
    return;
  }
  // Where we select which of these 0's locations we will swap with a 2/4
  let randomNum = Math.floor(Math.random() * 3) * 2; // we need to make sure that this number is only a 2 or 4
  const randomIndex = Math.floor(Math.random() * emptySpots.length);
  const [randomRow, randomCol] = emptySpots[randomIndex];
  BOARD[emptySpots[randomIndex]] = randomNum;
  updateHTML();
}
