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
    //console.log(BOARD)
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
    console.log(emptySpots)
    let randomIndex = Math.floor(Math.random() * emptySpots.length)
    BOARD[emptySpots[randomIndex][0]][emptySpots[randomIndex][1]] = Math.floor(Math.random() * 2 + 1) * 2;
    return BOARD
}

// Random Tile Funtion
function randomTile(maxRange) {
    let randomNum = Math.floor(Math.random() * maxRange + 1) * 2;
    //console.log(randomNum)
    return randomNum
}

// Function executions
initBoard()
console.log(addTile())
