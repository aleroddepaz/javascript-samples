import React from 'react';

import './game.css';
import Board from './board.jsx';
import calculateWinner from './calculate-winner.js';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [Array(9).fill(null)],
      xIsNext: true
    };
  }

  render() {
    const history = this.state.history;
    const squares = history[history.length - 1];
    const winner = calculateWinner(squares);
    const next = this.state.xIsNext ? 'X' : 'O'
    const status = winner ? 'Winner: ' + winner : 'Next player: ' + next;
    const moves = history.map((step, move) => {
      const desc = move ? 'Move #' + move : 'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  handleClick(i) {
    const history = this.state.history;
    const squares = history[history.length - 1].slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([squares]),
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    const history = this.state.history.slice(0, step + 1);
    this.setState({ history: history, xIsNext: !(step % 2) });
  }

}
