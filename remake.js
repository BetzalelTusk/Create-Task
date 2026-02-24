let BOARD = []
const DIMENSION = 4

// Initialize the board
function initBoard() {
    for (let i = 0; i < DIMENSION; i++) {
        let row = []
        for (let j = 0; j < DIMENSION; j++) {
            row.push(0)
        }
        BOARD.push(row)
    }
    console.log(BOARD)
}

// Function to add a tile to the board on initiation

// This function scans for 0's and stores the locations in an array
function addTile() {
    const emptySpots = []
    for (let row = 0; row < DIMENSION; row++) {
        for (let col = 0; col < DIMENSION; col++) {
            if (BOARD[row][col] === 0) {
                emptySpots.push([row, col])
            }
        }
    }
    //console.log(emptySpots)
    let randomNum = Math.floor(Math.random() * 4) + 1;
    console.log(randomNum);
}

// Random Tile Funtion
function randomTile() {
    const randomNum = Math.floor
}

// Function executions
initBoard()
addTile()
