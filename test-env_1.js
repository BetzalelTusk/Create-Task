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

function insertRandomTile(BOARD) {
  // Find all empty spots (indices where the value is 0)
  const emptySpots = []; // מקום של אפסים
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
  let randomInsert = Math.floor(Math.random() * 3) * 2; // we need to make sure that this number is only a 2 or 4
  const randomIndex = Math.floor(Math.random() * emptySpots.length);
  const [randomRow, randomCol] = emptySpots[randomIndex];
  BOARD[emptySpots[randomIndex]] = randomInsert;
}

function updateHTML() {
  document.getElementById("score").innerHTML = score;
  document.getElementById("row_0").innerHTML = BOARD[0];
  document.getElementById("row_1").innerHTML = BOARD[1];
  document.getElementById("row_2").innerHTML = BOARD[2];
  document.getElementById("row_3").innerHTML = BOARD[3];
}
