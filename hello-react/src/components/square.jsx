import React from 'react';

import './square.css';

/**
 * Represents a square
 * @constructor
 */
export default function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}
