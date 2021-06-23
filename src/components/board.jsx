import React from 'react';
import { startBoardState, revealBoard, revealEmpty, countRevealed } from './helpers/boardState.js';
import Cell from './cell.jsx';

// TODO Do not calculate board until first click
// OR if mine on first click, recalculate

// TODO Add timer
//  Tie in Win check to timer


class Board extends React.Component {
  state = {
    boardState: startBoardState(this.props.height, this.props.width, this.props.mines),
    gameState: 'playing',
    minesRemaining: this.props.mines,
    totalCells: this.props.height * this.props.width,
    cellsRevealed: 0,
    mineTotal: this.props.mines,
  };

  componentDidUpdate(prevProps) {
    if(this.props.gameCount !== prevProps.gameCount) {
      console.log('updating game');
      this.setState ({
        boardState: startBoardState(this.props.height, this.props.width, this.props.mines),
        gameState: 'playing',
        minesRemaining: this.props.mines,
        cellsRevealed: 0,
        mineTotal: 0,
      })
    }
  }

  renderBoard(board) {
    return board.map(boardRow => {
      return boardRow.map(boardCell => {
        return (
          <div key={boardCell.x * 10 + boardCell.y}>
            <Cell onClick={() => this.handleClick(boardCell.x, boardCell.y)} cMenu={(e) => this.handleContextMenu(e, boardCell.x, boardCell.y)} value={boardCell}/>
            {(boardRow[boardRow.length - 1] === boardCell) ? <div className="clear" /> : ''}
          </div>
        )
      })
    })
  };

  handleClick = (x, y) => {
    if(this.state.boardState[x][y].isRevealed || this.state.boardState[x][y].isFlagged) {
      return null;
    };
    if(this.state.boardState[x][y].isMine) {
      this.setState({
        gameState: 'lost',
        boardState: revealBoard(this.state.boardState),
      });
    };
    let updatedBoard = [...this.state.boardState];
    updatedBoard[x][y].isRevealed = true;
    updatedBoard[x][y].isFlagged = false;
    if(updatedBoard[x][y].isEmpty) {
      updatedBoard = revealEmpty(updatedBoard, x, y, this.props.width, this.props.height);
    }
    let revealedCells = countRevealed(updatedBoard);
    this.setState({
      boardState: updatedBoard,
      cellsRevealed: revealedCells,
    }, this.checkWin);
  };

  checkWin = () => {
    console.log('Revealed cells: ' + this.state.cellsRevealed);
    console.log('Total cells: ' + this.state.totalCells);
    if(this.state.cellsRevealed === (this.state.totalCells - this.state.mineTotal)) {
      this.setState({ gameState: 'won!' });
      console.log('winner winner');
    }
  }

  // TODO add right-click on revealed tile to reveal everything around it if enough flags
  handleContextMenu = (e, x, y) => {
    e.preventDefault();
    let updatedBoard = [...this.state.boardState];
    if(updatedBoard[x][y].isFlagged) {
      updatedBoard[x][y].isFlagged = false;
      let updateCount = this.state.minesRemaining - 1;
      this.setState({ minesRemaining: updateCount });
    } else if (!updatedBoard[x][y].isFlagged) {
      updatedBoard[x][y].isFlagged = true;
      let updateCount = this.state.minesRemaining + 1;
      this.setState({ minesRemaining: updateCount });
    }

    this.setState({
      gameState: 'playing',
    })
  };

  render() {
    return (
      <div className="board">
        <div className="game-data">
          <span className="data">
            Mines: {this.state.mineTotal}
          </span>
          <br />
          <span className="data">
            {this.state.gameState}
          </span>
        </div>
        {this.renderBoard(this.state.boardState)}
      </div>
    );
  }
}

export default Board;
