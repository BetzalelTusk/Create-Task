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
initBoard();
function getMoveFromUser() {
  try {
    const userInput = prompt("Which direction would you like to go in? right, left, up, or down?");
    if (userInput === null || userInput.trim() === "") {
      throw new Error("YOU MUST INPUT CORRECTLY OR DIE");
    }
    
    const possibleMoves = Object.values(MOVES); // Valid moves: up, down, left, right

    if (!possibleMoves.includes(userInput)) {
      throw new Error("YOU MUST CHOOSE BETTER OR DIE");
    }

    return userInput; // Return validated input
  } catch (error) {
    document.getElementById("error").textContent = error.message;
    return null; // Return null if there's an error
  }
}

// Main Game Logic
const userInput = getMoveFromUser();
if (userInput) { // Ensure valid input was provided
  userMove(userInput); // Use the validated input
  updateHTML(); // Update the UI
}


if(possibleMoves.includes(userInput) === true){
  getMoveFromUser();
  userMove(userInput);
  updateHTML();
}

function userMove(userInput) {
  for (let i = 0; i < DIMENSION; i++) {
    if (userInput === MOVES.RIGHT) {
      for (let j = DIMENSION - 1; j >= 0; j--) { 
        zeroSwap(i, j, RoL.RIGHT);
      }
    } else if (userInput === MOVES.LEFT) {
      for (let j = 1; j < DIMENSION; j++) { // Start from leftmost non-edge cell
        zeroSwap(i, j, RoL.LEFT);
      }
    } else if (userInput === MOVES.DOWN) {
      // Introduce the transpose function and apply right logic
    } else if (userInput === MOVES.UP) {
      // Introduce the transpose function and apply left logic
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

function updateHTML(){
  document.getElementById("row_0").innerHTML = BOARD[0];
  document.getElementById("row_1").innerHTML = BOARD[1];
  document.getElementById("row_2").innerHTML = BOARD[2];
  document.getElementById("row_3").innerHTML = BOARD[3];
}

/* 
Do keep in mind, that I am coding with the information that I am familiar with.
 While I am eager to learn more, I don't beleive that the way to learn more is by making my code more complicated and adapting to it.
 I will watch youtube videos and learn as much as I can, but while I am working on this project, I am going to keep things as simple as I can.
 Today I learned about try, and catch which really comes in handy when dealing with error distribution. Very neat!
 Thank you so much for all your help, i really appreciate it :)
 
*/
