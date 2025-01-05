const BOARD = [];
const DIMENSION = 4; // 4x4 board

const MOVES = {
  // Tzarich Iyun
  UP: "up",
  DOWN: "down",
  RIGHT: "right",
  LEFT: "left",
};

const RoL = { //Right or Left
  RIGHT: "right",
  LEFT: "left",
};

/**
 * initBoard resets the game board. (fills it with 0's)
 * It is not being used anywhere at the moment.
 */
function initBoard() {
    for (let i = 0; i < DIMENSION; i++) {
      if (BOARD[i] !== undefined) BOARD[i] = [];
      else BOARD.push([]); // Into the 2nd dimension!!
      for (let j = 0; j < DIMENSION; j++) {
        BOARD[i].push(0);
      }
    }
  }

function getMoveFromUser(){
  
  const userInput = prompt("Which direction would you like to gon in? right, left, up, or down?");
  let direction = userInput;
  if(userInput === null){ //If the user did not put anything into the prompt:
    throw new Error("YOU MUST INPUT CORRECTLY OR DIE")
  }
  
  const possibleMoves = Object.values(MOVES); //This will be plugged into the move function later

  //If the input is not included in MOVES: Throw error
  if (possibleMoves.includes(userInput) === flase){
    throw new Error("YOU MUST CHOSE BETTER OR DIE");
  }

  return userInput;
}

if(possibleMoves.includes(direction) === true){
  userMove(direction)
}

function userMove(direction) {
  for (let i = 0; i < DIMENSION; i++) {
    if (direction === MOVES.RIGHT) {
      for (let j = DIMENSION - 1; j >= 0; j--) { 
        zeroSwap(i, j, RoL.RIGHT);
      }
    } else if (direction === MOVES.LEFT) {
      for (let j = 1; j < DIMENSION; j++) { // Start from leftmost non-edge cell
        zeroSwap(i, j, RoL.LEFT);
      }
    }
  }
}


function zeroSwap(i, j, RoL) {
  if (RoL === RoL.RIGHT) {
    // Move non-zero value to the right as long as there's a zero to its right
    while (j + 1 < BOARD[i].length && BOARD[i][j + 1] === 0) {
      [BOARD[i][j], BOARD[i][j + 1]] = [BOARD[i][j + 1], BOARD[i][j]];
      j++;
    }
  } else if (RoL === RoL.LEFT) {
    // Move non-zero value to the left as long as there's a zero to its left
    while (j - 1 >= 0 && BOARD[i][j - 1] === 0) {
      [BOARD[i][j], BOARD[i][j - 1]] = [BOARD[i][j - 1], BOARD[i][j]];
      j--;
    }
  }
}
