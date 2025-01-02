// const BOARD = [];
const BOARD = [
  [0, 0, 0, 2],
  [0, 0, 4, 0],
  [0, 8, 0, 0],
  [16, 0, 16, 0],
];
const DIMENSION = 4; // 4x4 board

const MOVES = {
  // Tzarich Iyun
  UP: "up",
  DOWN: "down",
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

function getMoveFromUser() {
  const userInput = prompt(
    "Which direction would you like to go in? up; left; right; or down?",
  );
  if (userInput === null) {
    // The user refused to answer. This is an error.
    throw new Error("YOU MUST CHOOSE");
  }

  const possibleMoves = Object.values(MOVES);
  if (possibleMoves.includes(userInput) === false) {
    // the user gave invalid input. This is an error.
    throw new Error("YOU MUST CHOOSE BETTER");
    // } CR: Not sure why this brace is here, it causes a syntax error. (I commented it out for you)
  }

  return userInput;
}

// CR: userMoveRight and userMoveLeft are very similar.
// CR: You could probably combine them into one function like this:

/** Sample userMove function that handles both right and left moves.
 * function userMove(direction) {
 * 	zeroSwapOn(direction);
 *  if (direction === MOVES.RIGHT) {
 *    // do right stuff
 *  } else if (direction === MOVES.LEFT) {
 *   // do left stuff
 *  } else {
 *   throw new Error('Invalid direction');
 *  }
 */

function userMoveRight(i, j) {
  //will be the brains of the right move and the down move after we transpose
  zeroSwapOnRight(i, j);
  mergeRight(i, j);
  zeroSwapOnRight(i, j);
}
function userMoveLeft() {
  //will be the brains of the left move and the up move after we transpose
  zeroSwapOnLeft(i, j);
  mergeLeft(i, j);
  zerSwapOnLeft(i, j); // CR: Typo??
}

/** Sample swap function that you can incorperate (not a drop in replacement).
 * function swap(grid, direction, i, j) {
 * 	let swapDirection = 0; // 0 is a placeholder, but it also means that if
 * 	//  					  we don't have a valid direction, we won't swap
 * 	if (direction === MOVES.RIGHT) swapDirection = 1; // advance to the right (forward in the array)
 * 	else if (direction === MOVES.LEFT) swapDirection = -1; // advance to the left (backwards in the array)
 * 	else throw new Error('Invalid direction: ' + direction); // Something terrible has happened, bring this to your attn immediately
 * 	let temp = grid[i][j];
 * 	grid[i][j] = grid[i][j + swapDirection];
 * 	grid[i][j + swapDirection] = temp;
 * }
 */

//this will only work for userMoveRight // CR: This comment is a pretty good indication that
// 										   CR:  you should probably refactor this function
// 										   CR:  to be more general (i.e., handle swapping right and left)
function zeroSwapOnRight(i, j) {
  // CR: grid is not defined. This will crash the program.
  // Keep moving non-zero value to the right as long as there's a zero to its right
  while (j + 1 < grid[i].length && grid[i][j + 1] === 0) {
    // CR: Sample usage of the swap function
    // CR: swap(grid, MOVES.RIGHT, i, j);
    // CR: j++; // Move to the next position to check again

    // Swap the current value with the next zero cell
    let temp = grid[i][j];
    grid[i][j] = grid[i][j + 1];
    grid[i][j + 1] = temp;
    j++; // Move to the next position to check again
  }
}

// CR: See above comment about the swap function
function zeroSwapOnLeft(i, j) {
  while (j - 1 > -1 && grid[i][j - 1] === 0) {
    let temp = grid[i][j];
    grid[i][j] = grid[i][j - 1];
    grid[i][j - 1] = temp;
    j--; // Move to the next position to check again
  }
}

function mergeRight(i, j) {
  // Check if the next cell is the same and not already merged
  // CR: This line is very difficult to read.
  // CR: You should consider using variables to 'name' the values you're comparing.
  /** Example of how you could refactor this line:
   * let currentCell = grid[i][j];
   * let nextCell = grid[i][j + 1];
   * let cellsHaveSameValue = currentCell === nextCell;
   * let isNotZero = currentCell !== 0;
   * let rightNeighborExists = j + 1 < grid[i].length;
   *
   * if (rightNeighborExists && cellsHaveSameValue && isNotZero) {
   *  ...
   *
   * This makes it easier to read and understand what the code is doing, with just a glance.
   *
   * If you choose to not break it up into variables, you should at least add
   * comments to explain what each part of the line is doing.
   */
  if (
    j + 1 < grid[i].length &&
    grid[i][j] === grid[i][j + 1] &&
    grid[i][j] !== 0
  ) {
    grid[i][j + 1] = grid[i][j] + grid[i][j]; // Merge the values
    grid[i][j] = 0; // Clear the original cell
    zeroSwapOnRight(i, j); // Ensure the tiles are in the correct positions after merging
  }
}

// CR: See above comment about the mergeRight function
function mergeLeft(i, j) {
  //Check is the next cell is the same and not already nmerged
  if (j - 1 >= 0 && grid[i][j] === grid[i][j - 1] && grid[i][j] !== 0) {
    grid[i][j - 1] = grid[i][j] + grid[i][j]; // Merge the values
    grid[i][j] = 0; // Clear the original cell
    zeroSwapOnRight(i, j); // Ensure the tiles are in the correct positions after merging
  }
}

// CR: mergeRight and mergeLeft are very similar. The names alone are indicative of this.
// CR: This is a good indication that the functions are very similar and could be combined into one function.
// CR:
// CR: We call this DRY (Don't Repeat Yourself). If you find yourself writing the same code
// CR: in multiple places, you should consider refactoring it into a single function that can be reused.
// CR: This makes your code easier to maintain and less error-prone.
// CR: Violations of good coding practices are often referred to as "code smells".
// CR: And this is some

// ---- End of Code Review ----

/** VS Code has a bunch of extensions that can help you write better code.
 * Here's a list of some that I use, specifically for JavaScript:
 *
 * - ESLint: This will help you catch errors and enforce coding standards.
 *           I already set up the configuration for you in the eslint.config.mjs file.
 * 		     You can install it by searching for "ESLint" in the Extensions tab.
 *
 * - Prettier: This will help you format your code automatically.
 *             I also set up the configuration for you in the .prettierrc file.
 *
 * - Error Lens: This will highlight errors and warnings in your code very clearly.
 *
 * - IntelliCode: This will help you write code faster by suggesting relevant completions.
 * 				  It's smart autocomplete.
 *
 * - Auto Rename Tag: This will automatically rename matching tags in HTML.
 *
 *
 *
 */
