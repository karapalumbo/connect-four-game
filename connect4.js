/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const width = 7;
const height = 6;
let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
let gameContainer = document.getElementById("game");
gameContainer.setAttribute("class", "flex-container");

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for (let i = 0; i < height; i++) {
    board[i] = [];
    for (let j = 0; j < width; j++) {
      board[i][j] = undefined;
    }
  }
  return board;
}

// TODO: set "board" to empty HEIGHT x WIDTH matrix array
// let x = new Array(width);
// for (let i = 0; i < x.length; i++) {
//   x[i] = new Array(height);
//   board.push(x[i]);
// }
// console.log(board);

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");

  // TODO: add comment for this code
  const top = document.createElement("tr"); //  created table row
  top.setAttribute("id", "column-top"); // set id: column-top to new tr
  top.addEventListener("click", handleClick); // added click event when tr is clicked.

  for (let x = 0; x < width; x++) {
    //  looping over rows
    const headCell = document.createElement("td"); // creating table data for each row
    headCell.setAttribute("id", x); // adding id:x to each table data section
    top.append(headCell); // appending table data to top row
  }
  htmlBoard.append(top); // appending to the board

  // TODO: add comment for this code
  for (let y = 0; y < height; y++) {
    // looping over columns
    const row = document.createElement("tr"); // creating rows
    for (let x = 0; x < width; x++) {
      // looping over rows
      const cell = document.createElement("td"); // creating columns
      cell.setAttribute("id", `${y}-${x}`); // adding id to columns
      row.append(cell); // apending columns to rows
    }
    htmlBoard.append(row); // appending to the board
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = height - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  piece.classList.add("piece", "fall");
  if (currPlayer === 1) {
    piece.classList.add("p1");
  } else {
    piece.classList.add("p2");
  }

  const cell = document.getElementById(`${y}-${x}`);
  cell.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every((row) => row.every((cell) => cell))) {
    return endGame("Tie!");
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if (currPlayer === 1) {
    // document.querySelector(".p1");
    currPlayer = 2;
  } else {
    // document.querySelector(".p2");
    currPlayer = 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < height &&
        x >= 0 &&
        x < width &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < height; y++) {
    // loop over columns
    for (let x = 0; x < width; x++) {
      // loop over rows
      let horiz = [
        // set variable for horizonal matches
        [y, x], // sets piece on x/y coordinates
        [y, x + 1], // adds piece to next box to the right of where initial piece was set.
        [y, x + 2], //  adds piece to second box to the right of where initial piece was set.
        [y, x + 3], // adds piece to third box to the right of where initial piece was set.
      ];
      let vert = [
        // set variable for vertical matches
        [y, x], // sets piece on x/y coordinates
        [y + 1, x], // adds piece to next box on top of where initial piece was set.
        [y + 2, x], // adds piece to second box on top of where initial piece was set.
        [y + 3, x], // adds piece to third box on top of where initial piece was set.
      ];
      let diagDR = [
        // set variable for diagonal right matches
        [y, x], // sets piece on x/y coordinates
        [y + 1, x + 1], // adds piece to next box on top and to the right of where initial piece was set.
        [y + 2, x + 2], // adds piece to second box on top and to the right of where initial piece was set.
        [y + 3, x + 3], // adds piece to third box on top and to the right of where initial piece was set.
      ];
      let diagDL = [
        // set variable for diagonal left matches
        [y, x], // sets piece on x/y coordinates
        [y + 1, x - 1], // adds piece to next box on top and to the left of where initial piece was set.
        [y + 2, x - 2], // adds piece to second box on top and to the left of where initial piece was set.
        [y + 3, x - 3], // adds piece to third box on top and to the left of where initial piece was set.
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
