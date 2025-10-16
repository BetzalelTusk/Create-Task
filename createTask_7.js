let BOARD = [];
const DIMENSION = 4;
let gameStat = true;
let score = 0;

const MOVES = {
  UP: "up",
  DOWN: "down",
  RIGHT: "right",
  LEFT: "left",
};

function initBoard() {
  const rows = document.getElementsByClassName("row");
  while (rows.length > 0) {
    rows[0].parentNode.removeChild(rows[0]);
  }
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
      BOARD.push([]);
    }
    for (let j = 0; j < DIMENSION; j++) {
      BOARD[i].push(0);
    }
    score = 0;
  }
  addTile();
  addTile();
  updateHTML();
}

let userInput;
function buttonClickR() {
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
  addTile();
  updateHTML();
}

function buttonClickL() {
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
  addTile();
  updateHTML();
}

function buttonClickD() {
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
  addTile();
  updateHTML();
}

function buttonClickU() {
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
  addTile();
  updateHTML();
}

function zeroSwap(i, j, userInput) {
  if (userInput === MOVES.RIGHT || userInput === MOVES.DOWN) {
    while (j + 1 < DIMENSION && BOARD[i][j + 1] === 0) {
      [BOARD[i][j], BOARD[i][j + 1]] = [BOARD[i][j + 1], BOARD[i][j]];
      j++;
    }
    merge(i, j);
  } else if (userInput === MOVES.LEFT || userInput === MOVES.UP) {
    while (j < DIMENSION - 1 && BOARD[i][j] === 0) {
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

  if (emptySpots.length === 0) {
    return;
  }

  let randomInsert = Math.floor(Math.random() * 3) * 2;
  while (randomInsert === 0) {
    randomInsert = Math.floor(Math.random() * 3) * 2;
  }
  console.log(randomInsert + " :Insert");

  let randomLocation_X = Math.floor(Math.random() * DIMENSION);
  let randomLocation_Y = Math.floor(Math.random() * DIMENSION);
  console.log(randomLocation_X + " :Locatio_X");
  console.log(randomLocation_Y + " :Location_Y");

  if (BOARD[randomLocation_Y][randomLocation_X] == 0) {
    BOARD[randomLocation_Y][randomLocation_X] = randomInsert;
  }

  let randomNum = Math.floor(Math.random() * 3) * 2;
  const randomIndex = Math.floor(Math.random() * emptySpots.length);
  const [randomRow, randomCol] = emptySpots[randomIndex];
  BOARD[emptySpots[randomIndex]] = randomNum;
  updateHTML();
}

function transpose(BOARD) {
  return BOARD[0].map((_, colIndex) => BOARD.map((row) => row[colIndex]));
}

function merge(i, j) {
  if (
    j + 1 < BOARD[i].length &&
    BOARD[i][j] === BOARD[i][j + 1] &&
    BOARD[i][j] !== 0
  ) {
    BOARD[i][j + 1] = BOARD[i][j] + BOARD[i][j];
    BOARD[i][j] = 0;
    zeroSwap(i, j);
    score = score + BOARD[i][j] + BOARD[i][j];
    console.log(score);
  }
}

function insertRandomTile(BOARD) {
  const emptySpots = [];
  for (let row = 0; row < DIMENSION; row++) {
    for (let col = 0; col < DIMENSION; col++) {
      if (BOARD[row][col] === 0) {
        emptySpots.push([row, col]);
      }
    }
  }

  if (emptySpots.length === 0) {
    return;
  }

  let randomNum = Math.floor(Math.random() * 3) * 2;
  const randomIndex = Math.floor(Math.random() * emptySpots.length);
  const [randomRow, randomCol] = emptySpots[randomIndex];
  BOARD[emptySpots[randomIndex]] = randomNum;
  updateHTML();
}
