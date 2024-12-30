
var grid = [
    [0, 0, 0, 2],
    [0, 0, 4, 0],
    [0, 8, 0, 0],
    [16, 0, 16, 0]
];
var dir = prompt("which direction would you like to go in? up; left; right; or down? ");
var inputError = "This is an invalid input. Please write either up, down, right or left. This is case sensitive.";
var score = 0;
var gameOver = "Game Over. your score is: " + score;

var isGameOver = false

    move(dir);
    console.log(grid);  

function move(dir){
    if (dir === "right") {
        for (i = 0; i < grid.length; i++) {
            // Start from the second last index and move to the left
            for (j = 0; j < grid[i].length; j++) {
                zeroSwap(i, j);
                merge(i, j);
                updateHTMLGrid();
            }
        }
    }else if(dir === "down") {
        for (i = 0; i < grid.length; i++) {
            // Start from the second last index and move to the left
            for (j = 0; j < grid[i].length; j++) {
                grid = transpose(grid);
                zeroSwap(i, j);
                merge(i, j);
                updateHTMLGrid();
            }

        }
              
    }else if(dir === "up"){

    }else if(dir === "left"){
        // Logic for "left"
    }else{
        document.getElementById("error").innerHTML = inputError;
    }
}

function zeroSwap(i, j) {
    // Keep moving non-zero value to the right as long as there's a zero to its right
    while (j + 1 < grid[i].length && grid[i][j + 1] === 0) {
        // Swap the current value with the next zero cell
        let temp = grid[i][j];
        grid[i][j] = grid[i][j + 1];
        grid[i][j + 1] = temp;
        j++; // Move to the next position to check again
    }
}



function transpose(grid) {
    return grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));
}

function merge(i, j) {
    // Check if the next cell is the same and not already merged
    if (j + 1 < grid[i].length && grid[i][j] === grid[i][j + 1] && grid[i][j] !== 0) {
        grid[i][j + 1] = grid[i][j] + grid[i][j]; // Merge the values
        grid[i][j] = 0; // Clear the original cell
        zeroSwap(i, j); // Ensure the tiles are in the correct positions after merging
    }
}


function updateHTMLGrid(){
    document.getElementById("row_0").innerHTML = grid[0];
    document.getElementById("row_1").innerHTML = grid[1];
    document.getElementById("row_2").innerHTML = grid[2];
    document.getElementById("row_3").innerHTML = grid[3];
}
