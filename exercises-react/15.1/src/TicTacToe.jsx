import React from 'react';
import GameBoard from './GameBoard';

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneScore: 0,
      playerTwoScore: 0,
      activePlayer: 1,
      gameBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    this.updateState = this.updateState.bind(this);
  }

  toggleActivePlayer() {
    if (this.state.activePlayer === 1) return 2;
    return 1;
  }

  updateState(cellClicked) {
    this.setState(state => {
      let newState = [...state.gameBoard];
      let newActivePlayer = state.activePlayer;

      if (state.gameBoard[cellClicked] === 0) {
        newState[cellClicked] = state.activePlayer;
        newActivePlayer = this.toggleActivePlayer();
      } else newState[cellClicked] = state.gameBoard[cellClicked];

      return {
        activePlayer: newActivePlayer,
        gameBoard: newState,
      };
    });
  }

  victoryArchivedInLine(gameBoard) {
    for (let i = 0; i <= 6; i += 3) {
      if (
        gameBoard[i] === gameBoard[i + 1] &&
        gameBoard[i + 1] === gameBoard[i + 2] &&
        gameBoard[i] !== 0
      )
        return true;
    }
    return false;
  }

  victoryArchivedInColumn(gameBoard) {
    for (let i = 0; i <= 2; i++) {
      if (
        gameBoard[i] === gameBoard[i + 3] &&
        gameBoard[i + 3] === gameBoard[i + 6] &&
        gameBoard[i] !== 0
      )
        return true;
    }
    return false;
  }

  victoryArchivedInDiagonals(gameBoard) {
    if (gameBoard[4] === 0) return false;
    if (gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8]) return true;
    if (gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6]) return true;
    return false;
  }

  victoryArchieved() {
    const {gameBoard} = this.state;

    return (
      this.victoryArchivedInLine(gameBoard) ||
      this.victoryArchivedInColumn(gameBoard) ||
      this.victoryArchivedInDiagonals(gameBoard)
    );
  }

  render() {
    if (this.victoryArchieved()) return <h1>Fim de Jogo</h1>;
    return <GameBoard gameState={this.state.gameBoard} updateGame={this.updateState} />;
  }
}

export default TicTacToe;
