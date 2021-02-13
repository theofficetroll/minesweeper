import React from 'react';
import Board from './board.jsx';

class Game extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      height: 9,
      width: 9,
      mines: 10,
      difficulty: 'beginner',
      gameCount: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange = (e) => {
    console.log('drop changed', e.target.value);
    this.setState({ difficulty: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let difficultyLevel = this.state.difficulty;
    let gameCount = this.state.gameCount;
    console.log('new difficulty level', difficultyLevel);
    switch (difficultyLevel) {
      case 'beginner':
        console.log('new beginner game');
        gameCount++;
        this.setState ({
          height: 9,
          width: 9,
          mines: 10,
          gameCount: gameCount,
        });
        break;
      case 'intermediate':
        console.log('new intermediate game');
        gameCount++;
        this.setState ({
          height: 16,
          width: 16,
          mines: 40,
          gameCount: gameCount,
        });
        break;
      case 'expert':
        console.log('new expert game');
        gameCount++;
        this.setState ({
          height: 30,
          width: 16,
          mines: 99,
          gameCount: gameCount,
        });
        break;
      default:
        console.log('invalid entry');
    }
  }

  render() {
    let { gameCount, height, width, mines } = this.state;
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Pick Difficulty:
              <select value={this.state.difficulty} onChange={this.handleChange}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="game">
          <Board gameCount={gameCount} height={height} width={width} mines={mines} />
        </div>
      </div>
    );
  }
}

export default Game;
