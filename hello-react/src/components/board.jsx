import React from 'react';

import Square from './square.jsx';

/**
 * Represents a tic-tac-toe board
 * @constructor
 */
export default function Board(props) {
  const positions = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
  return (
    <div>
      {positions.map((row, x) => {
        return (
          <div key={'row' + x} className="board-row">
            {row.map((i) => {
              return (
                <Square key={i} value={props.squares[i]}
                  onClick={() => props.onClick(i)} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
