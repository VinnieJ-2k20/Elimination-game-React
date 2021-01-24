import React from 'react';
import './Rules.scss';

export class Rules extends React.Component {
  state = {}

  render() {

    return (
      <ul className="Rules">
        Here are the game rules:
        <li>Game board consists of multiple numbered boxes</li>
        <li>At the start of the game the Player selects total number of boxes and maximum amount that can be marked per turn</li>
        <li>Player and Computer take turns crossing any number of boxes from 1 to max</li>
        <li>The winning side is the one who crosses the last box</li>
        <li>Good luck!</li>
      </ul>
    );
  }
}