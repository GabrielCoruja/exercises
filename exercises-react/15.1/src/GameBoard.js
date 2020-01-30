import React from 'react';
import GameCell from './GameCell';
import PropTypes from 'prop-types';
import './GameBoard.css';

class GameBoard extends React.Component {
  render() {
    return (
      <div className="game-board">
        {this.props.gameState.map((playerId, i) => (
          <GameCell
            id={i}
            key={i}
            onClick={() => this.props.updateGame(i)}
            content={playerId}
          />
        ))}
      </div>
    );
  }
}

GameBoard.propTypes = {
  gameState: PropTypes.arrayOf(PropTypes.number).isRequired,
  updateGame: PropTypes.func.isRequired,
};

export default GameBoard;
