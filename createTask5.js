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
	UP: 'up',
	DOWN: 'down',
	RIGHT: 'right',
	LEFT: 'left',
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
	const userInput = prompt('Which direction would you like to go in? up; left; right; or down?');
	if (userInput === null) {
		// The user refused to answer. This is an error.
		throw new Error('YOU MUST CHOOSE');
	}

	const possibleMoves = Object.values(MOVES);
	if (possibleMoves.includes(userInput) === false) {
		// the user gave invalid input. This is an error.
		throw new Error('YOU MUST CHOOSE BETTER');
	}else if(possibleMoves.includes(userInput === true)){
		// the program will move in the user input direction
		userMove(dir);
	}

	return userInput;
}

function userMoveRight(dir){
	//will be the brains of the right move and the down move after we transpose
}
function userMoveLeft(dir){
	//will be the brains of the left move and the up move after we transpose
}

//this will only work for userMoveRight
function zeroSwapRight(i, j) {
// Keep moving non-zero value to the right as long as there's a zero to its right
	while (j + 1 < grid[i].length && grid[i][j + 1] === 0) {
// Swap the current value with the next zero cell
		let temp = grid[i][j];
		grid[i][j] = grid[i][j + 1];
		grid[i][j + 1] = temp;
		j++; // Move to the next position to check again
	}
}

function zeroSwapLeft(i, j){
	while (j - 1 > -1 && grid[i][j - 1] === 0) {
		let temp = grid[i][j];
		grid[i][j] = grid[i][j - 1];
		grid[i][j - 1] = temp;
		j--; // Move to the next position to check again
	}






