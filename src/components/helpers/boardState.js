const startBoardState = (height, width, mines) => {
  let board = createEmptyBoard(width, height);
  board = addMines(board, width, height, mines);
  board = getNeighbours(board, width, height);

  return board;
};

const createEmptyBoard = (width, height) => {
  let board = [];

  for (let i = 0; i < width; i++) {
    board.push([]);
    for (let j = 0; j < height; j++) {
      board[i][j] = {
        x: i,
        y: j,
        isMine: false,
        neighbour: 0,
        isRevealed: false,
        isEmpty: false,
        isFlagged: false,
      };
    }
  }
  return board;
};

const addMines = (board, width, height, mines) => {
  let randomX, randomY, minesAdded = 0;
  let updatedBoard = [...board];

  while (minesAdded < mines) {
    randomX = randomNumber(width);
    randomY = randomNumber(height);
    if(!board[randomX][randomY].isMine) {
      updatedBoard[randomX][randomY].isMine = true;
      minesAdded++;
    }
  }

  return updatedBoard;
};

const getNeighbours = (board, width, height) => {
  let updatedBoard = [...board];
  let mines = 0;
  let neighbours = null;

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (!board[i][j].isMine) {
        neighbours = boardWalk(board, board[i][j].x, board[i][j].y, width, height);
        neighbours.map(value => {
          if(value.isMine) {
            mines++;
          }
        });
        if (mines === 0) {
          updatedBoard[i][j].isEmpty = true;
        }
        board[i][j].neighbour = mines;
        neighbours = null;
        mines = 0;
      }
    }
  }
  console.log(updatedBoard);
  return updatedBoard;
};

const boardWalk = (board, x, y, width, height) => {
  let neighbours = [];

  // upper row
  if (x > 0 && y > 0) {
    neighbours.push(board[x - 1][y - 1]);
  };
  if (y > 0) {
    neighbours.push(board[x][y - 1]);
  };
  if (x < (width -1) && y > 0) {
    neighbours.push(board[x + 1][y - 1]);
  };

  // same row
  if (x > 0) {
    neighbours.push(board[x - 1][y]);
  }
  if (x < (width -1)) {
    neighbours.push(board[x + 1][y]);
  };

  //lower row
  if (y < (height - 1) && x > 0) {
    neighbours.push(board[x - 1][y + 1]);
  };
  if (y < (height - 1)) {
    neighbours.push(board[x][y + 1]);
  };
  if (y < (height -1) && x < (width - 1)) {
    neighbours.push(board[x + 1][y + 1]);
  };

  return neighbours;
};

const randomNumber = (seed) => {
  return Math.floor(Math.random() * seed);
};

const revealBoard = (board) => {
  let updatedBoard = [...board];
  updatedBoard.map(boardRow => {
    boardRow.map(cell => {
      cell.isRevealed = true;
    });
  });
  return updatedBoard;
};

const revealEmpty = (board, x, y, width, height) => {
  let revealZone = boardWalk(board, x, y, width, height);
  let updatedBoard = [...board];
  revealZone.map(value => {
    if (!value.isFlagged && !value.isRevealed && (value.isEmpty || !value.isMine)) {
      updatedBoard[value.x][value.y].isRevealed = true;
      if (value.isEmpty) {
        revealEmpty(board, value.x, value.y, width, height);
      }
    }
  });
  return updatedBoard;
};

const countRevealed = (board) => {
  let count = 0;
  board.map(boardRow => {
    boardRow.map(cell => {
      if(cell.isRevealed === true) {
        count++
      }
    })
  })
  return count;
}

export {
  addMines,
  boardWalk,
  countRevealed,
  createEmptyBoard,
  getNeighbours,
  randomNumber,
  revealBoard,
  revealEmpty,
  startBoardState
};
