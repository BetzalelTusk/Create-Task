let BOARD = [];
const DIMENSION = 4; // 4x4 board

const MOVES = {
  // Tzarich Iyun
  UP: "up",
  DOWN: "down",
  RIGHT: "right",
  LEFT: "left",
};

initBoard();
updateHTML();

// Main Game Logic - Where we call the functions
const userInput = getMoveFromUser();
if (userInput) {
  // Ensure valid input was provided
  userMove(userInput); // Use the validated input
  updateHTML(); // Update the UI
} // This block was written with  the help of chatGPT ^w^  ...sorry, couldnt help myself.

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
      BOARD[i].push(addTile()); // I just put "J + 1 * j" to get a wider range of number. temporary different numbers until i make the insert random tile function complete
    }
  }
}

function getMoveFromUser() {
  try {
    const userInput = prompt(
      "Which direction would you like to go in? right, left, up, or down?",
    );
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

function userMove(userInput) {
  for (let i = 0; i < DIMENSION; i++) {
    // To filter through each row - BOARD[i](with an eventual[j])
    if (userInput === MOVES.RIGHT) {
      for (let j = DIMENSION - 1; j >= 0; j--) {
        zeroSwap(i, j, userInput);
      }
    } else if (userInput === MOVES.LEFT) {
      for (let j = 0; j < DIMENSION; j++) {
        // Start from leftmost non-edge cell
        zeroSwap(i, j, userInput);
      }
    } else if (userInput === MOVES.DOWN) {
      // Introduce the transpose function and apply right logic
      BOARD = transpose(BOARD);
      for (let j = DIMENSION - 1; j >= 0; j--) {
        zeroSwap(i, j, userInput);
      }
      BOARD = transpose(BOARD);
    } else if (userInput === MOVES.UP) {
      // Introduce the transpose function and apply left logic
      BOARD = transpose(BOARD);
      for (let j = 1; j < DIMENSION; j++) {
        // Start from leftmost non-edge cell
        zeroSwap(i, j, userInput);
      }
      BOARD = transpose(BOARD);
    }
  }
}

function zeroSwap(i, j, userInput) {
  if (userInput === MOVES.RIGHT || userInput === MOVES.DOWN) {
    // Move non-zero value to the right as long as there's a zero to its right
    while (j + 1 < BOARD[i].length && BOARD[i][j + 1] === 0) {
      [BOARD[i][j], BOARD[i][j + 1]] = [BOARD[i][j + 1], BOARD[i][j]];
      j++;
    }
  } else if (userInput === MOVES.LEFT || userInput === MOVES.UP) {
    //As it is the same brains for left and up, we make the condition for this statement either left or up
    // Move non-zero value to the left as long as there's a zero to its left
    while (j < BOARD[i].length - 1 && BOARD[i][j] === 0) {
      //Make sure to look over this while statement. i dont think its the right logic.
      [BOARD[i][j], BOARD[i][j + 1]] = [BOARD[i][j + 1], BOARD[i][j]];
      j++;
    }
  }
}

function merge(i, j, userInput) {
  //we must convert up and down to right and left, because at the end of the day up and down are just right and left but transposed.
  if (userInput === MOVES.RIGHT) {
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
